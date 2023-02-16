import { useEffect, useState } from "react";
import ProjectDetails from "../components/ProjectDetails";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/projects");
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json();
        setProjects(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.messege);
        setLoading(false);
      }
    };

    getProjects();
  }, []);
  return (
    <div className='container mx-auto py-20 grid grid-cols-3 gap-10'>
      <div className='left col-span-2'>
        <h2 className='text-4xl text-sky-400 mb-10'>All Projects</h2>
        <div className='projects-wrapper flex gap-10 flex-wrap'>
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
        </div>
      </div>
      <div className='right'></div>
    </div>
  );
};

export default Home;
