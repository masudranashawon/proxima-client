import { createContext, useReducer } from "react";

const initialState = {
  projects: [],
};

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "CREATE_PROJECT":
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload._id
        ),
      };
    case "UPDATE_PROJECT":
      const [existingProject] = state.projects.filter(
        (project) => project._id === action.payload._id
      );
      return {
        ...state,
        projects: [
          action.payload,
          ...state.projects.filter(
            (project) => project._id !== existingProject._id
          ),
        ],
      };
    default:
      return state;
  }
};

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialState);

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
