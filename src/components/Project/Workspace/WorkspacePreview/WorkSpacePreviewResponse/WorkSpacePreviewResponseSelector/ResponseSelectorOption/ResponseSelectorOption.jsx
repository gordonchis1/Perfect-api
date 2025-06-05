import useWorkspacePreviewContext from "../../../../../../../Hooks/useWorkspacePreviewContext";
import { WORKSPACE_PREVIEW_ACTIONS } from "../../../../../../../providers/WorkspacePreview/WorkSpacePreviewProvider";
import { determineColor } from "../../../../../../../utils/constants/statusColor";
import "./ResponseSelectorOption.css";

export default function ResponseSelectorOption({ setIsOpen }) {
  const [workspacePreviewContext, workspacePreviewContextDispatch] =
    useWorkspacePreviewContext();

  const handleChangeResponse = (index) => {
    setIsOpen(false);
    workspacePreviewContextDispatch({
      type: WORKSPACE_PREVIEW_ACTIONS.SET_CURRENT_RESPONSE_IDX,
      payload: index,
    });
  };

  return (
    <div className="responses-selector_options-container">
      {workspacePreviewContext.responses.map((response, index) => {
        return (
          <button
            style={{
              background:
                index === workspacePreviewContext.currentResponseIdx
                  ? "var(--hover)"
                  : "",
            }}
            className="responses-selector_option"
            key={index}
            onClick={() => {
              handleChangeResponse(index);
            }}
          >
            <span
              className="selector_option-status"
              style={{ color: determineColor(response?.status) }}
            >
              {response?.status !== 0 ? response?.status : "Error"}
            </span>
            <span>{response?.url}</span>
          </button>
        );
      })}
    </div>
  );
}
