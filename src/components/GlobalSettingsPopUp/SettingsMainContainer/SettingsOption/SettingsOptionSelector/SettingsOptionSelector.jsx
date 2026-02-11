import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import "./SettingsOptionSelector.css";
import { userSettingsOptionsMap } from "../../../../../utils/userConfiguration/userSettingsConstants";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";
import { useRef } from "react";
import { Palette } from "lucide-react";
import Selector from "../../../../Global/Selector/Selector";

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

  const handleSelect = async (opt) => {
    const newConfig = { ...config };
    newConfig[tab][section][option] = opt;
    if (onChange) {
      onChange(opt, newConfig, tab, section);
    }

    await updateConfig(newConfig);
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
        <Selector value={config[tab][section][option]} onChange={handleSelect}>
          <Selector.Trigger>
            <button className="option-selector_btn-selected">
              <Palette size={20} />
              <span>{config[tab][section][option]}</span>
            </button>
          </Selector.Trigger>
          <Selector.Options>
            {userSettingsOptionsMap[option].options.map((opt) => (
              <Selector.Option key={opt} value={opt}>
                {({ isSelected }) => (
                  <div
                    className={`${isSelected ? "settings-selector_option-content-selected" : ""} settings-selector_option-content`}
                  >
                    {OptionIcon && <OptionIcon opt={opt} />}
                    <span>{opt}</span>
                  </div>
                )}
              </Selector.Option>
            ))}
          </Selector.Options>
        </Selector>
      </div>
    </SettingsOptionContainer>
  );
}
