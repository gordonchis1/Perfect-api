import FileManagerDirElement from "./FileManagerDirElement/FileManagerDirElement";
import FileManagerFileElement from "./FileManagerFileElement/FileManagerFileElement";
import "./FileManagerElement.css";
import { useState } from "react";
import FileManagerContextMenu from "../FileManagerContextMenu/FileManagerContextMenu";

const defaultContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function FileManagerElement({ node, vfs }) {
  const [, forceUpdate] = useState(false);
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

  const update = () => {
    forceUpdate((prev) => !prev);
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
          node={node}
          vfs={vfs}
          update={update}
          onContextMenu={handleContextMenu}
        />
      ) : (
        <FileManagerFileElement
          node={node}
          vfs={vfs}
          onContextMenu={handleContextMenu}
        />
      )}
    </>
  );
}
