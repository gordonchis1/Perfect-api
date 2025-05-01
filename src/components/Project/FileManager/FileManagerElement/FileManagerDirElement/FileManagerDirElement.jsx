import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderClosed,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import FileManagerElement from "../FileManagerElement";
import "./FileManagerDirElement.css";
import { VirtualFileSystem } from "../../../../../utils/ProjectFileObject";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";
import { useRef, useState } from "react";

export default function FileManagerDirElement({
  node,
  vfs,
  onContextMenu,
  nodeState,
  updateNodeState,
  level,
  absolutePath,
}) {
  const [draggin, setDraggin] = useState(false);

  const handleToggle = (e) => {
    if (node.name === "/") return;
    e.stopPropagation();
    node.toggleIsOpen();
    updateNodeState({ ...node });
  };

  const childrens = node.getChildrens();
  const FilemanagerElementContainerRef = useRef(null);

  const handleOnMouseDown = (event) => {
    const originalWidth = FilemanagerElementContainerRef.current.clientWidth;
    if (node.name === "/") return;
    const { clientX: startX, clientY: startY } = event;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const diffX = Math.abs(clientX - startX);
      const diffY = Math.abs(clientY - startY);
      if (!draggin && (diffX > 5 || diffY > 5)) {
        setDraggin(true);
        FilemanagerElementContainerRef.current.style.left = `${clientX}px`;
        FilemanagerElementContainerRef.current.style.top = `${clientY}px`;
        FilemanagerElementContainerRef.current.style.minWidth = `${originalWidth}px`;
        FilemanagerElementContainerRef.current.addEventListener(
          "click",
          handlePreventClick,
          true
        );

        const elementBelow = document.elementsFromPoint(clientX, clientY);

        const filemanagerElementContainerBelow = elementBelow.filter((el) =>
          el.classList.contains("filemanager-element-container")
        );

        if (filemanagerElementContainerBelow[1]) {
          if (
            !filemanagerElementContainerBelow[1].classList.contains(
              "hover-drag-and-drop"
            )
          ) {
            document
              .querySelectorAll(".hover-drag-and-drop")
              .forEach((el) => el.classList.remove("hover-drag-and-drop"));

            filemanagerElementContainerBelow[1].classList.add(
              "hover-drag-and-drop"
            );
          }
        }
      }
    };

    const handlePreventClick = (event) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      FilemanagerElementContainerRef.current.removeEventListener(
        "click",
        handlePreventClick,
        true
      );
    };

    const handleMouseUp = () => {
      setDraggin(false);
      document
        .querySelectorAll(".hover-drag-and-drop")
        .forEach((el) => el.classList.remove("hover-drag-and-drop"));
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
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
      path={absolutePath ? absolutePath : ""}
    >
      <div
        className="filemanager-element"
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={handleToggle}
        onMouseDown={handleOnMouseDown}
        onContextMenu={(event) => onContextMenu(event)}
      >
        <div className="filemanager-element-content">
          <FontAwesomeIcon icon={node.isOpen ? faFolderOpen : faFolderClosed} />
          {nodeState.isRename ? (
            <FileManagerRenameForm
              node={node}
              nodeState={nodeState}
              updateNodeState={updateNodeState}
              vfs={vfs}
            />
          ) : (
            <p className="filemanager-element_name">{node.name}</p>
          )}
        </div>
      </div>
      <div
        className="filemanager-dir-childs-container"
        path={absolutePath ? absolutePath : ""}
      >
        {node.isOpen &&
          childrens.map((element) => {
            return (
              <FileManagerElement key={element.name} node={element} vfs={vfs} />
            );
          })}
      </div>
    </div>
  );
}
