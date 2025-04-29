import FileManagerDirElement from "./FileManagerDirElement/FileManagerDirElement";
import FileManagerFileElement from "./FileManagerFileElement/FileManagerFileElement";
import "./FileManagerElement.css";
import { useEffect, useState } from "react";
import FileManagerContextMenu from "../FileManagerContextMenu/FileManagerContextMenu";

const defaultContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function FileManagerElement({ node, vfs }) {
  const [contextMenu, setContextMenu] = useState(defaultContextMenu);
  const [nodeState, setNodeState] = useState({ ...node, isRename: false });
  const [level, setLevel] = useState(undefined);

  useEffect(() => {
    const absolutePath = vfs.getAbsolutePath(node);

    if (absolutePath !== "/") {
      setLevel(absolutePath.split("/").length);
    } else {
      setLevel([""].length);
    }
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();

    const { pageX, pageY } = event;

    setContextMenu({
      show: true,
      x: pageX,
      y: pageY,
    });
  };

  useEffect(() => {
    if (nodeState?.isRename) {
      setContextMenu(defaultContextMenu);
    }
  }, [nodeState]);

  const updateNodeState = (updatedNode) => {
    setNodeState(updatedNode);
  };

  const closeContextMenu = () => setContextMenu(defaultContextMenu);

  return (
    <>
      {contextMenu.show && (
        <FileManagerContextMenu
          updateNodeState={updateNodeState}
          vfs={vfs}
          node={node}
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={closeContextMenu}
        />
      )}
      {node.type === "dir" ? (
        <FileManagerDirElement
          updateNodeState={updateNodeState}
          nodeState={nodeState}
          node={node}
          vfs={vfs}
          onContextMenu={handleContextMenu}
          level={level}
        />
      ) : (
        <FileManagerFileElement
          level={level}
          updateNodeState={updateNodeState}
          node={node}
          vfs={vfs}
          onContextMenu={handleContextMenu}
          nodeState={nodeState}
        />
      )}
    </>
  );
}
