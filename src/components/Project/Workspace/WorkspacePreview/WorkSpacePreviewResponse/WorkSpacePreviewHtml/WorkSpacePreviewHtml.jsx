import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import "./WorkSpacePreviewHtml.css";

export default function WorksSpacePreviewHtml() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();

  return (
    <div className="workspace-preview-response_html-preview-container">
      {workspacePreviewContext.responses.length > 0 && (
        <iframe
          className="workspace-preview-response_html-preview"
          title="HTML Preview"
          srcDoc={String(
            workspacePreviewContext.responses[
              workspacePreviewContext.currentResponseIdx
            ].response
          )}
          style={{ width: "100%", height: "100%", border: "none" }}
          sandbox="allow-same-origin"
        ></iframe>
      )}
    </div>
  );
}
