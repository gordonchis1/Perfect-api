import ActiveCheckbox from "../../../../../../../Global/ActiveCheckbox/ActiveCheckbox";
import "./AuthFormCheckbox.css";

export default function AuthFormCheckbox({ field, onChange, value }) {
  return (
    <div className="auth_form-checkbox-container ">
      <span>{field.label}</span>
      <ActiveCheckbox
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
    </div>
  );
}
