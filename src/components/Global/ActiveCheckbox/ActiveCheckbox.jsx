import "./ActiveCheckbox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
        {checked && <FontAwesomeIcon icon={faCheck} />}
      </div>
    </label>
  );
}
