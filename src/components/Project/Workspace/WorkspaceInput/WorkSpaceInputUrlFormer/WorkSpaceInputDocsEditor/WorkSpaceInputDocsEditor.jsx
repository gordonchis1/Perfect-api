import useDocsContext from "../../../../../../Hooks/useDocsContext";
import "./WorkSpaceInputDocsEditor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import WorkspaceInputDocsEditorForm from "./WorkspaceInputDocsEditorForm/WorkspaceInputDocsEditorForm";
import WorkspaceInputDocsSourceCode from "./WorkspaceInputDocsSourceCode/WorkspaceInputDocsSourceCode";

export default function WorkSpaceInputDocsEditor() {
  const [docsState] = useDocsContext();
  const [isCopied, setIsCopied] = useState(false);
  const [isSourceCodeVisible, setIsSourceCodeVisible] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(docsState);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 700);
    } catch {
      throw new Error("Error on write clipboard");
    }
  };

  return (
    <div className="workspace-input-docs-editor_container">
      <div className="input-docs_header-conatiner">
        <h1>Docs editor</h1>
        <button className="input-docs_copy-button" onClick={handleCopy}>
          {isCopied ? (
            <FontAwesomeIcon icon={faCheck} color="#22ff00" />
          ) : (
            <FontAwesomeIcon icon={faCopy} />
          )}
        </button>
      </div>
      <div className="workspace-input-docs-editor_editor-container">
        {isSourceCodeVisible ? (
          <>
            <WorkspaceInputDocsSourceCode />
            <button
              className="workspace-input-docs-editor_form-back-button"
              onClick={() => setIsSourceCodeVisible(false)}
            >
              Regresar al editor
            </button>
          </>
        ) : (
          <WorkspaceInputDocsEditorForm
            setIsSourceCodeVisible={setIsSourceCodeVisible}
          />
        )}
      </div>
    </div>
  );
}
