import { useRef, useState } from "react";
import { workspaceTypeInput } from "../../../../../../utils/constants/WorkspaceInputConstants";
import useClickAway from "../../../../../../Hooks/useClickAway";
import "./WorkSpaceInputFormTypeSelector.css";
import { useProjectStore } from "../../../../../../stores/ProjectStore";

export default function WorkSpaceInputFormTypeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile
  );

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

    updateContentOfOpenFile(currentFileId, newContent);

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
