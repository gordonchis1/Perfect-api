import "./SettingsOptionsSection.css";
import SettingsOptionPathSelector from "../SettingsOption/SettingsOptionPathSelector/SettingsOptionPathSelector";
import { userSettingsOptionsMap } from "../../../../utils/userConfiguration/userSettingsConstants";
import SettingsOptionCheckbox from "../SettingsOption/SettingsOptionCheckbox/SettingsOptionCheckbox";

export default function SettingsOptionsSection({
  configOptions,
  setConfigOptions,
  currentTab,
}) {
  return (
    <>
      {configOptions &&
        Object.keys(configOptions).map((section) => {
          return (
            <div className="settings-main_section-container" key={section}>
              <h2 className="settings-section_subtitle">{section}</h2>
              {Object.keys(configOptions[section]).map((option) => {
                switch (userSettingsOptionsMap[option]?.type) {
                  case "path":
                  case "filePath":
                    return (
                      <SettingsOptionPathSelector
                        tab={currentTab}
                        configOptions={configOptions}
                        option={option}
                        section={section}
                        key={option}
                        setConfigOptions={setConfigOptions}
                        type={userSettingsOptionsMap[option]?.type}
                      />
                    );
                  case "checkbox":
                    return (
                      <SettingsOptionCheckbox
                        key={option}
                        option={option}
                        configOptions={configOptions}
                        section={section}
                      />
                    );
                  default:
                    return;
                }
              })}
            </div>
          );
        })}
    </>
  );
}
