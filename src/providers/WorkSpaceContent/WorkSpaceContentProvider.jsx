import { createContext, useEffect, useReducer } from "react";
import workSpaceContentReducer, { WORKSPACE_CONTENT_TYPES } from "./reducer";
import useFileManagerContext from "../../Hooks/FileManager/useFileMangerContext";
import { VirtualFileSystem } from "../../utils/ProjectFileObject";
import useFilesContext from "../../Hooks/useFilesContext";

export const WorkSpaceContentContext = createContext();

export default function WorkSpaceContentProvider({ children }) {
  const [state, dispatch] = useReducer(workSpaceContentReducer, undefined);
  const [fileManagerContext] = useFileManagerContext();
  const [filesContext] = useFilesContext();

  useEffect(() => {
    if (
      fileManagerContext &&
      fileManagerContext instanceof VirtualFileSystem &&
      filesContext.currentFile
    ) {
      const node = fileManagerContext.getNodeById(filesContext.currentFile);
      if (node) {
        const content = node.content;
        dispatch({ type: WORKSPACE_CONTENT_TYPES.init, payload: { content } });
      }
    } else {
      dispatch({
        type: WORKSPACE_CONTENT_TYPES.init,
        payload: { content: undefined },
      });
    }
  }, [fileManagerContext, filesContext.currentFile]);

  return (
    <WorkSpaceContentContext.Provider value={[state, dispatch]}>
      {children}
    </WorkSpaceContentContext.Provider>
  );
}
