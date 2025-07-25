import "./WorkspaceInputContainer.css";
import WorkSpaceInputUrlContainer from "./WorkSpaceInputFormContainer/WorkSpaceInputFormUrlContainer";
import MultipleContainer from "../../../Global/MultipleContainer/MultipleContainer";
import WorkSpaceInputUrlFormerContainer from "./WorkSpaceInputUrlFormer/WorkSpaceInputUrlFormerContainer";
import WorkspaceInputUrlHeaders from "./WorkSpaceInputUrlFormer/WorkspaceInputUrlHeaders/WorkspaceInputUrlHeaders";
import WorkSpaceInputUrlFormerBody from "./WorkSpaceInputUrlFormer/WorkSpaceInputUrlFormerBody/WorkSpaceInputUrlFormerBody";

const multipleContainerContainers = {
  URL: {
    component: <WorkSpaceInputUrlFormerContainer />,
  },
  Headers: {
    component: <WorkspaceInputUrlHeaders />,
  },
  Body: {
    component: <WorkSpaceInputUrlFormerBody />,
  },
  Docs: {
    component: <h1>Docs editor</h1>,
  },
};
const defaultContainer = "URL";

export default function WorkspaceInputContainer() {
  return (
    <div className="workspace-input_container">
      <WorkSpaceInputUrlContainer />
      <div className="workspace-input_multiple-container">
        <MultipleContainer
          defaultContainer={defaultContainer}
          objectContainers={multipleContainerContainers}
          mainContainerclassName={"workspace-input_multiple-container"}
        />
      </div>
    </div>
  );
}
