import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderClosed,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";
import FileManagerElement from "../FileManagerElement";
import "./FileManagerDirElement.css";
import { VirtualFileSystem } from "../../../../../utils/ProjectFileObject";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";

export default function FileManagerDirElement({
  node,
  vfs,
  onContextMenu,
  nodeState,
  updateNodeState,
  level,
}) {
  const handleToggle = (e) => {
    e.stopPropagation();
    node.toggleIsOpen();
    updateNodeState({ ...node });
  };

  const childrens = node.getChildrens();
  return (
    <div className="filemanager-element-container">
      <div
        className="filemanager-element"
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={handleToggle}
        onContextMenu={(event) => onContextMenu(event)}
      >
        <div className="filemanager-element-content">
          <FontAwesomeIcon icon={node.isOpen ? faFolderOpen : faFolderClosed} />
          {nodeState.isRename ? (
            <FileManagerRenameForm
              node={node}
              nodeState={nodeState}
              updateNodeState={updateNodeState}
              vfs={vfs}
            />
          ) : (
            <p className="filemanager-element_name">{node.name}</p>
          )}
        </div>
      </div>
      <div className="filemanager-dir-childs-container">
        {node.isOpen &&
          childrens.map((element) => {
            return (
              <FileManagerElement key={element.name} node={element} vfs={vfs} />
            );
          })}
      </div>
    </div>
  );
}
