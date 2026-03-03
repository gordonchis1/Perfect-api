import { Settings } from "lucide-react";
import "./FileManagerDirSettings.css";
import useModal from "../../../../../../providers/ModalProvider/useModal";

export default function FileManagerDirSettings({ node }) {
  const { open, close } = useModal();

  return (
    <>
      <button
        onClick={(event) => {
          event.stopPropagation();
          open("dirSettings", { node });
        }}
        className="dir-element_config-btn"
      >
        <Settings size={20} />
      </button>
    </>
  );
}
