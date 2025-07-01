import WorkSpacePreviewProvider from "../../../../providers/WorkspacePreview/WorkSpacePreviewProvider";
import "./WorkSpacePreviewContainer.css";
import WorkspacePreviewContent from "./WorkspacePreviewContent/WorkspacePreviewContent";

export default function WorkSpacePreviewContainer() {
  return (
    <div className="workspace_preview-container">
      <WorkSpacePreviewProvider>
        <WorkspacePreviewContent />
      </WorkSpacePreviewProvider>
    </div>
  );
}
