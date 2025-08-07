import useDocsContext from "../../../../../../Hooks/useDocsContext";
import "./WorkSpaceInputDocsEditor.css";

export default function WorkSpaceInputDocsEditor() {
  const [docsState] = useDocsContext();

  return (
    <div className="workspace-input-docs-editor_container">
      <h1>Docs editor</h1>
    </div>
  );
}
