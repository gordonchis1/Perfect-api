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
  vfs,
}) {
  const { id } = useParams();
  const menuRef = useRef(null);
  useClickAway(menuRef, closeContextMenu);

  const handleAddFile = () => {
    node.addChild(new File("New file"));
    UpdateProject(vfs, id);
    updateNodeState({ ...node });
  };

  const handleAddDir = () => {
    node.addChild(new Directory("New directory", true));
    UpdateProject(vfs, id);
    updateNodeState({ ...node });
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
