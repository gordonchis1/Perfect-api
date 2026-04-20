import { themeConstants } from "../../../../../utils/userConfiguration/themeConstants";
import SettingsOptionSelector from "../SettingsOptionSelector/SettingsOptionSelector";

function OptionIcon({ opt }) {
  return (
    <div
      className="selector-theme_color-preview"
      style={{
        background: themeConstants[opt].themePreview,
      }}
    />
  );
}

export default function SettingsOptionThemeSelector({
  description,
  title,
  onChange,
  tab,
  section,
  option,
}) {
  return (
    <SettingsOptionSelector
      description={description}
      title={title}
      tab={tab}
      section={section}
      option={option}
      onChange={onChange}
      OptionIcon={OptionIcon}
    />
  );
}
