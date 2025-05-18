// ? Provadier for update open files and file content
import { useReducer, createContext, useEffect, useState } from "react";
import filesReducer, { FILES_REDUCER_ACTIONS } from "./reducer";
import useFileManagerContext from "../../Hooks/FileManager/useFileMangerContext";
import { useParams } from "react-router";
import { getProjectById } from "../../utils/getProjects";

export const FilesContext = createContext([]);
export const filesContextDefaulttValue = {
  currentFile: "",
  openFiles: [],
};

export default function FilesProvider({ children }) {
  const { id } = useParams();
  const [state, dispatch] = useReducer(filesReducer, filesContextDefaulttValue);
  const [isInit, setIsInit] = useState(false);
  const [fileManagerState] = useFileManagerContext();

  useEffect(() => {
    const init = async () => {
      const project = await getProjectById(id);
      dispatch({
        type: FILES_REDUCER_ACTIONS.init,
        payload: { fileManager: fileManagerState, initState: project.state },
      });
    };
    if (!isInit && fileManagerState !== undefined) {
      init();
      setIsInit(true);
    }
  }, [fileManagerState]);

  return (
    <FilesContext.Provider value={[state, dispatch]}>
      {children}
    </FilesContext.Provider>
  );
}
