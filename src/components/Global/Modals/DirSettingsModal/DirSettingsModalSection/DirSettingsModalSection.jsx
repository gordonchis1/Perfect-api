import "./DirSettingsModalSection.css";
import SettingOption from "./SettingOption/SettingOption";

export default function DirSettingsModalSection({
  title,
  icon: Icon,
  options,
}) {
  return (
    <div className="dir-settings-modal_section-container">
      <span className="section_title">
        <h3>{title}</h3>
        {Icon && <Icon size={20} />}
      </span>
      <div className="options_container">
        {options.map((option) => {
          return (
            <SettingOption
              key={option.title}
              title={option.title}
              description={option.description}
              component={option.component}
            />
          );
        })}
      </div>
    </div>
  );
}
