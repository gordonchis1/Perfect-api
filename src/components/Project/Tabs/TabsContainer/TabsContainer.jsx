import useSaveStateOnClose from "../../../../Hooks/FileManager/useSaveStateOnClose";
import useFilesContext from "../../../../Hooks/useFilesContext";
import OpenTab from "./OpenTab/OpenTab";
import "./TabsContainer.css";

export default function TabsContainer() {
  const [files] = useFilesContext();
  useSaveStateOnClose();
  return (
    <div className="tabs-container">
      {files.openFiles.map((file) => (
        <OpenTab file={file} key={file.path} />
      ))}
    </div>
  );
}
