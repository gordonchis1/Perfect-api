import "./ProjectCardContextMenuOption.css";

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
      {icon}
      <p>{text}</p>
    </button>
  );
}
