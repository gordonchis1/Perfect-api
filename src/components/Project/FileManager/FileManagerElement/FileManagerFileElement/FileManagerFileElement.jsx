import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faFile as faFileSolidIcon } from "@fortawesome/free-solid-svg-icons";
import "./FileManagerFileElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";

export default function FileManagerFileElement({
  node,
  vfs,
  onContextMenu,
  nodeState,
  updateNodeState,
  level,
}) {
  return (
    <div className="filemanager-element-container">
      <div
        className="filemanager-element"
        style={{ paddingLeft: `${level * 20}px` }}
        onContextMenu={onContextMenu}
      >
        <div className="filemanager-element-content">
          <FontAwesomeIcon icon={node.isOpen ? faFileSolidIcon : faFile} />
          {nodeState?.isRename ? (
            <FileManagerRenameForm
              node={node}
              nodeState={nodeState}
              vfs={vfs}
              updateNodeState={updateNodeState}
            />
          ) : (
            <p className="filemanager-element_name">{node.name}</p>
          )}
        </div>
      </div>
    </div>
  );
}
