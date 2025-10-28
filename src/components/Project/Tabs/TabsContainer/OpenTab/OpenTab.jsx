import "./OpenTab.css";
import useFilesContext from "../../../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../../../providers/FilesProvider/reducer";
import useFileManagerContext from "../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../providers/FileManager/reducer";
import { useState } from "react";
import OpenTabContextMenu from "../../OpenTabsContextMenu/OpenTabsContextMenu";
import OpenTabRenameForm from "../OpenTabRenameForm/OpenTabRenameForm";
import IsRuningIndicator from "../../../../Global/IsRuningIndicator/IsRuningIndicator";
import { File, X } from "lucide-react";

const defaultContextMenuState = {
  x: 0,
  y: 0,
  show: false,
};

export default function OpenTab({ file }) {
  const [, dispatch] = useFilesContext();
  const [, fileManagerDispatch] = useFileManagerContext();
  const [contextMenu, setContextMenu] = useState(defaultContextMenuState);
  const [isRename, setIsRename] = useState(false);

  const openContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, show: true });
  };

  const closeContextMenu = () => {
    setContextMenu(defaultContextMenuState);
  };

  return (
    <div
      className={`tabs_open-tab ${file.currentTab ? "tabs_current-tab" : ""}`}
      onContextMenu={openContextMenu}
      onClick={() => {
        if (file.currentTab) return;
        dispatch({
          type: FILES_REDUCER_ACTIONS.changeCurrentTab,
          payload: { id: file.id },
        });
      }}
    >
      <OpenTabContextMenu
        file={file}
        contextMenu={contextMenu}
        closeContextMenu={closeContextMenu}
        setIsRename={setIsRename}
      />
      <IsRuningIndicator isRuning={file.content.isRuning} size="8px" />
      <File size={16} />
      {isRename ? (
        <OpenTabRenameForm
          setIsRename={setIsRename}
          isRename={isRename}
          file={file}
        />
      ) : (
        <span>{file.name}</span>
      )}
      <button
        className="tabs_open-tab-close-button"
        onClick={(event) => {
          event.stopPropagation();
          dispatch({
            type: FILES_REDUCER_ACTIONS.closeFile,
            payload: { id: file.id },
          });
          fileManagerDispatch({
            type: FILEMANAGER_REDUCER_ACTIONS.toggleIsOpen,
            payload: { path: file.path, type: "file" },
          });
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
