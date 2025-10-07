import { useRef, useState } from "react";
import useClickAway from "../../Hooks/useClickAway";
import "./GlobalSettingsPopUp.css";
import SettingsNav from "./SettingsNav/SettingsNav";
import SettingsMainContainer from "./SettingsMainContainer/SettingsMainContainer";

export default function GlobalSettingsPopUp({ setIsOpen }) {
  const containerRef = useRef(null);
  const [currentTab, setCurrnetTab] = useState("general");
  useClickAway(containerRef, () => setIsOpen(false));

  return (
    <div className="global-settings-pop-up_wrapper">
      <div className="global-settings-pop-up_container" ref={containerRef}>
        <SettingsNav currentTab={currentTab} setCurrentTab={setCurrnetTab} />
        <SettingsMainContainer currentTab={currentTab} />
      </div>
    </div>
  );
}
