import "./WorkspacePreviewHeader.css";
import {
  determineColor,
  statusColors,
} from "../../../../../../utils/constants/statusColor";
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
            background: currentEntry?.error
              ? statusColors.error.bg
              : determineColor(currentEntry?.response?.status).bg,
            color: currentEntry?.error
              ? statusColors.error.color
              : determineColor(currentEntry?.response?.status).color,
          }}
        >
          <span>
            {currentEntry?.error && currentEntry?.error?.status
              ? currentEntry?.error?.status
              : currentEntry?.response?.status}
          </span>
          <span>
            {currentEntry?.error &&
            currentEntry?.error?.type &&
            !currentEntry?.response?.statusText
              ? currentEntry?.error?.type
              : currentEntry?.response?.statusText}
          </span>
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
