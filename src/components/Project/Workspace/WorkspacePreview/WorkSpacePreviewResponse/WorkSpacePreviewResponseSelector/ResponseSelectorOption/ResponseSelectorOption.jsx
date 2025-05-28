import { determineColor } from "../../../../../../../utils/constants/statusColor";
import "./ResponseSelectorOption.css";

export default function ResponseSelectorOption({
  responses,
  currentResponseIdx,
  setIsOpen,
  setCurrentResponseIdx,
}) {
  const handleChangeResponse = (index) => {
    setIsOpen(false);
    setCurrentResponseIdx(index);
  };

  return (
    <div className="responses-selector_options-container">
      {responses.map((response, index) => {
        return (
          <button
            style={{
              background: index === currentResponseIdx ? "var(--hover)" : "",
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
