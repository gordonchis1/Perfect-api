import "./WorkSpacePreviewResponseSelector.css";
import { useRef, useState } from "react";
import useClickAway from "../../../../../../Hooks/useClickAway";
import ResponseSelectorOption from "./ResponseSelectorOption/ResponseSelectorOption";
import { ChevronDown } from "lucide-react";
import { useHistoryStore } from "../../../../../../stores/historyStore";

// TODO: cambiar el valor de el input y de todos los inputs con le del index
export default function WorkSpacePreviewResponseSelector() {
  const selectorContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useClickAway(selectorContainerRef, () => setIsOpen(false));
  const history = useHistoryStore((store) => store.history);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="workspace-preview-responses_selector-container"
      ref={selectorContainerRef}
    >
      <button className="responses-selector_open-button" onClick={toggleOpen}>
        <span>
          {history.entries[history.currentId]?.url || "no response selected"}
        </span>
        <ChevronDown size={20} />
      </button>
      {isOpen && <ResponseSelectorOption setIsOpen={setIsOpen} />}
    </div>
  );
}
