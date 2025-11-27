import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import "./SettingsOptionSelector.css";
import { userSettingsOptionsMap } from "../../../../../utils/userConfiguration/userSettingsConstants";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";
import { useRef, useState } from "react";
import useClickAway from "../../../../../Hooks/useClickAway";
import { Palette } from "lucide-react";

export default function SettingsOptionSelector({
  option,
  tab,
  section,
  onChange,
  title,
  description,
  OptionIcon,
}) {
  const optionsContainerRef = useRef(null);
  const updateConfig = useUserConfigStore((state) => state.updateConfig);
  const config = useUserConfigStore((state) => state.config);
  const [isOpen, setIsOpen] = useState(false);
  useClickAway(optionsContainerRef, () => setIsOpen(false));

  const handleSelect = async (opt) => {
    const newConfig = { ...config };
    newConfig[tab][section][option] = opt;
    if (onChange) {
      onChange(opt, newConfig, tab, section);
    }

    setIsOpen(false);
    await updateConfig(newConfig);
  };

  const handleOpenOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SettingsOptionContainer option={option}>
      <SettingsOptionText
        option={option}
        text={title}
        description={description}
      />
      <div
        className="option-selector_selector-container"
        ref={optionsContainerRef}
      >
        <button
          className="option-selector_btn-selected"
          onClick={handleOpenOptions}
        >
          <Palette size={20} />
          <span>{config[tab][section][option]}</span>
        </button>
        {isOpen && (
          <div className="option-selector_container-options">
            {userSettingsOptionsMap[option].options.map((opt) => (
              <button
                key={opt}
                className="option-selector_button-option"
                onClick={() => handleSelect(opt)}
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
                {OptionIcon && <OptionIcon opt={opt} />}
                <span>{opt}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </SettingsOptionContainer>
  );
}
