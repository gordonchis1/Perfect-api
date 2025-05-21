import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useProjectContext from "../../../../../../Hooks/FileManager/useProjectContext";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import useFilemanagerContenxt from "../../../../../../Hooks/FileManager/useFileMangerContext";
import { useRef, useState } from "react";
import { workspaceTypeInput } from "../../../../../../utils/constants/WorkspaceInputConstants";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import useClickAway from "../../../../../../Hooks/useClickAway";
import "./WorkSpaceInputFormTypeSelector.css";

export default function WorkSpaceInputFormTypeSelector({ content }) {
  const { id } = useProjectContext();
  const [filesState] = useFilesContext();
  const [isOpen, setIsOpen] = useState(false);
  const [, fileManagerDispatch] = useFilemanagerContenxt();
  const InputFormSelectorRef = useRef(null);
  useClickAway(InputFormSelectorRef, () => {
    setIsOpen(false);
  });

  const handleOpenOptions = () => {
    setIsOpen(!isOpen);
  };

  const indexOfCurrentType = workspaceTypeInput.findIndex(
    ({ type }) => content.type === type
  );

  const updateContent = (type) => {
    if (content.type === type) return;
    const newContent = content;
    newContent.type = type;
    fileManagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContent,
      payload: { nodeId: filesState.currentFile, newContent, projectId: id },
    });
    setIsOpen(false);
  };

  return (
    <div
      className="input-form-selector-type_container"
      ref={InputFormSelectorRef}
    >
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
