import useSaveStateOnClose from "../../../../Hooks/FileManager/useSaveStateOnClose";
import { useProjectStore } from "../../../../stores/ProjectStore";
import OpenTab from "./OpenTab/OpenTab";
import "./TabsContainer.css";

export default function TabsContainer() {
  // const [files] = useFilesContext();
  const openFiles = useProjectStore((state) => state.openFiles);
  useSaveStateOnClose();

  return (
    <div className="tabs-container">
      {Object.keys(openFiles).map((id) => (
        <OpenTab file={openFiles[id]} key={id} />
      ))}
    </div>
  );
}
