import { VirtualFileSystem } from "../../../utils/ProjectFileObject";
import "./FileManager.css";
import FileManagerElement from "./FileManagerElement/FileManagerElement";

export default function FileManager({ project }) {
  // TODO:convertir vfs en un useState
  const vfs = new VirtualFileSystem(project.content.root);

  return (
    <div className="filemanager-container">
      <FileManagerElement node={vfs.root} vfs={vfs} />
    </div>
  );
}
