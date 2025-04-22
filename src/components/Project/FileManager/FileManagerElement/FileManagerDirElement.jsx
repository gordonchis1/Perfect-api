import { useEffect, useState } from "react";
import "./FileManagerDirElement.css";
import {
  Directory,
  FSNode,
  VirtualFileSystem,
} from "../../../../utils/ProjectFileObject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolderClosed,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";

// TODO: cambiar el nombre del archivo y del componente por FileManagerElement
export default function FileManagerDirElement({ node, vfs }) {
  const [, forceUpdate] = useState(false);
  const [absolutePath, setAbsolutePath] = useState(undefined);

  useEffect(() => {
    setAbsolutePath(vfs.getAbsolutePath(node));
  }, [node]);

  const handleToggle = (e) => {
    e.stopPropagation();
    node.toggleIsOpen();
    forceUpdate((prev) => !prev);
  };

  if (node.type === "dir") {
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
              <FileManagerDirElement
                key={element.name}
                node={element}
                isOpen={element.isOpen}
                vfs={vfs}
              />
            );
          })}
      </div>
    );
  } else {
    return (
      <div className="filemanager-element">
        <FontAwesomeIcon icon={faFile} />
        <p className="filemanager-element_name">{node.name}</p>
      </div>
    );
  }
}
