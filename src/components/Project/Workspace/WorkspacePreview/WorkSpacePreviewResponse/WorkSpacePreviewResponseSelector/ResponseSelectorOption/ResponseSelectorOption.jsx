import { Pin } from "lucide-react";
import { useHistoryStore } from "../../../../../../../stores/historyStore";
import { determineColor } from "../../../../../../../utils/constants/statusColor";
import "./ResponseSelectorOption.css";
import { useProjectStore } from "../../../../../../../stores/ProjectStore";

// ! To improve: put the time stamp of each request and a indicator for the last request made
// ! Order by time stamp and pinned, pinned first then order by time
export default function ResponseSelectorOption({ id, isSelected }) {
  const history = useHistoryStore((store) => store.history);
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );
  const updateHistory = useHistoryStore((store) => store.update);

  const handleTogglePin = (event, id) => {
    event.stopPropagation();
    let firstNoPinnedIdx = null;

    const updateEntires = {
      ...content.history.entries,
      [id]: {
        ...content.history.entries[id],
        isPinned: !content.history.entries[id].isPinned,
      },
    };

    const newOrder = content.history.order.filter((arrId) => arrId != id);

    if (content.history.entries[id].isPinned) {
      for (const idx in newOrder) {
        if (!updateEntires[newOrder[idx]].isPinned && id !== newOrder[idx]) {
          firstNoPinnedIdx = idx;
          break;
        }
      }
      newOrder.splice(firstNoPinnedIdx, 0, id);
    } else {
      newOrder.unshift(id);
    }

    updateContentOfOpenFile(currentFileId, {
      ...content,
      history: {
        ...content.history,
        order: newOrder,
        entries: updateEntires,
      },
    });

    updateHistory(newOrder, updateEntires);
  };

  const entry = history.entries[id];

  return (
    <button
      style={{
        background: isSelected ? "var(--primary-transparent)" : "",
        color: isSelected ? "var(--primary)" : "",
        border: isSelected ? "1px solid var(--primary)" : "",
      }}
      className="responses-selector_option"
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
        onClick={(event) => handleTogglePin(event, id)}
        fill={entry?.isPinned ? "var(--primary-text-color)" : ""}
      />
    </button>
  );
}
