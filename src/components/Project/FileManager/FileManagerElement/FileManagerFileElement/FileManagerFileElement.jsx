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
}) {
  return (
    <div className="filemanager-element" onContextMenu={onContextMenu}>
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
  );
}
