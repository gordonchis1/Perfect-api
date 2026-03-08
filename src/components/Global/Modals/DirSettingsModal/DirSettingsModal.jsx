import { createContext } from "react";
import "./DirSettingsModal.css";
import DirSettingsModalHeader from "./DirSettingsModalHeader/DirSettingsModalHeader";
import DirSettingsModalSection from "./DirSettingsModalSection/DirSettingsModalSection";

export const DirSettingsContext = createContext();

export default function DirSettingsModal({ node }) {
  return (
    <DirSettingsContext.Provider value={node}>
      <div className="dir-settings-modal_container">
        <DirSettingsModalHeader />
        <DirSettingsModalSection />
      </div>
    </DirSettingsContext.Provider>
  );
}
