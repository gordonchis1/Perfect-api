export default function ProjectsFiltersButton({ text, isSelected, onClick }) {
  return (
    <button
      className="project-filters_button"
      style={{
        background: isSelected ? "var(--primary-transparent)" : "",
        color: isSelected ? "var(--primary)" : "",
        border: isSelected ? " 1px solid var(--primary)" : "",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
