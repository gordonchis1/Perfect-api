import "./WorkspacePreviewContent.css";
import WorkSpacePreviewResponse from "../WorkSpacePreviewResponse/WorkSpacePreviewResponse";
import WorkSpacePreviewTypes from "../WorkSpacePreviewTypes/WorkSpacePreviewTypes";
import MultipleContainer from "../../../../Global/MultipleContainer/MultipleContainer";
import useWorkSpaceContentContext from "../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import WorkspacePreviewLoading from "../WorkspacePreviewLoading/WorkspacePreviewLoading";

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
  const [content] = useWorkSpaceContentContext();

  return (
    <div className="workspace-preview_multiple-container">
      {content.isRuning ? (
        <WorkspacePreviewLoading
          url={content.url.parseUrl}
          isRuning={content.isRuning}
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
