import "./WorkspaceInputContainer.css";
import WorkSpaceInputUrlContainer from "./WorkSpaceInputFormContainer/WorkSpaceInputFormUrlContainer";
import MultipleContainer from "../../../Global/MultipleContainer/MultipleContainer";
import WorkSpaceInputUrlFormerContainer from "./WorkSpaceInputUrlFormer/WorkSpaceInputUrlFormerContainer";
import WorkspaceInputUrlHeaders from "./WorkSpaceInputUrlFormer/WorkspaceInputUrlHeaders/WorkspaceInputUrlHeaders";
import WorkSpaceInputUrlFormerBody from "./WorkSpaceInputUrlFormer/WorkSpaceInputUrlFormerBody/WorkSpaceInputUrlFormerBody";
import WorkSpaceInputUrlFormerCode from "./WorkSpaceInputUrlFormer/WorkSpaceInputUrlFormerCode/WorkSpaceInputUrlFormerCode";

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
  Code: {
    component: <WorkSpaceInputUrlFormerCode />,
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
