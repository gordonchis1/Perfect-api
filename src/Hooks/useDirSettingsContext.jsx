import { useContext } from "react";
import { DirSettingsContext } from "../components/Global/Modals/DirSettingsModal/DirSettingsModal";

export default function useDirSettingsContext() {
  const context = useContext(DirSettingsContext);

  if (!context) {
    throw new Error(
      "useDirSettingsContext must be used within a <DirSettingsContext>",
    );
  }
  return context;
}
