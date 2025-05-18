import "./FileManager.css";
import FileManagerElement from "./FileManagerElement/FileManagerElement";
import useFileManagerContext from "../../../Hooks/FileManager/useFileMangerContext";
import { useEffect } from "react";
import useFilesContext from "../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../providers/FilesProvider/reducer";

// ! ordenar los elementos por primero directorios luego los archivos ordenados en orden alfabetico
export default function FileManager() {
  const [state] = useFileManagerContext();
  const [, filesDispatch] = useFilesContext();

  useEffect(() => {
    if (state !== undefined) {
      filesDispatch({
        type: FILES_REDUCER_ACTIONS.update,
        payload: { vfs: state },
      });
    }
  }, [state]);

  return (
    <div
      className="filemanager-container"
      onContextMenu={(event) => event.preventDefault()}
    >
      {state !== undefined && (
        <FileManagerElement node={state.root} vfs={state} />
      )}
    </div>
  );
}
