import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import "./SettingsOptionCheckbox.css";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";

export default function SettingsOptionCheckbox({ option, section, tab }) {
  const config = useUserConfigStore((state) => state.config);
  const updateConfig = useUserConfigStore((state) => state.updateConfig);

  const handleChangeCheckBox = async (event) => {
    const updatedConfigOptions = { ...config };
    updatedConfigOptions[tab][section][option] = event.target.checked;
    await updateConfig(updatedConfigOptions);
  };

  return (
    <SettingsOptionContainer option={option}>
      <SettingsOptionText option={option} />
      <label htmlFor="checkbox" className="settings-option_label-checkbox">
        <input
          type="checkbox"
          id="checkbox"
          htmlFor="checkbox"
          className="settings-option_input-checkbox"
          onChange={handleChangeCheckBox}
          checked={config[tab][section][option]}
        ></input>
        <div className="settings-option_custom-checkbox">
          <div className="custom-checkbox_bar"></div>
        </div>
      </label>
    </SettingsOptionContainer>
  );
}
