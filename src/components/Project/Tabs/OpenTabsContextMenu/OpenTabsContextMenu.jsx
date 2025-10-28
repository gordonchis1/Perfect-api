import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./OpenTabsContextMenu.css";
import useFilesContext from "../../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../../providers/FilesProvider/reducer";
import OpenTabsContextMenuOption from "./OpenTabsContextMenuOption/OpenTabsContextMenuOption";
import useFileManagerContext from "../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../providers/FileManager/reducer";
import { Pen, X } from "lucide-react";

export default function OpenTabContextMenu({
  file,
  contextMenu,
  closeContextMenu,
  setIsRename,
}) {
  const containerRef = useRef(null);
  const [, dispatchFile] = useFilesContext();
  const [, dispatchFileManager] = useFileManagerContext();

  useClickAway(containerRef, closeContextMenu);

  const handleCloseFile = (event) => {
    event.stopPropagation();
    dispatchFile({
      type: FILES_REDUCER_ACTIONS.closeFile,
      payload: { id: file.id },
    });

    dispatchFileManager({
      type: FILEMANAGER_REDUCER_ACTIONS.toggleIsOpen,
      payload: { path: file.path, type: "file" },
    });
  };
  const handleRename = (event) => {
    event.stopPropagation();
    setIsRename(true);
    closeContextMenu();
  };

  return (
    <>
      {contextMenu.show && (
        <div
          className="open-tab_contextmenu-container"
          ref={containerRef}
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
        >
          <OpenTabsContextMenuOption
            icon={<Pen size={16} />}
            text={"Renombrar"}
            onClick={handleRename}
          />
          <OpenTabsContextMenuOption
            icon={<X size={16} />}
            onClick={handleCloseFile}
            text={"Close"}
            color={"red"}
          />
        </div>
      )}
    </>
  );
}
