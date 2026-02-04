import { Pin } from "lucide-react";
import { useHistoryStore } from "../../../../../../../stores/historyStore";
import { determineColor } from "../../../../../../../utils/constants/statusColor";
import "./ResponseSelectorOption.css";
import { useProjectStore } from "../../../../../../../stores/ProjectStore";

// ! To improve: put the time stamp of each request and a indicator for the last request made
// ! Order by time stamp and pinned, pinned first then order by time

export default function ResponseSelectorOption({ setIsOpen }) {
  const history = useHistoryStore((store) => store.history);
  const setCurrentId = useHistoryStore((store) => store.setCurrentId);
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );
  const updateHistory = useHistoryStore((store) => store.update);

  const handleChangeResponse = (id) => {
    setCurrentId(id);
    setIsOpen(false);
  };

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
              onClick={(event) => handleTogglePin(event, id)}
              fill={entry?.isPinned ? "var(--primary-text-color)" : ""}
            />
          </button>
        );
      })}
    </div>
  );
}
