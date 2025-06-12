import "./WorkspaceInputUrlHeadersOption.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WorkspaceInputUrlHeadersOption({
  onClick,
  icon,
  text,
  color = "var(--primary-text-color)",
}) {
  return (
    <button
      className="headers-options_option-button"
      onClick={onClick}
      style={{ color }}
    >
      <span>{text}</span>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
