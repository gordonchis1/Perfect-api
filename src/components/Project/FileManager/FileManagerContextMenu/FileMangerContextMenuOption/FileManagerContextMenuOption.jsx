import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FileManagerContextMenuOption.css";

export default function FileManagerContextMenuOption({
  icon,
  text,
  onClick,
  optionFor = "all",
  color,
  node,
}) {
  if (optionFor !== node.type && optionFor !== "all") return;

  return (
    <button
      onClick={onClick}
      className="filemanager-contextmenu-option"
      style={{ color: color || "var(--primary-text-color" }}
    >
      <FontAwesomeIcon icon={icon} />
      {text}
    </button>
  );
}
