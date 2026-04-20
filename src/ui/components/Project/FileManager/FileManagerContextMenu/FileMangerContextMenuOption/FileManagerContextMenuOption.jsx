import "./FileManagerContextMenuOption.css";

export default function FileManagerContextMenuOption({
  icon,
  text,
  onClick,
  optionFor = "all",
  color,
  node,
  className = "",
}) {
  if (optionFor !== node.type && optionFor !== "all") return;

  return (
    <button
      onClick={onClick}
      className={`filemanager-contextmenu-option ${className}`}
      style={{ color: color || "var(--primary-text-color" }}
    >
      <span>{icon}</span>
      {text}
    </button>
  );
}
