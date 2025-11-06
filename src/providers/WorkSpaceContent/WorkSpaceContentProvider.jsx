import { createContext, useEffect, useReducer } from "react";
import workSpaceContentReducer, { WORKSPACE_CONTENT_TYPES } from "./reducer";
import { VirtualFileSystem } from "../../utils/ProjectFileObject";
import useFilesContext from "../../Hooks/useFilesContext";
import { useFilemanagerStore } from "../../stores/FileManagerStore";

export const WorkSpaceContentContext = createContext();

export default function WorkSpaceContentProvider({ children }) {
  const [state, dispatch] = useReducer(workSpaceContentReducer, undefined);
  const fileManagerState = useFilemanagerStore((state) => state.vfs);
  const [filesContext] = useFilesContext();
  const fileManagerVersion = useFilemanagerStore((store) => store.version);

  useEffect(() => {
    if (
      fileManagerState &&
      fileManagerState instanceof VirtualFileSystem &&
      filesContext.currentFile
    ) {
      const node = fileManagerState.getNodeById(filesContext.currentFile);

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
  }, [fileManagerState, filesContext.currentFile, fileManagerVersion]);

  return (
    <WorkSpaceContentContext.Provider value={[state, dispatch]}>
      {children}
    </WorkSpaceContentContext.Provider>
  );
}
