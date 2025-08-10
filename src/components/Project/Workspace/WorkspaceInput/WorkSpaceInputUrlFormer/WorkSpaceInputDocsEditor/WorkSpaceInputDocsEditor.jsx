import { Editor } from "@monaco-editor/react";
import useDocsContext from "../../../../../../Hooks/useDocsContext";
import "./WorkSpaceInputDocsEditor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function WorkSpaceInputDocsEditor() {
  const [docsState] = useDocsContext();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(docsState);
    } catch {
      throw new Error("Error on write clipboard");
    }
  };

  return (
    <div className="workspace-input-docs-editor_container">
      <div className="input-docs_header-conatiner">
        <h1>Docs editor</h1>
        <button className="input-docs_copy-button" onClick={handleCopy}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
      <div className="workspace-input-docs-editor_editor-container">
        <Editor
          height={"100%"}
          width={"100%"}
          defaultLanguage="markdown"
          value={docsState}
          theme="vs-dark"
          language="markdown"
          path="docs.md"
          defaultPath="docs.md"
          options={{
            fontSize: 18,
            minimap: false,
            wordWrap: "on",
            wordWrapColumn: 60,
          }}
        />
      </div>
    </div>
  );
}
