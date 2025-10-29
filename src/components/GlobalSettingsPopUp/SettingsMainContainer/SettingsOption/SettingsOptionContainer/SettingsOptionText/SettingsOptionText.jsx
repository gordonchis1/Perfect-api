import { userSettingsOptionsMap } from "../../../../../../utils/userConfiguration/userSettingsConstants";
import "./SettingsOptionText.css";
import { TriangleAlert } from "lucide-react";

export default function SettingsOptionText({
  option,
  text = userSettingsOptionsMap[option]?.title,
  description = userSettingsOptionsMap[option]?.description,
}) {
  return (
    <div className="settings-option_text">
      <h4 className="settings-option_title">{text || option}</h4>
      <p className="settings-option_description">{description || option}</p>
      {userSettingsOptionsMap[option]?.alert && (
        <p className="settings-option_alert">
          <TriangleAlert size={15} />
          {userSettingsOptionsMap[option]?.alert}
        </p>
      )}
    </div>
  );
}
