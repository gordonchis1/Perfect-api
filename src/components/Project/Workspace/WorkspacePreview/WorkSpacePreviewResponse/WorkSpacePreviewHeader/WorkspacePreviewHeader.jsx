import "./WorkspacePreviewHeader.css";
import { determineColor } from "../../../../../../utils/constants/statusColor";
import WorkSpacePreviewResponseSelector from "../WorkSpacePreviewResponseSelector/WorkSpacePreviewResponseSelector";

export default function WorkspacePreviewHeader({
  responses,
  currentResponseIdx,
  setCurrentResponseIdx,
}) {
  return (
    <div className="workspace-preview_response-header-container">
      <div className="response-header_info-container">
        <span
          className="response-header_info-status-tag"
          style={{
            background: determineColor(responses[currentResponseIdx].status),
          }}
        >
          {responses[currentResponseIdx].status !== 0
            ? responses[currentResponseIdx]?.status
            : "Error"}
        </span>
        <span className="response-header_info-time-tag">
          {Math.trunc(responses[currentResponseIdx]?.time)} ms
        </span>
      </div>
      <WorkSpacePreviewResponseSelector
        responses={responses}
        currentResponseIdx={currentResponseIdx}
        setCurrentResponseIdx={setCurrentResponseIdx}
      />
    </div>
  );
}
