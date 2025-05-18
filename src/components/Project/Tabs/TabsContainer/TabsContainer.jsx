import { useEffect, useRef } from "react";
import useFilesContext from "../../../../Hooks/useFilesContext";
import OpenTab from "./OpenTab/OpenTab";
import "./TabsContainer.css";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { updateProjectContentAndState } from "../../../../utils/UpdateProject";
import useProjectContext from "../../../../Hooks/FileManager/useProjectContext";
import useFileManagerContext from "../../../../Hooks/FileManager/useFileMangerContext";

export default function TabsContainer() {
  const [files] = useFilesContext();
  const [content] = useFileManagerContext();
  const { id } = useProjectContext();

  const idRef = useRef(id);
  const filesRef = useRef(files);
  const contentRef = useRef(content);

  useEffect(() => {
    idRef.current = id;
    filesRef.current = files;
    contentRef.current = content;
  }, [id, files, content]);

  useEffect(() => {
    let unlisten;

    const setup = async () => {
      const currentWindow = getCurrentWindow();
      unlisten = await currentWindow.listen(
        "tauri://close-requested",
        async () => {
          await updateProjectContentAndState(
            filesRef.current,
            contentRef.current,
            idRef.current
          );
          currentWindow.destroy();
        }
      );
    };

    if (!unlisten) {
      setup();
    }

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  return (
    <div className="tabs-container">
      {files.openFiles.map((file) => (
        <OpenTab file={file} key={file.path} />
      ))}
    </div>
  );
}
