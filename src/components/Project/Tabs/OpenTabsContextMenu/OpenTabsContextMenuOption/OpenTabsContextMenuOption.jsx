import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./OpenTabsContextMenuOption.css";

export default function OpenTabsContextMenuOption({
  onClick,
  text,
  icon,
  color,
}) {
  return (
    <button
      className="open-tab-contextmenu-option"
      onClick={onClick}
      style={{ color: color || "var(--primary-text-color" }}
    >
      <FontAwesomeIcon icon={icon} />
      {text}
    </button>
  );
}
