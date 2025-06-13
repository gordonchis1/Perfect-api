import { useRef, useState } from "react";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerBody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useClickAway from "../../../../../../Hooks/useClickAway";

const suportedBodyFormat = {
  "Plain Text": {},
  JSON: {},
  XML: {},
  "No body": {},
};

export default function WorkSpaceInputUrlFormerBody() {
  const [content] = useWorkSpaceContentContext();
  const [currentFormat, setCurrentFormat] = useState(
    content?.body?.bodyType || "No body"
  );
  const [isOpen, setIsOpen] = useState(false);
  const selectorContainerRef = useRef(null);
  useClickAway(selectorContainerRef, () => {
    setIsOpen(false);
  });

  const handleChangeFormat = (format) => {
    setCurrentFormat(format);
    setIsOpen(false);
  };

  return (
    <div className="workspace-input-url-former_body-container">
      {content?.body?.bodyContent !== undefined && (
        <div
          className="url-former-body_body-format-selector-container"
          ref={selectorContainerRef}
        >
          <button
            className="format-selector_current-format-button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span>{currentFormat}</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
          {isOpen && (
            <div className="format-selector_options-container">
              {Object.keys(suportedBodyFormat).map((format) => {
                return (
                  <>
                    {format !== currentFormat && (
                      <div
                        key={format}
                        className="format-selector_option"
                        onClick={() => {
                          handleChangeFormat(format);
                        }}
                      >
                        {format}
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
