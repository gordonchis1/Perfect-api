import { Settings } from "lucide-react";
import "./SettingsButton.css";
import useModal from "../../../../providers/ModalProvider/useModal";

export default function SettingsButton() {
  const { open } = useModal();

  return (
    <>
      <button
        className="project-header_settings-button"
        onClick={() => open("settings")}
      >
        <Settings size={20} />
      </button>
    </>
  );
}
