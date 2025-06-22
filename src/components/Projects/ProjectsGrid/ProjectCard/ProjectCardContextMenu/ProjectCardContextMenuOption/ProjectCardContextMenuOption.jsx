import "./ProjectCardContextMenuOption.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProjectCardContextMenuOption({
  color = "var(--primary-text-color)",
  text,
  icon,
  onClick,
}) {
  return (
    <button
      className="project-card_context-menu-option"
      onClick={onClick}
      style={{ color }}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </button>
  );
}
