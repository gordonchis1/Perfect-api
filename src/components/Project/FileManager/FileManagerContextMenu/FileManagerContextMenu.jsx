import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./FileManagerContextMenu.css";
import FileManagerContextMenuOption from "./FileMangerContextMenuOption/FileManagerContextMenuOption";
import {
  faFileCirclePlus,
  faFolderPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useFileManagerContext from "../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../providers/FileManager/reducer";
import useProjectContext from "../../../../Hooks/FileManager/useProjectContext";

// TODO agregar el id de el project a un contexto
// TODO: Agregar una pantalla de confirmacion de remove
export default function FileManagerContextMenu({
  node,
  updateNodeState,
  x,
  y,
  closeContextMenu,
}) {
  const { id } = useProjectContext();
  const menuRef = useRef(null);
  useClickAway(menuRef, closeContextMenu);

  const [state, dispatch] = useFileManagerContext();
  const absolutePath = state.getAbsolutePath(node);

  const handleAddDir = () => {
    dispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.addDir,
      payload: { path: absolutePath, id },
    });
    closeContextMenu();
  };

  const handleRemove = () => {
    dispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.remove,
      payload: { type: node.type, path: absolutePath, id },
    });
    closeContextMenu();
  };

  const handleAddFile = () => {
    dispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.addFile,
      payload: { path: absolutePath, id },
    });
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
        icon={faFileCirclePlus}
        onClick={handleAddFile}
      />
      <FileManagerContextMenuOption
        optionFor="dir"
        text={"Agregar Directorio"}
        node={node}
        icon={faFolderPlus}
        onClick={handleAddDir}
      />
      {node.name !== "/" && (
        <>
          <FileManagerContextMenuOption
            node={node}
            text={"Renombrar"}
            icon={faPenToSquare}
            onClick={() => updateNodeState({ ...node, isRename: true })}
          />
          <FileManagerContextMenuOption
            node={node}
            text={"Remover"}
            icon={faTrash}
            onClick={handleRemove}
            color={"red"}
          />
        </>
      )}
    </div>
  );
}
