import { useRef, useState } from "react";
import "./WorkspacePreviewJsonStringUrlComponent.css";
import useClickAway from "../../../../../../../Hooks/useClickAway";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { openUrl } from "@tauri-apps/plugin-opener";

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
        </div>
      )}
      {value}
    </div>
  );
}
