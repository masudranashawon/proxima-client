import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

export const useProjectsContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "You must call useProjectsContext inside a ProjectContextProvider"
    );
  }
  return context;
};
