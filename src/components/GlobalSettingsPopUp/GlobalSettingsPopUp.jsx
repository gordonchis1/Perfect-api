import { useRef } from "react";
import useClickAway from "../../Hooks/useClickAway";
import "./GlobalSettingsPopUp.css";
import SettingsNav from "./SettingsNav/SettingsNav";

export default function GlobalSettingsPopUp({ setIsOpen }) {
  const containerRef = useRef(null);
  useClickAway(containerRef, () => setIsOpen(false));

  return (
    <div className="global-settings-pop-up_wrapper">
      <div className="global-settings-pop-up_container" ref={containerRef}>
        <SettingsNav />
        <div className="settings-main-container"></div>
      </div>
    </div>
  );
}
