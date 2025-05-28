import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WorkSpacePreviewResponseSelector.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function WorkSpacePreviewResponseSelector({
  responses,
  currentResponseIdx,
}) {
  return (
    <div className="workspace-preview-responses_selector-container">
      <button className="responses-selector_open-button">
        <span>{responses[currentResponseIdx].url}</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
    </div>
  );
}
