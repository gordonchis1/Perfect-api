import { FSNode, VirtualFileSystem } from "../../../utils/ProjectFileObject";
import "./FileManager.css";
import FileManagerDirElement from "./FileManagerElement/FileManagerDirElement/FileManagerDirElement";
import FileManagerElement from "./FileManagerElement/FileManagerElement";

// FileManager Elmenent resive un nodo de vfs por props tambien resive isOpen y lo almacena en un estado
// al cerrar updateamos el documento para guardar los isOpen
// Imprime solo los elementos que tengan por nombre
// recive el path absoluto

// TODO: hacer una funcion para mover archivos un drag and drop
export default function FileManager({ project }) {
  const vfs = new VirtualFileSystem(project.content.root);

  return (
    <div className="filemanager-container">
      <FileManagerElement node={vfs.root} vfs={vfs} />
    </div>
  );
}
