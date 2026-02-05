import "./FileManagerFileElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";
import { useRef, useState } from "react";
import FileManagerDraggableElement from "../FileManagerDraggableElement/FileManagerDraggableElement";
import IsRuningIndicator from "../../../../Global/IsRuningIndicator/IsRuningIndicator";
import { File } from "lucide-react";
import { useProjectStore } from "../../../../../stores/ProjectStore";

export default function FileManagerFileElement({
  node,
  onContextMenu,
  nodeState,
  closeContextMenu,
}) {
  const FilemanagerElementContainerRef = useRef(null);
  const [draggin, setDraggin] = useState(false);
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const openFiles = useProjectStore((store) => store.openFiles);
  const setCurrentFile = useProjectStore((store) => store.setCurrentFile);

  const renameState = useProjectStore((store) => store.renameId);
  const fileManagerState = useProjectStore((store) => store.vfs);
  const toggleIsOpen = useProjectStore((store) => store.toggleIsOpen);
  const addOpenFile = useProjectStore((store) => store.addOpenFile);

  const absolutePath = fileManagerState.getAbsolutePath(node);
  const level = absolutePath.split("/").length - 1;

  const fileFontColor = () => {
    if (currentFileId === node.id) {
      return "var(--primary)";
    } else if (openFiles[node.id]) {
      return "var(--primary-text-color)";
    }
  };

  return (
    <div
      className="filemanager-element-container"
      ref={FilemanagerElementContainerRef}
      style={
        draggin
          ? { position: "absolute", opacity: ".8", background: "var(--hover)" }
          : {}
      }
    >
      <FileManagerDraggableElement
        FilemanagerElementContainerRef={FilemanagerElementContainerRef}
        draggin={draggin}
        setDraggin={setDraggin}
        node={node}
        style={{
          background:
            currentFileId === node.id ? "var(--primary-transparent)" : "",
          color: fileFontColor(),
          border: currentFileId === node.id ? "1px solid var(--primary)" : "",
          paddingLeft: `${level * 25}px`,
        }}
        onContextMenu={onContextMenu}
        onClick={() => {
          if (currentFileId === node.id) return;
          if (openFiles[node.id]) {
            setCurrentFile(node.id);
          } else {
            toggleIsOpen(node.id);
            setCurrentFile(node.id);
            addOpenFile(node.id);
          }
        }}
      >
        <div className="filemanager-element-content">
          <IsRuningIndicator isRunning={node.content.isRunning} size="10px" />
          <File size={17} />
          {renameState != null && renameState == node.id ? (
            <FileManagerRenameForm
              node={node}
              nodeState={nodeState}
              closeContextMenu={closeContextMenu}
            />
          ) : (
            <p className="filemanager-element_name">{node.name}</p>
          )}
        </div>
      </FileManagerDraggableElement>
    </div>
  );
}
