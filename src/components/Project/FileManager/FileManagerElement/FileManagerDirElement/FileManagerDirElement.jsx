import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderClosed,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import FileManagerElement from "../FileManagerElement";
import "./FileManagerDirElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";
import { useRef, useState } from "react";
import FileManagerDraggableElement from "../FileManagerDraggableElement/FileManagerDraggableElement";
import useFileManagerContext from "../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../providers/FileManager/reducer";

export default function FileManagerDirElement({
  node,
  vfs,
  onContextMenu,
  nodeState,
  updateNodeState,
  updateVfs,
}) {
  const [draggin, setDraggin] = useState(false);
  const [state, dispatch] = useFileManagerContext();

  const absolutePath = state.getAbsolutePath(node);
  const level = absolutePath.split("/").length;

  const handleToggle = (e) => {
    if (node.name === "/") return;
    e.stopPropagation();
    dispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.toggleIsOpen,
      payload: absolutePath,
    });
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
        absolutePath={absolutePath}
        draggin={draggin}
        setDraggin={setDraggin}
        updateVfs={updateVfs}
        onClick={handleToggle}
        style={{
          paddingLeft: node.name !== "/" ? `${level * 20}px` : "20px",
        }}
        onContextMenu={(event) => onContextMenu(event)}
      >
        <div className="filemanager-element-content">
          <FontAwesomeIcon icon={node.isOpen ? faFolderOpen : faFolderClosed} />
          {nodeState.isRename ? (
            <FileManagerRenameForm
              absolutePath={absolutePath}
              node={node}
              updateVfs={updateVfs}
              nodeState={nodeState}
              updateNodeState={updateNodeState}
              vfs={vfs}
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
            return (
              <FileManagerElement
                key={element.name}
                node={element}
                vfs={vfs}
                updateVfs={updateVfs}
              />
            );
          })}
      </div>
    </div>
  );
}
