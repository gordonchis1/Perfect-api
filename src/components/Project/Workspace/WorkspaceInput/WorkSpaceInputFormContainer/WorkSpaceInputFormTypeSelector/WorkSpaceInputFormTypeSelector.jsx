import useProjectContext from "../../../../../../Hooks/FileManager/useProjectContext";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import useFilemanagerContenxt from "../../../../../../Hooks/FileManager/useFileMangerContext";
import { useRef, useState } from "react";
import { workspaceTypeInput } from "../../../../../../utils/constants/WorkspaceInputConstants";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import useClickAway from "../../../../../../Hooks/useClickAway";
import "./WorkSpaceInputFormTypeSelector.css";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { useProjectStore } from "../../../../../../stores/ProjectStore";

export default function WorkSpaceInputFormTypeSelector() {
  const { id } = useProjectContext();
  const [filesState] = useFilesContext();
  const [isOpen, setIsOpen] = useState(false);
  const [, fileManagerDispatch] = useFilemanagerContenxt();
  const InputFormSelectorRef = useRef(null);
  useClickAway(InputFormSelectorRef, () => {
    setIsOpen(false);
  });
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );

  const handleOpenOptions = () => {
    setIsOpen(!isOpen);
  };

  const indexOfCurrentType = workspaceTypeInput.findIndex(
    ({ type }) => content.type === type
  );

  const updateContent = (type) => {
    if (content.type === type) {
      setIsOpen(false);
      return;
    }
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
        style={{ background: workspaceTypeInput[indexOfCurrentType].bg }}
      >
        <span style={{ color: workspaceTypeInput[indexOfCurrentType].color }}>
          {content.type}
        </span>
      </button>
      {isOpen && (
        <div className="workspace-input-form-url_types-options-container">
          {workspaceTypeInput.map((option) => {
            return (
              <button
                className="workspace-input-form-url_types-option"
                key={option.type}
                style={{ color: option.bg }}
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
