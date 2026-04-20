export default function CreateNewProjectPopUpButton({
  text,
  color,
  onClick,
  type = "button",
}) {
  return (
    <button
      className="popup_form-button"
      style={{ backgroundColor: color }}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
