import { Editor } from "@monaco-editor/react";
import useDocsContext from "../../../../../../Hooks/useDocsContext";
import "./WorkSpaceInputDocsEditor.css";

export default function WorkSpaceInputDocsEditor() {
  const [docsState] = useDocsContext();

  return (
    <div className="workspace-input-docs-editor_container">
      <h1>Docs editor</h1>
      <div className="workspace-input-docs-editor_editor-container">
        <Editor
          height={"100%"}
          width={"100%"}
          defaultLanguage="markdown"
          defaultValue={docsState}
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
