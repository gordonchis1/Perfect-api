import "./FileManager.css";
import FileManagerElement from "./FileManagerElement/FileManagerElement";
import useFileManagerContext from "../../../Hooks/FileManager/useFileMangerContext";

// TODO: encontrar una forma de siempre guardar los elementos de una misma forma en el objeto
// ! ordenar los elementos por primero directorios luego los archivos ordenados en orden alfabetico
export default function FileManager() {
  const [state] = useFileManagerContext();

  console.log(state);
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
