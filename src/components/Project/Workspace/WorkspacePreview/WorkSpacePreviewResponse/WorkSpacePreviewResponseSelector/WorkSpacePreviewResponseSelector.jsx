import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WorkSpacePreviewResponseSelector.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import useClickAway from "../../../../../../Hooks/useClickAway";
import ResponseSelectorOption from "./ResponseSelectorOption/ResponseSelectorOption";

// TODO: cambiar el valor de el input y de todos los inputs con le del index
export default function WorkSpacePreviewResponseSelector({
  responses,
  currentResponseIdx,
  setCurrentResponseIdx,
}) {
  const selectorContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useClickAway(selectorContainerRef, () => setIsOpen(false));

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="workspace-preview-responses_selector-container"
      ref={selectorContainerRef}
    >
      <button className="responses-selector_open-button" onClick={toggleOpen}>
        <span>{responses[currentResponseIdx]?.url}</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      {isOpen && (
        <ResponseSelectorOption
          currentResponseIdx={currentResponseIdx}
          responses={responses}
          setCurrentResponseIdx={setCurrentResponseIdx}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
