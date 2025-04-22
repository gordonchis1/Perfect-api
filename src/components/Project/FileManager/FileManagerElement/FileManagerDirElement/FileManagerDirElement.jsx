import { useEffect, useState } from "react";
import "./FileManagerDirElement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderClosed,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";
import FileManagerElement from "../FileManagerElement";

export default function FileManagerDirElement({ node, vfs }) {
  const [, forceUpdate] = useState(false);
  const [absolutePath, setAbsolutePath] = useState(undefined);

  useEffect(() => {
    setAbsolutePath(vfs.getAbsolutePath(node));
  }, [node, vfs]);

  const handleToggle = (e) => {
    e.stopPropagation();
    node.toggleIsOpen();
    forceUpdate((prev) => !prev);
  };

  const childrens = node.getChildrens();
  return (
    <div className="filemanager-element-container">
      <div className="filemanager-element" onClick={handleToggle}>
        <FontAwesomeIcon icon={node.isOpen ? faFolderOpen : faFolderClosed} />
        <p className="filemanager-element_name">{node.name}</p>
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
