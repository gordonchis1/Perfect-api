export default function ProjectsFiltersButton({ text, isSelected, onClick }) {
  return (
    <button
      className="project-filters_button"
      style={isSelected ? { background: "var(--primary)" } : {}}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
