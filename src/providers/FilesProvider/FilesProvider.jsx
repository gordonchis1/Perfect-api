// ? Provadier for update open files and file content
import { useReducer, createContext, useEffect, useState } from "react";
import filesReducer, { FILES_REDUCER_ACTIONS } from "./reducer";
import { useParams } from "react-router";
import { getProjectById } from "../../utils/getProjects";
import { useProjectStore } from "../../stores/ProjectStore";

export const FilesContext = createContext([]);
export const filesContextDefaulttValue = {
  currentFile: "",
  openFiles: [],
};

export default function FilesProvider({ children }) {
  const { id } = useParams();
  const [state, dispatch] = useReducer(filesReducer, filesContextDefaulttValue);
  const [isInit, setIsInit] = useState(false);
  const fileManagerState = useProjectStore((store) => store.vfs);
  const projectVersion = useProjectStore((store) => store.version);

  useEffect(() => {
    const init = async () => {
      const project = await getProjectById(id);
      dispatch({
        type: FILES_REDUCER_ACTIONS.init,
        payload: { fileManager: fileManagerState, initState: project.state },
      });
    };
    if (!isInit && fileManagerState) {
      init();
      setIsInit(true);
    }
  }, [fileManagerState, projectVersion]);

  return (
    <FilesContext.Provider value={[state, dispatch]}>
      {children}
    </FilesContext.Provider>
  );
}
