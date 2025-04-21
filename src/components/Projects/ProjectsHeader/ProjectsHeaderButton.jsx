import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProjectsHeaderButton({ text, color, icon, onClick }) {
  return (
    <button
      className="projects-header-button"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="projects-header-button_icon" />
      {text}
    </button>
  );
}
