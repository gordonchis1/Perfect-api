import "./WorkspaceInputContainer.css";
import WorkSpaceInputUrlContainer from "./WorkSpaceInputFormContainer/WorkSpaceInputFormUrlContainer";

export default function WorkspaceInputContainer({ currentNode }) {
  const { content } = currentNode;

  return (
    <div className="workspace-input_container">
      <WorkSpaceInputUrlContainer content={content} />
    </div>
  );
}
