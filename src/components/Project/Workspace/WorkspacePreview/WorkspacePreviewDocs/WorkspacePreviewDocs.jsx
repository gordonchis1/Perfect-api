import "./WorkspacePreviewDocs.css";
import { useEffect, useState } from "react";
import { generateDocs } from "../../../../../utils/generateDocs/generateDocs";
import useWorkSpaceContentContext from "../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { marked } from "marked";
import useWorkspacePreviewContext from "../../../../../Hooks/useWorkspacePreviewContext";
import useDocsContext from "../../../../../Hooks/useDocsContext";

export default function WorkspacePreviewDocs() {
  const [content] = useWorkSpaceContentContext();
  const [docsContent, setDoscContent] = useState("");
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const [docsContext] = useDocsContext();
  console.log(content);

  useEffect(() => {
    const currentResponse =
      workspacePreviewContext.responses[
        workspacePreviewContext.currentResponseIdx
      ];

    if (Object.keys(content.docs).length !== 0) {
      setDoscContent(
        generateDocs(content.docs, currentResponse?.response || {})
      );
    }
  }, [content, workspacePreviewContext]);

  return (
    <div className="workspace-preview-docs_container">
      <iframe
        srcDoc={`
        ${marked.parse(docsContent)}
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
