import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./FileManagerContextMenu.css";
import { Directory, File } from "../../../../utils/ProjectFileObject";
import UpdateProject from "../../../../utils/UpdateProject";
import { useParams } from "react-router";
// TODO agregar el id de el project a un contexto
// TODO: componetizar las opciones
// TODO: Agregar una pantalla de confirmacion de remove
export default function FileManagerContextMenu({
  node,
  updateNodeState,
  x,
  y,
  closeContextMenu,
  updateVfs,
  absolutePath,
}) {
  const { id } = useParams();
  const menuRef = useRef(null);
  useClickAway(menuRef, closeContextMenu);

  const handleAddFile = () => {
    updateVfs((clonedVfs) => {
      const clonedNode = clonedVfs.getDirByPath(absolutePath);
      clonedNode.addChild(new File("New File"));
      UpdateProject(clonedVfs, id);
    });
    closeContextMenu();
  };

  const handleAddDir = () => {
    updateVfs((clonedVfs) => {
      const clonedNode = clonedVfs.getDirByPath(absolutePath);
      clonedNode.addChild(new Directory("New directory", true));
      UpdateProject(clonedVfs, id);
    });
    closeContextMenu();
  };

  const handleRemove = () => {
    updateVfs((clonedVfs) => {
      if (node.type === "dir") {
        const clonedNode = clonedVfs.getDirByPath(absolutePath);
        clonedVfs.remove(clonedNode);
      } else {
        const clonedNode = clonedVfs.getFileByPath(absolutePath);
        clonedVfs.remove(clonedNode);
      }
      UpdateProject(clonedVfs, id);
    });
  };

  return (
    <div
      ref={menuRef}
      className="filemanager-contextmenu"
      style={{ top: `${y}px`, left: `${x}px` }}
      onContextMenu={(event) => event.preventDefault()}
    >
      {node.type == "dir" && (
        <button
          onClick={handleAddFile}
          className="filemanager-contextmenu-option"
        >
          New file
        </button>
      )}
      {node.name !== "/" && (
        <>
          <button
            onClick={() => {
              updateNodeState({ ...node, isRename: true });
            }}
            className="filemanager-contextmenu-option"
          >
            rename
          </button>
          <button onClick={handleRemove}>Remove</button>
        </>
      )}
      {node.type === "dir" && (
        <button onClick={handleAddDir}>Add directory</button>
      )}
    </div>
  );
}
