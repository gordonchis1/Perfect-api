import { Pin } from "lucide-react";
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

  const handleTogglePin = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="responses-selector_options-container custom-scroll-bar">
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
              {entry?.status != undefined ? entry?.status : "Error"}
            </span>
            <span className="selector_option-url">{entry?.url}</span>
            <Pin
              size={20}
              onClick={handleTogglePin}
              fill={entry?.isPinned ? "var(--primary-text-color)" : ""}
            />
          </button>
        );
      })}
    </div>
  );
}
