import { Settings } from "lucide-react";
import "./SettingsButton.css";
import { useState } from "react";
import GlobalSettingsPopUp from "../../../GlobalSettingsPopUp/GlobalSettingsPopUp";

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSettings = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && <GlobalSettingsPopUp setIsOpen={setIsOpen} />}
      <button
        className="project-header_settings-button"
        onClick={handleOpenSettings}
      >
        <Settings size={20} />
      </button>
    </>
  );
}
