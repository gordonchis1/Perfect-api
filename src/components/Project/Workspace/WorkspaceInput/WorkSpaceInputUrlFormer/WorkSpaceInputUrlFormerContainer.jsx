import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWorkSpaceContentContext from "../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerContainer.css";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function WorkSpaceInputUrlFormerContainer() {
  const [content] = useWorkSpaceContentContext();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyUrlPreview = async () => {
    try {
      await navigator.clipboard.writeText(content.url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 700);
    } catch {
      setIsCopied(false);
      throw new Error("Error on write clipboard");
    }
  };

  return (
    <div className="workspace-input-url-former_container">
      <div className="workspace-input-url-former_preview-url-container">
        <div className="preview-url-title-container">
          URL vista previa
          <button
            className="preview-url_copy-button"
            onClick={handleCopyUrlPreview}
          >
            {isCopied ? (
              <FontAwesomeIcon
                icon={faCheck}
                style={{ opacity: isCopied ? "1" : "0" }}
                className="preview-url_copy-button-icon"
                color="#22ff00"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCopy}
                style={{ opacity: isCopied ? "0" : "1" }}
                className="preview-url_copy-button-icon"
              />
            )}
          </button>
        </div>
        <div className="preview-url_preview-url-container">{content.url}</div>
      </div>
    </div>
  );
}
