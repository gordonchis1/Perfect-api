import "./PreviewTypesCopyButton.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

export default function PreviewTypesCopyButton({ types }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(types);
      setTimeout(() => {
        setIsCopied(false);
      }, 700);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
      throw new Error("Error on write clipboard");
    }
  };

  return (
    <button className="block-code_copy-button" onClick={handleCopy}>
      {isCopied ? (
        <FontAwesomeIcon icon={faCheck} color="#22ff00" />
      ) : (
        <FontAwesomeIcon icon={faCopy} />
      )}
    </button>
  );
}
