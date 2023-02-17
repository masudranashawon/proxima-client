import { currencyFormatter } from "../utils/currencyFormatter";

const ProjectDetails = ({ project }) => {
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
            Added on: {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span>
            Last update: {new Date(project.updatedAt).toLocaleDateString()}
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
        <button className='text-rose-500 hover:underline'>Delete</button>
      </div>
    </div>
  );
};

export default ProjectDetails;
