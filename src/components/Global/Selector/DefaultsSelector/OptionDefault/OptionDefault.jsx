import "./OptionDefault.css";

export default function OptionDefault({ label, isSelected }) {
  return (
    <button
      className={`option-default_button-option ${isSelected ? "option-default_button-option-selected" : ""}`}
    >
      {label}
    </button>
  );
}
