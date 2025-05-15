import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./FileManagerContextMenu.css";
import { Directory, File } from "../../../../utils/ProjectFileObject";
import UpdateProject from "../../../../utils/UpdateProject";
import { useParams } from "react-router";
import FileManagerContextMenuOption from "./FileMangerContextMenuOption/FileManagerContextMenuOption";
import {
  faFileCirclePlus,
  faFolderPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useFileManagerContext from "../../../../Hooks/FileManager/useFileMangerContext";

// TODO agregar el id de el project a un contexto
// TODO: Agregar una pantalla de confirmacion de remove
export default function FileManagerContextMenu({
  node,
  updateNodeState,
  x,
  y,
  closeContextMenu,
  updateVfs,
}) {
  const { id } = useParams();
  const menuRef = useRef(null);
  useClickAway(menuRef, closeContextMenu);

  const [state] = useFileManagerContext();
  const absolutePath = state.getAbsolutePath(node);

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

  const handleAddFile = () => {
    updateVfs((clonedVfs) => {
      const clonedNode = clonedVfs.getDirByPath(absolutePath);
      clonedNode.addChild(new File("New File"));
      UpdateProject(clonedVfs, id);
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
