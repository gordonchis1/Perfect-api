import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import "./SettingsOptionCheckbox.css";

export default function SettingsOptionCheckbox({
  option,
  configOptions,
  section,
}) {
  return (
    <SettingsOptionContainer option={option}>
      <SettingsOptionText option={option} />
      <label htmlFor="checkbox" className="settings-option_label-checkbox">
        <input
          type="checkbox"
          id="checkbox"
          htmlFor="checkbox"
          className="settings-option_input-checkbox"
          checked={configOptions[section][option]}
        ></input>
        <div className="settings-option_custom-checkbox">
          <div className="custom-checkbox_bar"></div>
        </div>
      </label>
    </SettingsOptionContainer>
  );
}
