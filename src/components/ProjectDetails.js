import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import moment from "moment";
import ProjectForm from "./ProjectForm";

const ProjectDetails = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
    setIsOverlayOpen(true);
  };

  const handleOverlay = () => {
    setIsModalOpen(false);
    setIsOverlayOpen(false);
  };

  return (
    <div className='project bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-xl flex flex-col gap-5 w-full md:w-[32rem]'>
      <div className='top'>
        <span className='text-sky-400'>{project._id}</span>
        <h3 className='text-3xl font-medium truncate'>{project.title}</h3>
        <span className='text-sm tracking-widest text-slate-500 font-medium'>
          {project.tech}
        </span>
      </div>
      <div className='mid text-slate-300 flex gap-10'>
        <div className='left flex flex-col'>
          <span>Budget: {currencyFormatter(project.budget)}</span>
          <span>
            Added: {moment(project.createdAt).format("MMM DD, hh:mm A")}
          </span>
          <span>
            Updated: {moment(project.updatedAt).format("MMM DD, hh:mm A")}
          </span>
        </div>
        <div className='right flex flex-col'>
          <span>Manager: {project.manager}</span>
          <span>Developers: {project.dev}</span>
          <span>
            Duration:{" "}
            {`${project.duration} Week${project.duration === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>
      <div className='bottom flex gap-5'>
        <button
          onClick={handleUpdate}
          className='bg-sky-400 text-slate-900 py-2 px-6 rounded shadow-xl hover:bg-sky-50 duration-300'
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className='text-rose-500 hover:underline'
        >
          Delete
        </button>
      </div>

      {/* OVERLAY */}
      <div
        onClick={handleOverlay}
        className={`overlay fixed z-[1] h-screen w-screen bg-slate-900/50 backdrop-blur-sm top-0 left-0 right-0 bottom-0 ${
          isOverlayOpen ? "" : "hidden"
        }`}
      ></div>

      {/* MODAL */}
      <div
        className={`update-modal w-[30rem] absolute 2xl:fixed top-0 2xl:top-1/2 2xl:-translate-y-1/2 left-1/2 -translate-x-1/2 bg-slate-800 p-10 rounded-xl border border-slate-700 shadow-xl z-[2] ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <h2 className='text-4xl text-sky-400 mb-10'>Update project</h2>
        <ProjectForm
          project={project}
          setIsModalOpen={setIsModalOpen}
          setIsOverlayOpen={setIsOverlayOpen}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
