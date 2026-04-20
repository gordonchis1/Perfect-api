export default function ProjectsHeaderButton({ text, color, icon, onClick }) {
  return (
    <button
      className="projects-header-button"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
