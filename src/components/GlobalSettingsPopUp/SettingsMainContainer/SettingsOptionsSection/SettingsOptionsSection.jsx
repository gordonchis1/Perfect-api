import "./SettingsOptionsSection.css";
import { useUserConfigStore } from "../../../../stores/UserConfigStore";
import { defaultUserConfig } from "../../../../utils/userConfiguration/defaultConfig";
import SettingsOption from "../SettingsOption/SettingsOption";

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
                return (
                  <SettingsOption
                    key={option}
                    option={option}
                    section={section}
                    tab={currentTab}
                  />
                );
              })}
            </div>
          );
        })}
    </>
  );
}
