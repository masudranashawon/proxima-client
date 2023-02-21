import { useProjectsContext } from "../hooks/useProjectsContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import moment from "moment";

const ProjectDetails = ({ project }) => {
  const { dispatch } = useProjectsContext();

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/api/projects/${project._id}`,
      {
        method: "DELETE",
      }
    );
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };

  return (
    <div className='project bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-xl flex flex-col gap-5 w-[32rem]'>
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
        <button className='bg-sky-400 text-slate-900 py-2 px-6 rounded shadow-xl hover:bg-sky-50 duration-300'>
          Update
        </button>
        <button
          onClick={handleDelete}
          className='text-rose-500 hover:underline'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
