import "./WorkSpaceInputUrlFormerContainer.css";
import WorkSpaceInputUrlFormerQueryParams from "./WorkSpaceInputUrlFormerQueryParams/WorkSpaceInputUrlFormerQueryParams";
import WorkSpaceInputUrlFormerUrlPreview from "./WorkSpaceInputUrlFormerUrlPreview/WorkSpaceInputUrlFormerUrlPreview";

export default function WorkSpaceInputUrlFormerContainer() {
  return (
    <div className="workspace-input-url-former_container">
      <WorkSpaceInputUrlFormerUrlPreview />
      <WorkSpaceInputUrlFormerQueryParams />
    </div>
  );
}
