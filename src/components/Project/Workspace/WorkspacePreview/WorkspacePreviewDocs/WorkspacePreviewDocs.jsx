import "./WorkspacePreviewDocs.css";
import useDocsContext from "../../../../../Hooks/useDocsContext";
import { marked } from "marked";

export default function WorkspacePreviewDocs() {
  const [docsContext] = useDocsContext();

  return (
    <div className="workspace-preview-docs_container">
      <iframe
        srcDoc={`
        ${marked.parse(docsContext)}
        <style>
          body {
            font-size: 20px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          } 
        </style>`}
      />
    </div>
  );
}
