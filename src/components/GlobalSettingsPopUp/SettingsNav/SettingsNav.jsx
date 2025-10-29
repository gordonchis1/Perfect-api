import "./SettingsNav.css";
import SettingsNavButton from "./SettingsNavButton/SettingsNavButton";
import { userSettingsTabs } from "../../../utils/userConfiguration/userSettingsConstants";
import { Pencil, Settings } from "lucide-react";

const CONFIG_KEYS_MAP = {
  general: {
    text: "General",
    icon: <Settings size={20} />,
  },
  preferences: {
    text: "Preferences",
    icon: <Pencil size={20} />,
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
