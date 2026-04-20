import "./SettingsMainContainer.css";
import SettingsOptionsSection from "./SettingsOptionsSection/SettingsOptionsSection";

export default function SettingsMainContainer({ currentTab }) {
  return (
    <div className="settings-main-wrapper">
      <div className="settings-main_container">
        <h1 className="settings-main_title">{currentTab}</h1>
        <SettingsOptionsSection currentTab={currentTab} />
      </div>
    </div>
  );
}
