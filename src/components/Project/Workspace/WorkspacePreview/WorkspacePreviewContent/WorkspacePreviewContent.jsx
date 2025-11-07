import "./WorkspacePreviewContent.css";
import WorkSpacePreviewResponse from "../WorkSpacePreviewResponse/WorkSpacePreviewResponse";
import WorkSpacePreviewTypes from "../WorkSpacePreviewTypes/WorkSpacePreviewTypes";
import MultipleContainer from "../../../../Global/MultipleContainer/MultipleContainer";
import WorkspacePreviewLoading from "../WorkspacePreviewLoading/WorkspacePreviewLoading";
import { useProjectStore } from "../../../../../stores/ProjectStore";

const multipleContainerContainers = {
  Response: {
    component: <WorkSpacePreviewResponse />,
  },
  Types: {
    component: <WorkSpacePreviewTypes />,
  },
};
const defaultContainer = "Response";

export default function WorkspacePreviewContent() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const isRuning = useProjectStore(
    (store) => store.openFiles[store.currentFileId].isRuning
  );

  return (
    <div className="workspace-preview_multiple-container">
      {isRuning ? (
        <WorkspacePreviewLoading
          url={content.url.parseUrl}
          isRuning={isRuning}
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
