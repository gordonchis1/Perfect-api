import useWorkspacePreviewContext from "../../../../Hooks/useWorkspacePreviewContext";
import "./WorkSpacePreviewContainer.css";
import WorkspacePreviewContent from "./WorkspacePreviewContent/WorkspacePreviewContent";
import WorkspacePreviewHeader from "./WorkSpacePreviewResponse/WorkSpacePreviewHeader/WorkspacePreviewHeader";

export default function WorkSpacePreviewContainer() {
  const [content] = useWorkspacePreviewContext();

  return (
    <>
      {content && (
        <div className="workspace_preview-container">
          <WorkspacePreviewHeader />
          <WorkspacePreviewContent />
        </div>
      )}
    </>
  );
}
