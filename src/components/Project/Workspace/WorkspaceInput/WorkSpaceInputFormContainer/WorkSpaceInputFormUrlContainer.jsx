import WorkSpaceInputFormInputUrl from "./WorkSpaceInputFormInputUrl/WorkSpaceInputFormInputUrl";
import WorkSpaceInputFormTypeSelector from "./WorkSpaceInputFormTypeSelector/WorkSpaceInputFormTypeSelector";
import WorkSpaceInputFormUrlButtonRun from "./WorkSpaceInputFormUrlButtonRun/WorkSpaceInputFormUrlButtonRun";
import "./WorkSpaceInputFormUrlContainer.css";

// TODO: change handle run to update function or hook
export default function WorkSpaceInputUrlContainer() {
  return (
    <div className="workspace-input_form-url">
      <WorkSpaceInputFormTypeSelector />
      <WorkSpaceInputFormInputUrl />
      <WorkSpaceInputFormUrlButtonRun />
    </div>
  );
}
