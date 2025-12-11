import { useEffect, useState } from "react";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";

export default function SettingsOptionNumber({
  description,
  title,
  tab,
  section,
  option,
}) {
  const [value, setValue] = useState(null);
  const config = useUserConfigStore((store) => store.config);
  const updateConfig = useUserConfigStore((store) => store.updateConfig);

  useEffect(() => {
    setValue(Number(config[tab][section][option]));
  }, []);

  const handleChangeValue = async (sum) => {
    if (value <= 0 && sum == -1) return;
    const newConfig = { ...config };

    newConfig[tab][section][option] = value + sum;

    setValue(value + sum);
    await updateConfig(newConfig);
  };

  return (
    <SettingsOptionContainer>
      <SettingsOptionText description={description} text={title} />
      <div className="settings-option-number_container">
        <button onClick={() => handleChangeValue(-1)}>menos</button>
        <span>{value}</span>
        <button onClick={() => handleChangeValue(1)}>mas</button>
      </div>
    </SettingsOptionContainer>
  );
}
