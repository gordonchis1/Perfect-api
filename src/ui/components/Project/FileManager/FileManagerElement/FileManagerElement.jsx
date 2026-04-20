import FileManagerDirElement from "./FileManagerDirElement/FileManagerDirElement";
import FileManagerFileElement from "./FileManagerFileElement/FileManagerFileElement";
import "./FileManagerElement.css";
import { useState } from "react";
import FileManagerContextMenu from "../FileManagerContextMenu/FileManagerContextMenu";

// !FIX: arreglar la identacion de los elementos en el file manager
// !FIX: Poner los directorios primero y luego los archivos en orden alfabetico

const defaultContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function FileManagerElement({ node, updateVfs }) {
  const [contextMenu, setContextMenu] = useState(defaultContextMenu);

  const handleContextMenu = (event) => {
    event.preventDefault();

    const { pageX, pageY } = event;

    setContextMenu({
      show: true,
      x: pageX,
      y: pageY,
    });
  };

  const closeContextMenu = () => setContextMenu(defaultContextMenu);

  return (
    <>
      {contextMenu.show && (
        <FileManagerContextMenu
          node={node}
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={closeContextMenu}
        />
      )}
      {node.type === "dir" ? (
        <FileManagerDirElement
          closeContextMenu={closeContextMenu}
          node={node}
          onContextMenu={handleContextMenu}
          updateVfs={updateVfs}
        />
      ) : (
        <FileManagerFileElement
          closeContextMenu={closeContextMenu}
          node={node}
          onContextMenu={handleContextMenu}
          updateVfs={updateVfs}
        />
      )}
    </>
  );
}
