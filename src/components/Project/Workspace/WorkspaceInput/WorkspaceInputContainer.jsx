import "./WorkspaceInputContainer.css";
import WorkSpaceInputUrlContainer from "./WorkSpaceInputFormContainer/WorkSpaceInputFormUrlContainer";
import MultipleContainer from "../../../Global/MultipleContainer/MultipleContainer";

const multipleContainerContainers = {
  URL: {
    component: <h1>Hola mundo url</h1>,
  },
  body: {
    component: <h1>Hola mundo body</h1>,
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
