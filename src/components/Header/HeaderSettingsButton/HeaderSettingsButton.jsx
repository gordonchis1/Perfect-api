import "./HeaderSettingsButton.css";
import { useState } from "react";
import GlobalSettingsPopUp from "../../GlobalSettingsPopUp/GlobalSettingsPopUp";
import { Settings } from "lucide-react";

export default function HeaderSettingsButton({ currentHeaderWidth }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <GlobalSettingsPopUp setIsOpen={setIsOpen} />}
      <button
        className="header-settings-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen ? "var(--primary-transparent)" : "",
          color: isOpen ? "var(--primary)" : "",
          border: isOpen ? "1px solid var(--primary)" : "",
        }}
      >
        <Settings size={25} />
        {currentHeaderWidth >= 200 && <span>Settings</span>}
      </button>
    </>
  );
}
