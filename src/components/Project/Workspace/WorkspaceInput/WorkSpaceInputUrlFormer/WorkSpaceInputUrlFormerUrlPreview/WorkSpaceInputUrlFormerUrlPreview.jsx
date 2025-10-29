import { useEffect, useState } from "react";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerUrlPreview.css";
import { Check, Copy } from "lucide-react";

export default function WorkSpaceInputUrlFormerUrlPreview() {
  const [isCopied, setIsCopied] = useState(false);
  const [content] = useWorkSpaceContentContext();
  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleCopyUrlPreview = async () => {
    try {
      await navigator.clipboard.writeText(content.url.parseUrl);
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
            <Check size={20} color="var(--success)" />
          ) : (
            <Copy size={20} />
          )}
        </button>
      </div>
      <div className="preview-url_preview-url-container">
        {content.url.parseUrl}
      </div>
    </div>
  );
}
