import FileManagerElement from "../FileManagerElement";
import "./FileManagerDirElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";
import { useRef, useState } from "react";
import FileManagerDraggableElement from "../FileManagerDraggableElement/FileManagerDraggableElement";
import { Folder, FolderOpen } from "lucide-react";
import { useProjectStore } from "../../../../../stores/ProjectStore";

export default function FileManagerDirElement({
  node,
  onContextMenu,
  closeContextMenu,
  updateNodeState,
}) {
  const [draggin, setDraggin] = useState(false);

  const fileManagerState = useProjectStore((store) => store.vfs);
  const toggleIsOpen = useProjectStore((store) => store.toggleIsOpen);
  const renameState = useProjectStore((store) => store.renameId);

  const absolutePath = fileManagerState.getAbsolutePath(node);
  const level = absolutePath.split("/").length - 1;

  const handleToggle = (e) => {
    if (node.name === "/") return;
    e.stopPropagation();
    toggleIsOpen(node.id);
  };

  const childrens = node.getChildrens();
  const FilemanagerElementContainerRef = useRef(null);

  return (
    <div
      className="filemanager-element-container"
      ref={FilemanagerElementContainerRef}
      style={
        draggin
          ? {
              position: "absolute",
              opacity: ".8",
              background: "var(--hover)",
            }
          : {}
      }
      data-id={node.id}
    >
      <FileManagerDraggableElement
        node={node}
        FilemanagerElementContainerRef={FilemanagerElementContainerRef}
        draggin={draggin}
        setDraggin={setDraggin}
        onClick={handleToggle}
        style={{
          paddingLeft: node.name !== "/" ? `${level * 25}px` : "15px",
          color: node.isOpen
            ? "var(--primary-text-color)"
            : "var(--muted-foreground)",
        }}
        onContextMenu={(event) => onContextMenu(event)}
      >
        <div className="filemanager-element-content">
          {node.isOpen ? <FolderOpen size={17} /> : <Folder size={17} />}
          {renameState != null && renameState == node.id ? (
            <FileManagerRenameForm
              node={node}
              updateNodeState={updateNodeState}
              closeContextMenu={closeContextMenu}
            />
          ) : (
            <p className="filemanager-element_name">{node.name}</p>
          )}
        </div>
      </FileManagerDraggableElement>
      <div className="filemanager-dir-childs-container" data-id={node.id}>
        {node.isOpen &&
          childrens.map((element) => {
            return <FileManagerElement key={element.id} node={element} />;
          })}
      </div>
    </div>
  );
}
