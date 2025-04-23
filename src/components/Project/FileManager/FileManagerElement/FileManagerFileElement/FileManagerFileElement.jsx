import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faFile as faFileSolidIcon } from "@fortawesome/free-solid-svg-icons";
import "./FileManagerFileElement.css";

export default function FileManagerFileElement({ node, vfs, onContextMenu }) {
  return (
    <div className="filemanager-element" onContextMenu={onContextMenu}>
      <FontAwesomeIcon icon={node.isOpen ? faFileSolidIcon : faFile} />
      <p className="filemanager-element_name">{node.name}</p>
    </div>
  );
}
