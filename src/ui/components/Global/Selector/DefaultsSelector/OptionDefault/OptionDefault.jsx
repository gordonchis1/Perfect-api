import "./OptionDefault.css";

export default function OptionDefault({ label, isSelected, ...props }) {
  return (
    <button
      className={`option-default_button-option ${isSelected ? "option-default_button-option-selected" : ""}`}
      {...props}
    >
      {label}
    </button>
  );
}
