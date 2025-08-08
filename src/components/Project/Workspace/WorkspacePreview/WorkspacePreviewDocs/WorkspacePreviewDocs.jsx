import "./WorkspacePreviewDocs.css";
import { marked } from "marked";
import useDocsContext from "../../../../../Hooks/useDocsContext";

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
      ></iframe>
    </div>
  );
}
