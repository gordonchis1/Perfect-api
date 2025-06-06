import WorkSpacePreviewProvider from "../../../../providers/WorkspacePreview/WorkSpacePreviewProvider";
import MultipleContainer from "../../../Global/MultipleContainer/MultipleContainer";
import "./WorkSpacePreviewContainer.css";
import WorkSpacePreviewResponse from "./WorkspacePreviewResponse/WorkSpacePreviewResponse";
import WorkSpacePreviewTypes from "./WorkSpacePreviewTypes/WorkSpacePreviewTypes";

const multipleContainerContainers = {
  Response: {
    component: <WorkSpacePreviewResponse />,
  },
  Types: {
    component: <WorkSpacePreviewTypes />,
  },
};
const defaultContainer = "Response";

export default function WorkSpacePreviewContainer() {
  return (
    <div className="workspace_preview-container">
      <WorkSpacePreviewProvider>
        <MultipleContainer
          defaultContainer={defaultContainer}
          objectContainers={multipleContainerContainers}
          mainContainerclassName="workspace_preview-multiple-container"
        />
      </WorkSpacePreviewProvider>
    </div>
  );
}
