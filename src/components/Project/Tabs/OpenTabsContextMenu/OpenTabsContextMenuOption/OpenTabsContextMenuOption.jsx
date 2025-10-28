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
      {icon}
      {text}
    </button>
  );
}
