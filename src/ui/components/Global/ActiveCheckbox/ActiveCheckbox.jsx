import "./ActiveCheckbox.css";
import { Check } from "lucide-react";

export default function ActiveCheckbox({ checked, onChange }) {
  return (
    <label className="active-checkbox_label">
      <input
        className="active-checkbox_input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="active-checkbox_custom-checkbox">
        {checked && <Check size={16} />}
      </div>
    </label>
  );
}
