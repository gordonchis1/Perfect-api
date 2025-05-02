import useVirtualFileSystem from "../../../Hooks/FileManager/UseVirtualFileSystem";
import "./FileManager.css";
import FileManagerElement from "./FileManagerElement/FileManagerElement";

// TODO: encontrar una forma de siempre guardar los elementos de una misma forma en el objeto
// TODO: arreglar bug de archivs llamados igual
// ! ordenar los elementos por primero directorios luego los archivos ordenados en orden alfabetico
// TODO: Arreglar bug donde si en el drag and drop sueltas un elemento fuera de una carpeta esta da un error
export default function FileManager({ project }) {
  const { vfs, updateVfs } = useVirtualFileSystem(project.content);

  return (
    <div className="filemanager-container">
      <FileManagerElement node={vfs.root} vfs={vfs} updateVfs={updateVfs} />
    </div>
  );
}
