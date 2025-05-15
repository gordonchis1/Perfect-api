import { createContext, useEffect, useReducer } from "react";
import fileManagerReducer from "./reducer";
import { useParams } from "react-router";
import { getProjectById } from "../../utils/getProjects";

export const fileManagerContext = createContext(null);

// TODO: add loading state and error state
export default function FileManagerProvider({ children }) {
  const { id } = useParams();
  const [state, dispatch] = useReducer(fileManagerReducer, undefined);

  useEffect(() => {
    const getProject = async () => {
      const project = await getProjectById(id);
      dispatch({ type: "init", payload: project.content });
    };

    getProject();
  }, [id]);

  return (
    <fileManagerContext.Provider value={[state, dispatch]}>
      {children}
    </fileManagerContext.Provider>
  );
}
