import "./PreviewTypesCopyButton.css";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

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
        <Check size={20} color="var(--success)" />
      ) : (
        <Copy size={20} />
      )}
    </button>
  );
}
