import FileManagerElement from "../FileManagerElement";
import "./FileManagerDirElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";
import { useRef, useState } from "react";
import FileManagerDraggableElement from "../FileManagerDraggableElement/FileManagerDraggableElement";
import { Folder, FolderOpen } from "lucide-react";
import { useFilemanagerStore } from "../../../../../stores/FileManagerStore";

export default function FileManagerDirElement({
  node,
  onContextMenu,
  nodeState,
  updateNodeState,
}) {
  const [draggin, setDraggin] = useState(false);
  const fileManagerState = useFilemanagerStore((store) => store.vfs);
  const toggleIsOpen = useFilemanagerStore((store) => store.toggleIsOpen);

  const absolutePath = fileManagerState.getAbsolutePath(node);
  const level = absolutePath.split("/").length;

  const handleToggle = (e) => {
    if (node.name === "/") return;
    e.stopPropagation();
    toggleIsOpen(node.id);
    //   dispatch({
    //     type: FILEMANAGER_REDUCER_ACTIONS.toggleIsOpen,
    //     payload: { path: absolutePath, type: node.type },
    //   });
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
      path={absolutePath ? absolutePath : ""}
    >
      <FileManagerDraggableElement
        node={node}
        FilemanagerElementContainerRef={FilemanagerElementContainerRef}
        draggin={draggin}
        setDraggin={setDraggin}
        onClick={handleToggle}
        style={{
          paddingLeft: node.name !== "/" ? `${level * 15}px` : "15px",
        }}
        onContextMenu={(event) => onContextMenu(event)}
      >
        <div className="filemanager-element-content">
          {node.isOpen ? <FolderOpen size={17} /> : <Folder size={17} />}
          {nodeState.isRename ? (
            <FileManagerRenameForm
              node={node}
              nodeState={nodeState}
              updateNodeState={updateNodeState}
            />
          ) : (
            <p className="filemanager-element_name">{node.name}</p>
          )}
        </div>
      </FileManagerDraggableElement>
      <div
        className="filemanager-dir-childs-container"
        path={absolutePath ? absolutePath : ""}
      >
        {node.isOpen &&
          childrens.map((element) => {
            return <FileManagerElement key={element.name} node={element} />;
          })}
      </div>
    </div>
  );
}
