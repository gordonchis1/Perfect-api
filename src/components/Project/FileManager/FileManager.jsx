import "./FileManager.css";
import FileManagerElement from "./FileManagerElement/FileManagerElement";
import { useEffect } from "react";
import useFilesContext from "../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../providers/FilesProvider/reducer";
import { useProjectStore } from "../../../stores/ProjectStore";

export default function FileManager() {
  const [, filesDispatch] = useFilesContext();
  const fileManagerState = useProjectStore((store) => store.vfs);
  const projectVersion = useProjectStore((store) => store.version);

  useEffect(() => {
    if (fileManagerState !== undefined) {
      filesDispatch({
        type: FILES_REDUCER_ACTIONS.update,
        payload: { vfs: fileManagerState },
      });
    }
  }, [fileManagerState, projectVersion]);

  return (
    <div
      className="filemanager-container"
      onContextMenu={(event) => event.preventDefault()}
    >
      {fileManagerState && (
        <FileManagerElement
          node={fileManagerState.root}
          vfs={fileManagerState}
        />
      )}
    </div>
  );
}
