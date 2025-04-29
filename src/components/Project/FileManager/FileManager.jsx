import { VirtualFileSystem } from "../../../utils/ProjectFileObject";
import "./FileManager.css";
import FileManagerElement from "./FileManagerElement/FileManagerElement";

// TODO: hacer una funcion para mover archivos un drag and drop
export default function FileManager({ project }) {
  const vfs = new VirtualFileSystem(project.content.root);

  return (
    <div className="filemanager-container">
      <FileManagerElement node={vfs.root} vfs={vfs} />
    </div>
  );
}
