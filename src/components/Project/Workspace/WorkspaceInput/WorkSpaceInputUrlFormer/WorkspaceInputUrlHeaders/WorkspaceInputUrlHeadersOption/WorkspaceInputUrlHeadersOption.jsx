import "./WorkspaceInputUrlHeadersOption.css";

export default function WorkspaceInputUrlHeadersOption({
  onClick,
  icon,
  text,
  color = "var(--primary-text-color)",
}) {
  return (
    <button
      className="headers-options_option-button"
      onClick={onClick}
      style={{ color }}
    >
      <span>{text}</span>
      {icon}
    </button>
  );
}
