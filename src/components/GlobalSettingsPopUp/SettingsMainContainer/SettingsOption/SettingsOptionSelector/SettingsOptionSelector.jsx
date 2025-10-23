import { useEffect } from "react";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import "./SettingsOptionSelector.css";
import { userSettingsOptionsMap } from "../../../../../utils/userConfiguration/userSettingsConstants";
import { setTheme } from "@tauri-apps/api/app";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";

export default function SettingsOptionSelector({ option, tab, section }) {
  const updateConfig = useUserConfigStore((state) => state.updateConfig);
  const config = useUserConfigStore((state) => state.config);

  const handleChangeTheme = async (theme) => {
    const newConfig = { ...config };
    newConfig[tab][section][option] = theme;
    await updateConfig(newConfig);
    await setTheme(theme);
  };

  return (
    <SettingsOptionContainer option={option}>
      <SettingsOptionText option={option} />
      <div className="option-selector_selector-container">
        {userSettingsOptionsMap[option].options.map((opt) => (
          <button
            key={opt}
            className="option-selector_button"
            onClick={() => handleChangeTheme(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </SettingsOptionContainer>
  );
}
