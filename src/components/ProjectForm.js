import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectForm = ({ project, setIsModalOpen, setIsOverlayOpen }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [dev, setDev] = useState(project ? project.dev : "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please log in to access this feature.");
      return;
    }

    //Data
    const projectObj = {
      title,
      tech,
      budget,
      duration,
      manager,
      dev,
    };

    //Is there is no project, sent post req
    if (!project) {
      //Post req
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        }
      );
      const json = await res.json();

      //res.ok is false set error
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      //res.ok is true, reset
      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setDuration("");
        setManager("");
        setDev("");
        setError(null);
        setEmptyFields([]);

        //Dispath
        dispatch({ type: "CREATE_PROJECT", payload: json });
      }
      return;
    }

    //Is there is a project, sent patch req
    if (project) {
      //Sent patch req
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        }
      );

      const json = await res.json();

      //!res.ok
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      //res.ok
      if (res.ok) {
        setError(null);
        setEmptyFields([]);

        //Dispatch
        dispatch({ type: "UPDATE_PROJECT", payload: json });

        //Close overlay & modal
        setIsModalOpen(false);
        setIsOverlayOpen(false);
      }
      return;
    }
  };

  return (
    <form className='project-form flex flex-col gap-3' onSubmit={handleSubmit}>
      <h2 className={`text-3xl text-sky-400 mb-3 ${project ? "hidden" : ""}`}>
        Add a new Project
      </h2>

      <div className='form-ctrl flex flex-col gap-1'>
        <label
          htmlFor={`${project ? "update-" : ""}title`}
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Project title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          id={`${project ? "update-" : ""}title`}
          placeholder='e.g e-commerce website'
          className={`bg-transparent py-3 px-5 outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("title")
              ? "border border-rose-500"
              : "border border-slate-500"
          }`}
        />
      </div>

      <div className='form-ctrl flex flex-col gap-1'>
        <label
          htmlFor={`${project ? "update-" : ""}tech`}
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type='text'
          id={`${project ? "update-" : ""}tech`}
          placeholder='e.g node.js, react.js, redux etc.'
          className={`bg-transparent py-3 px-5 outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("tech")
              ? "border border-rose-500"
              : "border border-slate-500"
          }`}
        />
      </div>

      <div className='form-ctrl flex flex-col gap-1'>
        <label
          htmlFor={`${project ? "update-" : ""}budget`}
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Budget (in USD)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type='number'
          id={`${project ? "update-" : ""}budget`}
          placeholder='e.g 1500'
          className={`bg-transparent py-3 px-5 outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("budget")
              ? "border border-rose-500"
              : "border border-slate-500"
          }`}
        />
      </div>

      <div className='form-ctrl flex flex-col gap-1'>
        <label
          htmlFor={`${project ? "update-" : ""}duration`}
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Duration (in weeks)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type='number'
          id={`${project ? "update-" : ""}duration`}
          placeholder='e.g 2'
          className={`bg-transparent py-3 px-5 outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("duration")
              ? "border border-rose-500"
              : "border border-slate-500"
          }`}
        />
      </div>

      <div className='form-ctrl flex flex-col gap-1'>
        <label
          htmlFor={`${project ? "update-" : ""}manager`}
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          type='text'
          id={`${project ? "update-" : ""}manager`}
          placeholder='e.g john doe'
          className={`bg-transparent py-3 px-5 outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("manager")
              ? "border border-rose-500"
              : "border border-slate-500"
          }`}
        />
      </div>

      <div className='form-ctrl flex flex-col gap-1'>
        <label
          htmlFor={`${project ? "update-" : ""}dev`}
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          type='number'
          id={`${project ? "update-" : ""}dev`}
          placeholder='e.g 5'
          className={`bg-transparent py-3 px-5 outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("dev")
              ? "border border-rose-500"
              : "border border-slate-500"
          }`}
        />
        <button
          type='submit'
          className='bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300 mt-3'
        >
          {project ? "Update project" : "Add project"}
        </button>
        {error && (
          <p className='bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500'>
            {error}
          </p>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
