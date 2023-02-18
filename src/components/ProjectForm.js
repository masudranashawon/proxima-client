import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [manager, setManager] = useState("");
  const [dev, setDev] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useProjectsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Data
    const projectObj = {
      title,
      tech,
      budget,
      duration,
      manager,
      dev,
    };

    //Post req
    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectObj),
    });
    const json = await res.json();

    //res.ok is false set error
    if (!res.ok) {
      setError(json.error);
      console.log(error);
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

      //Dispath
      dispatch({ type: "CREATE_PROJECT", payload: json });
    }
  };

  return (
    <form className='project-form flex flex-col gap-5' onSubmit={handleSubmit}>
      <h2 className='text-4xl text-sky-400 mb-10'>Add a new Project</h2>

      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='title'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Project title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          id='title'
          placeholder='e.g e-commerce website'
          className='bg-transparent border border-slate-500 py-3 px-5 outline-none focus:border-sky-400 duration-300'
        />
      </div>

      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='tech'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type='text'
          id='tech'
          placeholder='e.g node.js, react.js, redux etc.'
          className='bg-transparent border border-slate-500 py-3 px-5 outline-none focus:border-sky-400 duration-300'
        />
      </div>

      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='budget'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Budget (in USD)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type='number'
          id='budget'
          placeholder='e.g 1500'
          className='bg-transparent border border-slate-500 py-3 px-5 outline-none focus:border-sky-400 duration-300'
        />
      </div>

      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='duration'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Duration (in weeks)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type='number'
          id='duration'
          placeholder='e.g 2'
          className='bg-transparent border border-slate-500 py-3 px-5 outline-none focus:border-sky-400 duration-300'
        />
      </div>

      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='manager'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          type='text'
          id='manager'
          placeholder='e.g john doe'
          className='bg-transparent border border-slate-500 py-3 px-5 outline-none focus:border-sky-400 duration-300'
        />
      </div>

      <div className='form-ctrl flex flex-col gap-2'>
        <label
          htmlFor='dev'
          className='cursor-pointer hover:text-sky-400 duration-300'
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          type='text'
          id='dev'
          placeholder='e.g 5'
          className='bg-transparent border border-slate-500 py-3 px-5 outline-none focus:border-sky-400 duration-300'
        />
        <button
          type='submit'
          className='bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300'
        >
          Add project
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
