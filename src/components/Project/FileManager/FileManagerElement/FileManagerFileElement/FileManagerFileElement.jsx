import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";

export default function FileManagerFileElement({ node, vfs }) {
  return (
    <div className="filemanager-element">
      <FontAwesomeIcon icon={faFile} />
      <p className="filemanager-element_name">{node.name}</p>
    </div>
  );
}
