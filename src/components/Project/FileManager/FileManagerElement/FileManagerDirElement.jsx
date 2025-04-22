import { useState } from "react";
import {
  Directory,
  FSNode,
  VirtualFileSystem,
} from "../../../../utils/ProjectFileObject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-regular-svg-icons";

// TODO: cambiar el nombre del archivo y del componente por FileManagerElement
export default function FileManagerDirElement({ node }) {
  const [, forceUpdate] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation(); // Evita que el click se propague y se abran otros
    node.toggleIsOpen();
    forceUpdate((prev) => !prev); // Forzamos re-render
  };

  if (node.type === "dir") {
    const childrens = node.getChildrens();
    return (
      <div className="filemanager-element-container">
        <FontAwesomeIcon icon={faFolder}></FontAwesomeIcon>
        <p onClick={handleToggle}>{node.name}</p>
        {node.isOpen &&
          childrens.map((element) => {
            return (
              <FileManagerDirElement node={element} isOpen={element.isOpen} />
            );
          })}
      </div>
    );
  } else {
    return (
      <p>
        <FontAwesomeIcon icon={faFile} />
        {node.name}
      </p>
    );
  }
}
