import WorkSpaceInputFormTypeSelector from "./WorkSpaceInputFormTypeSelector/WorkSpaceInputFormTypeSelector";
import "./WorkSpaceInputFormUrlContainer.css";

export default function WorkSpaceInputUrlContainer({ content }) {
  return (
    <div className="workspace-input_form-url">
      {<WorkSpaceInputFormTypeSelector content={content} />}
    </div>
  );
}
