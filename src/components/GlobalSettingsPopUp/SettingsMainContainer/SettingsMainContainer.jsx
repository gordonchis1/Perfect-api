import { useEffect, useState } from "react";
import "./SettingsMainContainer.css";
import { getConfig } from "../../../utils/userConfiguration/getConfig";
import SettingsFooter from "./SettingsFooter/SettingsFooter";
import SettingsOptionsSection from "./SettingsOptionsSection/SettingsOptionsSection";

export default function SettingsMainContainer({ currentTab }) {
  const [configOptions, setConfigOptions] = useState(null);

  useEffect(() => {
    const getConfigKeysValue = async () => {
      const config = await getConfig();
      const configValue = await config.get(currentTab);
      setConfigOptions(configValue);
    };
    getConfigKeysValue();
  }, [currentTab]);

  return (
    <div className="settings-main-wrapper">
      <div className="settings-main_container">
        <h1 className="settings-main_title">{currentTab}</h1>
        <SettingsOptionsSection
          currentTab={currentTab}
          configOptions={configOptions}
          setConfigOptions={setConfigOptions}
        />
      </div>
      <SettingsFooter />
    </div>
  );
}
