import "./WorkspaceInputDocsEditorForm.css";

export default function WorkspaceInputDocsEditorForm({
  setIsSourceCodeVisible,
}) {
  return (
    <div className="workspace-input-docs-editor-form_container">
      <div className="docs-editor-form_input-container">
        <input type="text" placeholder="Title" />
        <input type="checkbox" />
      </div>
      <button
        className="docs-editor-form_source-code-button"
        onClick={() => setIsSourceCodeVisible(true)}
      >
        Ver el codigo
      </button>
    </div>
  );
}
