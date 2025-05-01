import useVirtualFileSystem from "../../../Hooks/FileManager/UseVirtualFileSystem";
import "./FileManager.css";
import FileManagerElement from "./FileManagerElement/FileManagerElement";

export default function FileManager({ project }) {
  const { vfs, updateVfs } = useVirtualFileSystem(project.content);

  return (
    <div className="filemanager-container">
      <FileManagerElement node={vfs.root} vfs={vfs} updateVfs={updateVfs} />
    </div>
  );
}
