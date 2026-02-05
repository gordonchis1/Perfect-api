import "./WorkspacePreviewContent.css";
import WorkSpacePreviewResponse from "../WorkSpacePreviewResponse/WorkSpacePreviewResponse";
import WorkSpacePreviewTypes from "../WorkSpacePreviewTypes/WorkSpacePreviewTypes";
import MultipleContainer from "../../../../Global/MultipleContainer/MultipleContainer";
import WorkspacePreviewLoading from "../WorkspacePreviewLoading/WorkspacePreviewLoading";
import { useProjectStore } from "../../../../../stores/ProjectStore";
import WorkSpacePreviewResponseHeaders from "../WorkSpacePreviewResponseHeaders/WorkSpacePreviewResponseHeaders";
import WorkSpacePreviewGallery from "../WorkSpacePreviewResponse/WorkSpacePreviewGallery/WorkSpacePreviewGallery";

const multipleContainerContainers = {
  Response: {
    component: <WorkSpacePreviewResponse />,
  },
  Types: {
    component: <WorkSpacePreviewTypes />,
  },
  Headers: {
    component: <WorkSpacePreviewResponseHeaders />,
  },
  Gallery: {
    component: <WorkSpacePreviewGallery />,
  },
};
const defaultContainer = "Response";

export default function WorkspacePreviewContent() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content,
  );
  const isRunning = useProjectStore(
    (store) => store.openFiles[store.currentFileId].isRunning,
  );

  return (
    <div className="workspace-preview_multiple-container">
      {isRunning ? (
        <WorkspacePreviewLoading
          url={content.url.finalUrl}
          isRunning={isRunning}
        />
      ) : (
        <MultipleContainer
          defaultContainer={defaultContainer}
          objectContainers={multipleContainerContainers}
          mainContainerclassName="workspace_preview-multiple-container"
        />
      )}
    </div>
  );
}
