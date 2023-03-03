import { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProjectsContext } from "../hooks/useProjectsContext";

const Home = () => {
  const { projects, dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllProjects = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };

    if (user) {
      getAllProjects();
    }
  }, [dispatch, user]);

  return (
    <div className='home container mx-auto py-10 grid md:grid-cols-3 gap-10 w-full'>
      <div className='left md:col-span-2'>
        <h2 className='text-3xl text-sky-400 mb-10'>
          {projects.length < 1 ? (
            "No project available here!"
          ) : (
            <span>
              {projects.length === 1 ? "Your Project" : "Your all projects"}
            </span>
          )}
        </h2>
        <div className='projects-wrapper flex gap-10 flex-wrap'>
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
        </div>
      </div>
      <ProjectForm />
    </div>
  );
};

export default Home;
