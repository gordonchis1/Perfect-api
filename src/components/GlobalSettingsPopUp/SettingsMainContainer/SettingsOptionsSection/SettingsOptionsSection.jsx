import "./SettingsOptionsSection.css";
import SettingsOptionPathSelector from "../SettingsOption/SettingsOptionPathSelector/SettingsOptionPathSelector";
import { userSettingsOptionsMap } from "../../../../utils/userConfiguration/userSettingsConstants";
import SettingsOptionCheckbox from "../SettingsOption/SettingsOptionCheckbox/SettingsOptionCheckbox";
import { useUserConfigStore } from "../../../../stores/UserConfigStore";

export default function SettingsOptionsSection({ currentTab }) {
  const config = useUserConfigStore((state) => state.config);

  console.log(config[currentTab]);
  return (
    <>
      {config &&
        Object.keys(config[currentTab]).map((section) => {
          return (
            <div className="settings-main_section-container" key={section}>
              <h2 className="settings-section_subtitle">{section}</h2>
              {Object.keys(config[currentTab][section]).map((option) => {
                switch (userSettingsOptionsMap[option]?.type) {
                  case "path":
                  case "filePath":
                    return (
                      <SettingsOptionPathSelector
                        tab={currentTab}
                        option={option}
                        section={section}
                        key={option}
                        type={userSettingsOptionsMap[option]?.type}
                      />
                    );
                  case "checkbox":
                    return (
                      <SettingsOptionCheckbox
                        key={option}
                        tab={currentTab}
                        option={option}
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
