import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./FileManagerContextMenu.css";
import { Directory, File } from "../../../../utils/ProjectFileObject";
import UpdateProject from "../../../../utils/UpdateProject";
import { useParams } from "react-router";
// TODO agregar el id de el project a un contexto
// TODO: componetizar las opciones
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
  };

  const handleAddDir = () => {
    updateVfs((clonedVfs) => {
      const clonedNode = clonedVfs.getDirByPath(absolutePath);
      clonedNode.addChild(new Directory("New directory", true));
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
        <button
          onClick={() => {
            updateNodeState({ ...node, isRename: true });
          }}
          className="filemanager-contextmenu-option"
        >
          rename
        </button>
      )}
      {node.type === "dir" && (
        <button onClick={handleAddDir}>Add directory</button>
      )}
    </div>
  );
}
