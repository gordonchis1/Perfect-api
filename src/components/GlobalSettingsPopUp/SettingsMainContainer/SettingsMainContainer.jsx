import { useEffect, useState } from "react";
import "./SettingsMainContainer.css";
import { getConfig } from "../../../utils/userConfiguration/getConfig";
import SettingsFooter from "./SettingsFooter/SettingsFooter";

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
        {configOptions &&
          Object.keys(configOptions).map((key) => {
            return (
              <div className="settings-main_section-container" key={key}>
                <h2 className="settings-section_subtitle">{key}</h2>
                {Object.keys(configOptions[key]).map((subKey) => {
                  return <p>{subKey}</p>;
                })}
              </div>
            );
          })}
      </div>
      <SettingsFooter />
    </div>
  );
}
