import { userSettingsOptionsMap } from "../../../../../../utils/userConfiguration/userSettingsConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import "./SettingsOptionText.css";

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
          <FontAwesomeIcon icon={faWarning} className="option-alert_icon" />
          {userSettingsOptionsMap[option]?.alert}
        </p>
      )}
    </div>
  );
}
