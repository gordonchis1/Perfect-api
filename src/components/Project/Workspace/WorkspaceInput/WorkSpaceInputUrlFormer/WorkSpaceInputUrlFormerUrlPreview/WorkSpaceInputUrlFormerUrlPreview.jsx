import { useEffect, useState } from "react";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerUrlPreview.css";

export default function WorkSpaceInputUrlFormerUrlPreview() {
  const [isCopied, setIsCopied] = useState(false);
  const [content] = useWorkSpaceContentContext();
  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleCopyUrlPreview = async () => {
    try {
      await navigator.clipboard.writeText(content.url.url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 700);
    } catch {
      setIsCopied(false);
      throw new Error("Error on write clipboard");
    }
  };

  useEffect(() => {
    try {
      new URL(content.url.parseUrl);
      setIsValidUrl(true);
    } catch {
      setIsValidUrl(false);
    }
  }, [content.url.parseUrl]);

  return (
    <div
      className="workspace-input-url-former_preview-url-container"
      style={{ border: isValidUrl ? "" : "1px solid red" }}
    >
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
      <div className="preview-url_preview-url-container">
        {content.url.parseUrl}
      </div>
    </div>
  );
}
