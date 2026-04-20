import { useState } from "react";
import SettingsNav from "../../../GlobalSettingsPopUp/SettingsNav/SettingsNav";
import SettingsMainContainer from "../../../GlobalSettingsPopUp/SettingsMainContainer/SettingsMainContainer";
import "./GlobalSettingsModal.css";

export default function GlobalSettingsModal({ tab = "general" }) {
  const [currentTab, setCurrnetTab] = useState(tab);

  return (
    <div className="global-settings-modal_container">
      <SettingsNav currentTab={currentTab} setCurrentTab={setCurrnetTab} />
      <SettingsMainContainer currentTab={currentTab} />
    </div>
  );
}
