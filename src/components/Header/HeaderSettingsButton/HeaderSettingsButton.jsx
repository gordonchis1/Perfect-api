import "./HeaderSettingsButton.css";
import { useState } from "react";
import { Settings } from "lucide-react";
import useModal from "../../../providers/ModalProvider/useModal";

export default function HeaderSettingsButton({ currentHeaderWidth }) {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useModal();

  return (
    <>
      <button
        className="header-settings-button"
        onClick={() => {
          setIsOpen(!isOpen);
          open("settings");
        }}
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
