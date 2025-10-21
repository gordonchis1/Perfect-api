import "./SettingsOptionContainer.css";

export default function SettingsOptionContainer({ children, option }) {
  return (
    <div key={option} className="settings-main_option-container">
      {children}
    </div>
  );
}
