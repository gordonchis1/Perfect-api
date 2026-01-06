import useWorkspacePreviewContext from "../../../../../../../Hooks/useWorkspacePreviewContext";
import { WORKSPACE_PREVIEW_ACTIONS } from "../../../../../../../providers/WorkspacePreview/WorkSpacePreviewProvider";
import { useHistoryStore } from "../../../../../../../stores/historyStore";
import { determineColor } from "../../../../../../../utils/constants/statusColor";
import "./ResponseSelectorOption.css";

export default function ResponseSelectorOption({ setIsOpen }) {
  const history = useHistoryStore((store) => store.history);
  const setCurrentId = useHistoryStore((store) => store.setCurrentId);

  const handleChangeResponse = (id) => {
    setCurrentId(id);
    setIsOpen(false);
  };

  return (
    <div className="responses-selector_options-container">
      {history.order.map((id, index) => {
        const entry = history.entries[id];
        return (
          <button
            style={{
              background:
                id === history.currentId ? "var(--primary-transparent)" : "",
              color: id === history.currentId ? "var(--primary)" : "",
              border:
                id === history.currentId ? "1px solid var(--primary)" : "",
            }}
            className="responses-selector_option"
            key={index}
            onClick={() => {
              handleChangeResponse(id);
            }}
          >
            <span
              className="selector_option-status"
              style={{
                color: determineColor(entry?.status).color,
                background: determineColor(entry.status).bg,
              }}
            >
              {entry?.status !== 0 ? entry?.status : "Error"}
            </span>
            <span>{entry?.url}</span>
          </button>
        );
      })}
    </div>
  );
}
