import "./SettingsNavButton.css";

export default function SettingsNavButton({
  text,
  icon,
  setCurrentTab,
  tab,
  currentTab,
}) {
  return (
    <button
      className={`settings-nav_button ${
        currentTab === tab ? "settings-nav_button-active" : ""
      }`}
      onClick={() => setCurrentTab(tab)}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
