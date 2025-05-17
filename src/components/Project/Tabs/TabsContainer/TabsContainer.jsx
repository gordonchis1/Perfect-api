import { useEffect } from "react";
import useFilesContext from "../../../../Hooks/useFilesContext";
import OpenTab from "./OpenTab/OpenTab";
import "./TabsContainer.css";
import { UpdateProjectState } from "../../../../utils/UpdateProject";
import useProjectContext from "../../../../Hooks/FileManager/useProjectContext";

export default function TabsContainer() {
  const [files] = useFilesContext();
  const { id } = useProjectContext();

  useEffect(() => {
    const updateProjectState = async () => {
      await UpdateProjectState(files, id);
    };

    if (id) {
      updateProjectState();
    }
  }, [files, id]);

  return (
    <div className="tabs-container">
      {files.openFiles.map((file) => (
        <OpenTab file={file} key={file.path} />
      ))}
    </div>
  );
}
