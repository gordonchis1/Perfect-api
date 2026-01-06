import "./WorkSpacePreviewContainer.css";
import WorkspacePreviewContent from "./WorkspacePreviewContent/WorkspacePreviewContent";
import { useProjectStore } from "../../../../stores/ProjectStore";
import WorkspacePreviewHeader from "./WorkSpacePreviewResponse/WorkSpacePreviewHeader/WorkspacePreviewHeader";

export default function WorkSpacePreviewContainer() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );

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
