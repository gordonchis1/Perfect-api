import "./SettingsOptionText.css";
import { TriangleAlert } from "lucide-react";

export default function SettingsOptionText({
  option,
  text,
  description,
  alert,
}) {
  return (
    <div className="settings-option_text">
      <h4 className="settings-option_title">{text || option}</h4>
      <p className="settings-option_description">{description || option}</p>
      {alert && (
        <p className="settings-option_alert">
          <TriangleAlert size={15} />
          {alert}
        </p>
      )}
    </div>
  );
}
