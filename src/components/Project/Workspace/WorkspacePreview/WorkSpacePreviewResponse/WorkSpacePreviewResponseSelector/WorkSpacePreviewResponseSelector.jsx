import "./WorkSpacePreviewResponseSelector.css";
import ResponseSelectorOption from "./ResponseSelectorOption/ResponseSelectorOption";
import { ChevronDown } from "lucide-react";
import { useHistoryStore } from "../../../../../../stores/historyStore";
import Selector from "../../../../../Global/Selector/Selector";

export default function WorkSpacePreviewResponseSelector() {
  const history = useHistoryStore((store) => store.history);
  const currentId = useHistoryStore((store) => store.history.currentId);
  const setCurrentId = useHistoryStore((store) => store.setCurrentId);
  const handleChangeResponse = (id) => {
    setCurrentId(id);
  };

  return (
    <Selector
      onChange={handleChangeResponse}
      value={currentId}
      className="workspace-preview-response_selector-container"
    >
      <Selector.Trigger>
        <button className="responses-selector_open-button">
          <span>
            {history.entries[history.currentId]?.url || "no response selected"}
          </span>
          <ChevronDown size={20} />
        </button>
      </Selector.Trigger>

      <Selector.Options className="responses-selector_options-container custom-scroll-bar">
        {history.order.map((id) => {
          return (
            <Selector.Option value={id} key={id}>
              {({ isSelected }) => {
                return (
                  <ResponseSelectorOption id={id} isSelected={isSelected} />
                );
              }}
            </Selector.Option>
          );
        })}
      </Selector.Options>
    </Selector>
  );
}
