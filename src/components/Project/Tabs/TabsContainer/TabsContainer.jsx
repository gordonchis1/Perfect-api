import useFilesContext from "../../../../Hooks/useFilesContext";
import OpenTab from "./OpenTab/OpenTab";
import "./TabsContainer.css";

export default function TabsContainer() {
  const [files] = useFilesContext();
  console.log(files);
  return (
    <div className="tabs-container">
      {files.map((file) => (
        <OpenTab file={file} key={file.path} />
      ))}
    </div>
  );
}
