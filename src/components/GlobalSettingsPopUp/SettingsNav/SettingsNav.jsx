import "./SettingsNav.css";
import SettingsNavButton from "./SettingsNavButton/SettingsNavButton";
import { faGear, faPencil } from "@fortawesome/free-solid-svg-icons";
import { userSettingsTabs } from "../../../utils/constants/userSettingsConstants";

const CONFIG_KEYS_MAP = {
  general: {
    text: "General",
    icon: faGear,
  },
  preferences: {
    text: "Preferences",
    icon: faPencil,
  },
};

export default function SettingsNav({ currentTab, setCurrentTab }) {
  return (
    <nav className="settings-nav-container">
      {userSettingsTabs.map((key) => (
        <SettingsNavButton
          currentTab={currentTab}
          tab={key}
          setCurrentTab={setCurrentTab}
          key={key}
          text={CONFIG_KEYS_MAP[key]?.text || key}
          icon={CONFIG_KEYS_MAP[key].icon}
        />
      ))}
    </nav>
  );
}
