import "./OpenTab.css";
import { useState } from "react";
import OpenTabContextMenu from "../../OpenTabsContextMenu/OpenTabsContextMenu";
import OpenTabRenameForm from "../OpenTabRenameForm/OpenTabRenameForm";
import IsRuningIndicator from "../../../../Global/IsRuningIndicator/IsRuningIndicator";
import { File, X } from "lucide-react";
import { useProjectStore } from "../../../../../stores/ProjectStore";

const defaultContextMenuState = {
  x: 0,
  y: 0,
  show: false,
};

export default function OpenTab({ file }) {
  const [contextMenu, setContextMenu] = useState(defaultContextMenuState);
  const [isRename, setIsRename] = useState(false);

  const toggleIsOpen = useProjectStore((store) => store.toggleIsOpen);
  const setCurrentFile = useProjectStore((store) => store.setCurrentFile);
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const closeOpenFile = useProjectStore((store) => store.closeOpenFile);

  const openContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, show: true });
  };

  const closeContextMenu = () => {
    setContextMenu(defaultContextMenuState);
  };

  return (
    <div
      className={`tabs_open-tab ${
        currentFileId == file.id ? "tabs_current-tab" : ""
      }`}
      onContextMenu={openContextMenu}
      onClick={() => {
        if (file.currentTab) return;
        setCurrentFile(file.id);
      }}
    >
      <OpenTabContextMenu
        file={file}
        contextMenu={contextMenu}
        closeContextMenu={closeContextMenu}
        setIsRename={setIsRename}
      />
      <IsRuningIndicator isRunning={file.isRunning} size="8px" />
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
          closeOpenFile(file.id);
          toggleIsOpen(file.id);
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
