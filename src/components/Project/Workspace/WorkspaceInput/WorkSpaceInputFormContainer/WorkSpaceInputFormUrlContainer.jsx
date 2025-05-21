import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { workspaceTypeInput } from "../../../../../utils/constants/WorkspaceInputConstants";
import "./WorkSpaceInputFormUrlContainer.css";
import { useRef, useState } from "react";
import useClickAway from "../../../../../Hooks/useClickAway";
import useFilemanagerContenxt from "../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../providers/FileManager/reducer";
import useFilesContext from "../../../../../Hooks/useFilesContext";
import useProjectContext from "../../../../../Hooks/FileManager/useProjectContext";

export default function WorkSpaceInputUrlContainer({ content }) {
  const [isOpen, setIsOpen] = useState(false);
  const [, fileManagerDispatch] = useFilemanagerContenxt();
  const [filesState] = useFilesContext();
  const optionsContainerRef = useRef(null);
  useClickAway(optionsContainerRef, () => setIsOpen(false));
  const { id } = useProjectContext();

  const handleOpenOptions = () => {
    setIsOpen(!isOpen);
  };

  const indexOfCurrentType = workspaceTypeInput.findIndex(
    ({ type }) => content.type === type
  );

  const updateContent = (type) => {
    const newContent = content;
    newContent.type = type;
    fileManagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContent,
      payload: { nodeId: filesState.currentFile, newContent, projectId: id },
    });
  };

  return (
    <div className="workspace-input_form-url" ref={optionsContainerRef}>
      <button
        onClick={handleOpenOptions}
        className="workspace-input-form_select-type-button"
        style={{ backgroundColor: isOpen ? "var(--accent-background)" : "" }}
      >
        <span style={{ color: workspaceTypeInput[indexOfCurrentType].color }}>
          {content.type}
        </span>
        <FontAwesomeIcon
          className="workspace-input-form_select-type-icon"
          style={{ transform: isOpen ? "rotate(-180deg)" : "" }}
          icon={faAngleDown}
        />
      </button>
      {isOpen && (
        <div className="workspace-input-form-url_types-options-container">
          {workspaceTypeInput.map((option) => {
            return (
              <button
                className="workspace-input-form-url_types-option"
                key={option.type}
                style={{ color: option.color }}
                onClick={() => updateContent(option.type)}
              >
                <span>{option.type}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
