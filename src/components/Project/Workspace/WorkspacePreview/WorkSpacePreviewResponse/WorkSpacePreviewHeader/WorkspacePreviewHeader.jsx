import "./WorkspacePreviewHeader.css";
import { determineColor } from "../../../../../../utils/constants/statusColor";
import WorkSpacePreviewResponseSelector from "../WorkSpacePreviewResponseSelector/WorkSpacePreviewResponseSelector";
import useCurrentEntry from "../../../../../../Hooks/useCurrentEntry";

export default function WorkspacePreviewHeader() {
  const currentEntry = useCurrentEntry();

  return (
    <div className="workspace-preview_response-header-container">
      <div className="response-header_info-container">
        <span
          className="response-header_info-status-tag"
          style={{
            background: determineColor(currentEntry?.response?.status).bg,
            color: determineColor(currentEntry?.response?.status).color,
          }}
        >
          <span>
            {currentEntry?.response?.status !== 0
              ? currentEntry?.response?.status
              : "Error"}
          </span>
          <span>{currentEntry?.response?.statusText}</span>
        </span>
        <span className="response-header_info-time-tag">
          <span className="response-header-info-time_time">Time: </span>
          <span>{Math.trunc(currentEntry?.response?.time)} ms</span>
        </span>
      </div>
      <WorkSpacePreviewResponseSelector />
    </div>
  );
}
