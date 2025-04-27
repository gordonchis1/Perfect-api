import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderClosed,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";
import FileManagerElement from "../FileManagerElement";
import "./FileManagerDirElement.css";
import { VirtualFileSystem } from "../../../../../utils/ProjectFileObject";

export default function FileManagerDirElement({
  node,
  vfs,
  onContextMenu,
  nodeState,
  updateNodeState,
}) {
  const [absolutePath, setAbsolutePath] = useState(undefined);

  useEffect(() => {
    setAbsolutePath(vfs.getAbsolutePath(node));
  }, [node, vfs]);

  const handleToggle = (e) => {
    e.stopPropagation();
    node.toggleIsOpen();
    updateNodeState({ ...node });
  };

  const childrens = node.getChildrens();
  return (
    <div className="filemanager-element-container">
      <div
        className="filemanager-element"
        onClick={handleToggle}
        onContextMenu={(event) => onContextMenu(event)}
      >
        <FontAwesomeIcon icon={node.isOpen ? faFolderOpen : faFolderClosed} />
        {nodeState.isRename ? (
          "rename"
        ) : (
          <p className="filemanager-element_name">{node.name}</p>
        )}
      </div>
      {node.isOpen &&
        childrens.map((element) => {
          return (
            <FileManagerElement key={element.name} node={element} vfs={vfs} />
          );
        })}
    </div>
  );
}
