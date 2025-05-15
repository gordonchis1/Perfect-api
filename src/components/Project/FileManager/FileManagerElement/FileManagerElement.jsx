import FileManagerDirElement from "./FileManagerDirElement/FileManagerDirElement";
import FileManagerFileElement from "./FileManagerFileElement/FileManagerFileElement";
import "./FileManagerElement.css";
import { useEffect, useState } from "react";
import FileManagerContextMenu from "../FileManagerContextMenu/FileManagerContextMenu";
import useFileManagerContext from "../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../providers/FileManager/reducer";

// Todo: despues refactorizar el estado para usar un estado global para evitar props drilling

const defaultContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function FileManagerElement({ node, vfs, updateVfs }) {
  const [contextMenu, setContextMenu] = useState(defaultContextMenu);
  const [nodeState, setNodeState] = useState({ ...node, isRename: false });
  const [state, dispatch] = useFileManagerContext();

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
          updateVfs={updateVfs}
        />
      )}
      {node.type === "dir" ? (
        <FileManagerDirElement
          updateNodeState={updateNodeState}
          nodeState={nodeState}
          node={node}
          vfs={vfs}
          onContextMenu={handleContextMenu}
          updateVfs={updateVfs}
        />
      ) : (
        <FileManagerFileElement
          updateNodeState={updateNodeState}
          node={node}
          onContextMenu={handleContextMenu}
          nodeState={nodeState}
          updateVfs={updateVfs}
        />
      )}
    </>
  );
}
