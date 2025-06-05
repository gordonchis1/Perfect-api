import { useRef, useState } from "react";
import "./WorkspacePreviewJsonStringUrlComponent.css";
import useClickAway from "../../../../../../../Hooks/useClickAway";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { openUrl } from "@tauri-apps/plugin-opener";
import useFileManagerContext from "../../../../../../../Hooks/FileManager/useFileMangerContext";
import FileManagerContextMenu from "../../../../../FileManager/FileManagerContextMenu/FileManagerContextMenu";
import { VirtualFileSystem } from "../../../../../../../utils/ProjectFileObject";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../../providers/FileManager/reducer";
import useFilesContext from "../../../../../../../Hooks/useFilesContext";
import useProjectContext from "../../../../../../../Hooks/FileManager/useProjectContext";
import { fileContentDefault } from "../../../../../../../utils/constants/ProjectFileConstants";

const defaultContextMenuState = {
  x: 0,
  y: 0,
  show: false,
};

export default function WorkspacePreviewJsonStringUrlComponent({
  value,
  rest,
}) {
  const [contextMenu, setContextMenu] = useState(defaultContextMenuState);
  const contextMenuRef = useRef(null);
  const [fileManagerContext, fileManagerDispatcher] = useFileManagerContext();
  const [filesState] = useFilesContext();
  const { id } = useProjectContext();
  useClickAway(contextMenuRef, () => setContextMenu(defaultContextMenuState));

  const handleContextMenu = (event) => {
    event.preventDefault();
    const { pageX, pageY } = event;

    setContextMenu({
      show: true,
      x: pageX,
      y: pageY,
    });
  };

  const handleOpenBrowser = async () => {
    await openUrl(value);
    setContextMenu(defaultContextMenuState);
  };

  const handleCreateNewTab = () => {
    if (fileManagerContext instanceof VirtualFileSystem) {
      const node = fileManagerContext.getNodeById(filesState.currentFile);
      const path = fileManagerContext.getAbsolutePath(node);
      let dirPath = path.split("/");
      if (path) {
        dirPath.pop();

        dirPath = dirPath.join("/");
      }

      const urlFromValue = new URL(value);

      fileManagerDispatcher({
        type: FILEMANAGER_REDUCER_ACTIONS.addFileWithCustomContent,
        payload: {
          path: dirPath,
          id,
          name: urlFromValue.hostname,
          content: {
            ...fileContentDefault,
            url: {
              ...fileContentDefault.url,
              parseUrl: value,
              inputUrl: value,
            },
          },
        },
      });
    }

    setContextMenu(defaultContextMenuState);
  };

  return (
    <div {...rest} onContextMenu={handleContextMenu}>
      {contextMenu.show && (
        <div
          className="preview-json_string-url-context-menu-container"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          ref={contextMenuRef}
        >
          <button
            className="json-string-url-context-menu_option"
            onClick={handleOpenBrowser}
          >
            <FontAwesomeIcon icon={faGlobe} />
            Abrir en el navegador
          </button>
          <button
            className="json-string-url-context-menu_option"
            onClick={handleCreateNewTab}
          >
            <FontAwesomeIcon icon={faAdd} />
            Crear una nueva pestaña con esta URL
          </button>
        </div>
      )}
      {value}
    </div>
  );
}
