import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faFile as faFileSolidIcon } from "@fortawesome/free-solid-svg-icons";
import "./FileManagerFileElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";

export default function FileManagerFileElement({
  node,
  onContextMenu,
  nodeState,
  updateNodeState,
  level,
  updateVfs,
  absolutePath,
}) {
  return (
    <div
      className="filemanager-element"
      style={{ paddingLeft: `${level * 20}px` }}
      onContextMenu={onContextMenu}
    >
      <div className="filemanager-element-content">
        <FontAwesomeIcon icon={node.isOpen ? faFileSolidIcon : faFile} />
        {nodeState?.isRename ? (
          <FileManagerRenameForm
            absolutePath={absolutePath}
            node={node}
            nodeState={nodeState}
            updateNodeState={updateNodeState}
            updateVfs={updateVfs}
          />
        ) : (
          <p className="filemanager-element_name">{node.name}</p>
        )}
      </div>
    </div>
  );
}
