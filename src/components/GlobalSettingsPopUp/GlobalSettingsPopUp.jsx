import { useRef } from "react";
import useClickAway from "../../Hooks/useClickAway";
import "./GlobalSettingsPopUp.css";

export default function GlobalSettingsPopUp({ setIsOpen }) {
  const containerRef = useRef(null);
  useClickAway(containerRef, () => setIsOpen(false));

  return (
    <div className="global-settings-pop-up_wrapper">
      <div className="global-settings-pop-up_container" ref={containerRef}>
        GlobalSettingsPopUp
      </div>
    </div>
  );
}
