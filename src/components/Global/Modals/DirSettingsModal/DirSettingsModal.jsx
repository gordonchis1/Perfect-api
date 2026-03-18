import { createContext } from "react";
import "./DirSettingsModal.css";
import DirSettingsModalHeader from "./DirSettingsModalHeader/DirSettingsModalHeader";
import DirSettingsModalSection from "./DirSettingsModalSection/DirSettingsModalSection";
import { DirSettings } from "../../../../utils/constants/dirSettings";

export const DirSettingsContext = createContext();

export default function DirSettingsModal({ node }) {
  return (
    <DirSettingsContext.Provider value={node}>
      <div className="dir-settings-modal_container">
        <DirSettingsModalHeader />
        {Object.keys(DirSettings).map((section) => {
          return (
            <DirSettingsModalSection
              key={DirSettings[section].title}
              title={DirSettings[section].title}
              icon={DirSettings[section].icon}
              options={DirSettings[section].options}
            />
          );
        })}
      </div>
    </DirSettingsContext.Provider>
  );
}
