import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./FileManagerContextMenu.css";
import { File } from "../../../../utils/ProjectFileObject";
import UpdateProject from "../../../../utils/UpdateProject";
import { useParams } from "react-router";
// TODO agregar el id de el project a un contexto
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

  return (
    <div
      ref={menuRef}
      className="filemanager-contextmenu"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {node.type == "dir" && (
        <button
          onClick={handleAddFile}
          className="filemanager-contextmenu-option"
        >
          New file
        </button>
      )}
      {node.type === "file" && (
        <button
          onClick={() => console.log("rename")}
          className="filemanager-contextmenu-option"
        >
          rename
        </button>
      )}
    </div>
  );
}
