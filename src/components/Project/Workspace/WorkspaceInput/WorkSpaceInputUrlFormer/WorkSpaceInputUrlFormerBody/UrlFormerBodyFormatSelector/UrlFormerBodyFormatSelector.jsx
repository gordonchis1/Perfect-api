import "./UrlFormerBodyFormatSelector.css";
import { useState, useRef } from "react";
import useClickAway from "../../../../../../../Hooks/useClickAway";
import { ChevronDown } from "lucide-react";
import { useProjectStore } from "../../../../../../../stores/ProjectStore";

export default function UrlFormerBodyFormatSelector({
  currentFormat,
  supportedBodyFormat,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorContainerRef = useRef(null);

  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile
  );
  const currentFileId = useProjectStore((store) => store.currentFileId);

  useClickAway(selectorContainerRef, () => {
    setIsOpen(false);
  });

  const handleChangeFormat = (format) => {
    const updatedHeaders = [...content.headers];
    const contentType = supportedBodyFormat[format].contentType;

    const indexOfContentType = updatedHeaders.findIndex(
      (header) => header.key === "Content-Type"
    );
    if (indexOfContentType > 0) {
      if (contentType !== null) {
        updatedHeaders[indexOfContentType].value = contentType;
      } else {
        updatedHeaders.splice(indexOfContentType, 1);
      }
    } else {
      if (contentType !== null) {
        updatedHeaders.push({
          key: "Content-Type",
          value: contentType,
          isActive: true,
        });
      }
    }

    updateContentOfOpenFile(currentFileId, {
      ...content,
      body: {
        ...content.body,
        type: supportedBodyFormat[format].type,
      },
      headers: updatedHeaders,
    });

    setIsOpen(false);
  };

  return (
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
        <span>{supportedBodyFormat[currentFormat].text}</span>
        <ChevronDown size={20} />
      </button>
      {isOpen && (
        <div className="format-selector_options-container">
          {Object.keys(supportedBodyFormat).map((format) => {
            if (format !== currentFormat) {
              return (
                <div
                  key={format}
                  className="format-selector_option"
                  onClick={() => {
                    handleChangeFormat(format);
                  }}
                >
                  {supportedBodyFormat[format].text}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
