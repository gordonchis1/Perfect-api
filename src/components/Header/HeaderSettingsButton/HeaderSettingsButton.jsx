import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HeaderSettingsButton.css";
import { useState } from "react";
import GlobalSettingsPopUp from "../../GlobalSettingsPopUp/GlobalSettingsPopUp";

export default function HeaderSettingsButton({ currentHeaderWidth }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <GlobalSettingsPopUp setIsOpen={setIsOpen} />}
      <button
        className="header-settings-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faGear} />
        {currentHeaderWidth >= 200 && <span>Settings</span>}
      </button>
    </>
  );
}
