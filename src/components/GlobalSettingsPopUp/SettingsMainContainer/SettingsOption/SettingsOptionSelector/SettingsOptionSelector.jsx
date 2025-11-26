import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import "./SettingsOptionSelector.css";
import { userSettingsOptionsMap } from "../../../../../utils/userConfiguration/userSettingsConstants";
import { setTheme } from "@tauri-apps/api/app";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";
import { useRef, useState } from "react";
import { themeConstants } from "../../../../../utils/userConfiguration/themeConstants";
import useClickAway from "../../../../../Hooks/useClickAway";
import { Palette } from "lucide-react";

export default function SettingsOptionSelector({ option, tab, section }) {
  const optionsContainerRef = useRef(null);
  const updateConfig = useUserConfigStore((state) => state.updateConfig);
  const config = useUserConfigStore((state) => state.config);
  const [isOpen, setIsOpen] = useState(false);
  useClickAway(optionsContainerRef, () => setIsOpen(false));

  const handleChangeTheme = async (theme) => {
    const newConfig = { ...config };
    newConfig[tab][section][option] = theme;
    newConfig[tab][section]["editorTheme"] = themeConstants[theme].monacoTheme;
    await updateConfig(newConfig);
    await setTheme(themeConstants[theme].theme);
  };

  const handleOpenOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SettingsOptionContainer option={option}>
      <SettingsOptionText option={option} />
      <div
        className="option-selector_selector-container"
        ref={optionsContainerRef}
      >
        <button
          className="option-selector_btn-selected"
          onClick={handleOpenOptions}
        >
          <Palette size={20} />
          <span>tema</span>
        </button>
        {isOpen && (
          <div className="option-selector_container-options">
            {userSettingsOptionsMap[option].options.map((opt) => (
              <button
                key={opt}
                className="option-selector_button-option"
                onClick={() => handleChangeTheme(opt)}
                style={
                  opt === config[tab][section][option]
                    ? {
                        background: "var(--primary-transparent)",
                        border: "1px solid var(--primary)",
                        color: "var(--primary)",
                      }
                    : {}
                }
              >
                <div
                  className="selector-theme_color-preview"
                  style={{
                    background: themeConstants[opt].themePreview,
                  }}
                ></div>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </SettingsOptionContainer>
  );
}
