import "./SettingsOptionsSection.css";
import SettingsOptionPathSelector from "../SettingsOption/SettingsOptionPathSelector/SettingsOptionPathSelector";
import { userSettingsOptionsMap } from "../../../../utils/userConfiguration/userSettingsConstants";
import SettingsOptionCheckbox from "../SettingsOption/SettingsOptionCheckbox/SettingsOptionCheckbox";
import { useUserConfigStore } from "../../../../stores/UserConfigStore";
import { defaultUserConfig } from "../../../../utils/userConfiguration/defaultConfig";
import SettingsOptionVersion from "../SettingsOption/SettingsOptionVersion/SettingsOptionVersion";
import SettingsOptionSelector from "../SettingsOption/SettingsOptionSelector/SettingsOptionSelector";

// ! Refactor this component to make code more reusable and clean
export default function SettingsOptionsSection({ currentTab }) {
  const config = useUserConfigStore((state) => state.config);

  return (
    <>
      {config &&
        Object.keys(defaultUserConfig[currentTab]).map((section) => {
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
                  case "version":
                    return (
                      <SettingsOptionVersion option={option} key={option} />
                    );
                  case "selector":
                    return (
                      <SettingsOptionSelector
                        option={option}
                        key={option}
                        section={section}
                        tab={currentTab}
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
