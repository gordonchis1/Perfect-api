import WorkSpacePreviewProvider from "../../../../providers/WorkspacePreview/WorkSpacePreviewProvider";
import MultipleContainer from "../../../Global/MultipleContainer/MultipleContainer";
import "./WorkSpacePreviewContainer.css";
import WorkSpacePreviewResponse from "./WorkspacePreviewResponse/WorkSpacePreviewResponse";

const multipleContainerContainers = {
  Response: {
    component: <WorkSpacePreviewResponse />,
  },
  Types: {
    component: <h1>Hola mundo types</h1>,
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
