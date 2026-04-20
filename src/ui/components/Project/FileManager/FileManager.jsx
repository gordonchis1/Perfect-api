import "./FileManager.css";
import FileManagerElement from "./FileManagerElement/FileManagerElement";
import { useProjectStore } from "../../../stores/ProjectStore";

export default function FileManager() {
  const fileManagerState = useProjectStore((store) => store.vfs);
  useProjectStore((store) => store.version);

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
