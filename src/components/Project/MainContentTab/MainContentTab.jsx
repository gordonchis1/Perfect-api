import { useEffect, useState } from "react";
import useFileManagerContext from "../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../Hooks/useFilesContext";
import "./MainContentTab.css";
import { VirtualFileSystem } from "../../../utils/ProjectFileObject";

// TODO: remove content from files context use filemanger content insted
export default function MainContentTab() {
  const [filesContext] = useFilesContext();
  const [fileManagerContext] = useFileManagerContext();
  const [currentNode, setCurrentNode] = useState(undefined);

  useEffect(() => {
    if (
      fileManagerContext &&
      fileManagerContext instanceof VirtualFileSystem &&
      filesContext.currentFile
    ) {
      const node = fileManagerContext.getNodeById(filesContext.currentFile);
      setCurrentNode(node);
    }
  }, [fileManagerContext, filesContext]);

  return (
    <>
      {currentNode && (
        <div className="main-content-tab_container">{currentNode.name}</div>
      )}
    </>
  );
}
