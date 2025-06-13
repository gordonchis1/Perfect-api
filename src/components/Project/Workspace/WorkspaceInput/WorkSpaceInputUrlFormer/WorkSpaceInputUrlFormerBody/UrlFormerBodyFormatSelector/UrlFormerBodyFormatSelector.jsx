import "./UrlFormerBodyFormatSelector.css";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useClickAway from "../../../../../../../Hooks/useClickAway";
import useFileManagerContext from "../../../../../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../../../../../Hooks/useFilesContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../../providers/FileManager/reducer";
import useWorkSpaceContentContext from "../../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";

export default function UrlFormerBodyFormatSelector({
  currentFormat,
  supportedBodyFormat,
  setCurrentFormat,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorContainerRef = useRef(null);
  const [, filemanagerDispatch] = useFileManagerContext();
  const [filesContext] = useFilesContext();
  const [content] = useWorkSpaceContentContext();

  useClickAway(selectorContainerRef, () => {
    setIsOpen(false);
  });

  const handleChangeFormat = (format) => {
    setCurrentFormat(format);
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

    filemanagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesContext.currentFile,
        newContent: {
          ...content,
          body: {
            ...content.body,
            bodyType: format,
          },
          headers: updatedHeaders,
        },
      },
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
        <span>{currentFormat}</span>
        <FontAwesomeIcon icon={faAngleDown} />
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
                  {format}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
