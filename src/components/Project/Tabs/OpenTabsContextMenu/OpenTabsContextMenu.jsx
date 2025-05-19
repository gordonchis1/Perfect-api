import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./OpenTabsContextMenu.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useFilesContext from "../../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../../providers/FilesProvider/reducer";
import OpenTabsContextMenuOption from "./OpenTabsContextMenuOption/OpenTabsContextMenuOption";

export default function OpenTabContextMenu({
  id,
  contextMenu,
  closeContextMenu,
}) {
  const containerRef = useRef(null);
  const [, dispatchFile] = useFilesContext();

  useClickAway(containerRef, closeContextMenu);

  const handleCloseFile = (event) => {
    event.stopPropagation();
    dispatchFile({ type: FILES_REDUCER_ACTIONS.closeFile, payload: { id } });
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
            icon={faClose}
            onClick={handleCloseFile}
            text={"Close"}
            color={"red"}
          />
        </div>
      )}
    </>
  );
}
