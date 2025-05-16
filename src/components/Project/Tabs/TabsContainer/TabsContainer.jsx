import useFilesContext from "../../../../Hooks/useFilesContext";
import "./TabsContainer.css";

export default function TabsContainer() {
  const [files] = useFilesContext();
  console.log(files);
  return (
    <div className="tabs-container">
      {files.map((file) => (
        <p key={file.path}>{file.name}</p>
      ))}
    </div>
  );
}
