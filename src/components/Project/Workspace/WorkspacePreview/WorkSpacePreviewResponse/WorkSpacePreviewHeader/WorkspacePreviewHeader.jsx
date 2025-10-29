import "./WorkspacePreviewHeader.css";
import { determineColor } from "../../../../../../utils/constants/statusColor";
import WorkSpacePreviewResponseSelector from "../WorkSpacePreviewResponseSelector/WorkSpacePreviewResponseSelector";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";

export default function WorkspacePreviewHeader() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();

  return (
    <div className="workspace-preview_response-header-container">
      <div className="response-header_info-container">
        <span
          className="response-header_info-status-tag"
          style={{
            background: determineColor(
              workspacePreviewContext.responses[
                workspacePreviewContext.currentResponseIdx
              ]?.status
            ).bg,
            color: determineColor(
              workspacePreviewContext.responses[
                workspacePreviewContext.currentResponseIdx
              ]?.status
            ).color,
          }}
        >
          <span>
            {workspacePreviewContext.responses[
              workspacePreviewContext.currentResponseIdx
            ]?.status !== 0
              ? workspacePreviewContext.responses[
                  workspacePreviewContext.currentResponseIdx
                ]?.status
              : "Error"}
          </span>
          <span>
            {
              workspacePreviewContext.responses[
                workspacePreviewContext.currentResponseIdx
              ]?.response?.status
            }
          </span>
        </span>
        <span className="response-header_info-time-tag">
          <span className="response-header-info-time_time">Time: </span>
          <span>
            {Math.trunc(
              workspacePreviewContext.responses[
                workspacePreviewContext.currentResponseIdx
              ]?.time
            )}{" "}
            ms
          </span>
        </span>
      </div>
      <WorkSpacePreviewResponseSelector />
    </div>
  );
}
