import WorkSpacePreviewResponse from "../WorkSpacePreviewResponse/WorkSpacePreviewResponse";
import WorkSpacePreviewTypes from "../WorkSpacePreviewTypes/WorkSpacePreviewTypes";
import MultipleContainer from "../../../../Global/MultipleContainer/MultipleContainer";
import useWorkSpaceContentContext from "../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import WorkspacePreviewLoading from "../WorkspacePreviewLoading/WorkspacePreviewLoading";
import WorkspacePreviewDocs from "../WorkspacePreviewDocs/WorkspacePreviewDocs";

const multipleContainerContainers = {
  Response: {
    component: <WorkSpacePreviewResponse />,
  },
  Types: {
    component: <WorkSpacePreviewTypes />,
  },
  Docs: {
    component: <WorkspacePreviewDocs />,
  },
};
const defaultContainer = "Response";

export default function WorkspacePreviewContent() {
  const [content] = useWorkSpaceContentContext();

  return (
    <>
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
    </>
  );
}
