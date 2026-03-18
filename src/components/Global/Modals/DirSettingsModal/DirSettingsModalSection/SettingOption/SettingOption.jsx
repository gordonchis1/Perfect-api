import "./SettingsOption.css";

export default function SettingOption({
  title,
  description,
  component: Component,
}) {
  return (
    <div className="option_container">
      <div className="option_text-container">
        <span className="option_title">{title}</span>
        <span className="option_description">{description}</span>
      </div>
      {Component && <Component />}
    </div>
  );
}
