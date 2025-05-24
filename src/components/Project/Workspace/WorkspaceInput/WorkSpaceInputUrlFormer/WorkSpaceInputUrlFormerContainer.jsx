import "./WorkSpaceInputUrlFormerContainer.css";
import WorkSpaceInputUrlFormerUrlPreview from "./WorkSpaceInputUrlFormerUrlPreview/WorkSpaceInputUrlFormerUrlPreview";

export default function WorkSpaceInputUrlFormerContainer() {
  return (
    <div className="workspace-input-url-former_container">
      <WorkSpaceInputUrlFormerUrlPreview />
      <div className="workspace-input-url-former_query-params-container">
        <span className="query-params_title">Query params</span>
      </div>
    </div>
  );
}
