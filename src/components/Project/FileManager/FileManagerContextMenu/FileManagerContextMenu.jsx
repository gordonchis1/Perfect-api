import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./FileManagerContextMenu.css";
import FileManagerContextMenuOption from "./FileMangerContextMenuOption/FileManagerContextMenuOption";
import { FilePlus2, FolderPlus, Pen, Trash2 } from "lucide-react";
import { useProjectStore } from "../../../../stores/ProjectStore";

// TODO: Agregar una pantalla de confirmacion de remove
// TODO: open tab when create new file
export default function FileManagerContextMenu({
  node,
  x,
  y,
  closeContextMenu,
}) {
  const menuRef = useRef(null);
  useClickAway(menuRef, closeContextMenu);

  const addDir = useProjectStore((store) => store.addDir);
  const remove = useProjectStore((store) => store.remove);
  const addFile = useProjectStore((store) => store.addFile);
  const setRename = useProjectStore((store) => store.setRename);

  const handleAddDir = () => {
    addDir(node.id);
    closeContextMenu();
  };

  const handleRemove = () => {
    remove(node);
    closeContextMenu();
  };

  const handleAddFile = () => {
    addFile(node.id);
    closeContextMenu();
  };

  return (
    <div
      ref={menuRef}
      className="filemanager-contextmenu"
      style={{ top: `${y}px`, left: `${x}px` }}
      onContextMenu={(event) => event.preventDefault()}
    >
      <FileManagerContextMenuOption
        optionFor="dir"
        text={"Nuevo Archivo"}
        node={node}
        icon={<FilePlus2 size={16} />}
        onClick={handleAddFile}
      />
      <FileManagerContextMenuOption
        optionFor="dir"
        text={"Agregar Directorio"}
        node={node}
        icon={<FolderPlus size={16} />}
        onClick={handleAddDir}
      />
      {node.name !== "/" && (
        <>
          <FileManagerContextMenuOption
            node={node}
            text={"Renombrar"}
            icon={<Pen size={16} />}
            onClick={() => setRename(node.id)}
          />
          <FileManagerContextMenuOption
            node={node}
            text={"Remover"}
            icon={<Trash2 size={16} />}
            onClick={handleRemove}
            color={"var(--destructive)"}
            className="contextmenu-remove-option"
          />
        </>
      )}
    </div>
  );
}
