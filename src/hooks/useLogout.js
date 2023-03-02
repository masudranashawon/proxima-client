import { useAuthContext } from "./useAuthContext";
import { useProjectsContext } from "../hooks/useProjectsContext";

export const useLogout = () => {
  const { dispatch: logoutDispatch } = useAuthContext();
  const { dispatch: projectsDispatch } = useProjectsContext();

  const logout = () => {
    // Clear local storage
    localStorage.removeItem("user");

    //Dispacth logout
    logoutDispatch({ type: "LOGOUT" });
    projectsDispatch({ type: "SET_PROJECTS", payload: [] });
  };

  return { logout };
};
