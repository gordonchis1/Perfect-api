import { useEffect, useState, useRef } from "react";
import useFileManagerContext from "../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../Hooks/useFilesContext";
import "./WorkspaceContainer.css";
import { VirtualFileSystem } from "../../../utils/ProjectFileObject";
import ResizeContainer from "../../Global/ResizeContainer/ResizeContainer";
import useWidthObserver from "../../../Hooks/useWidthObserver";
import WorkspaceInputContainer from "./WorkspaceInput/WorkspaceInputContainer";

// TODO: remove content from files context use filemanger content insted
// Todo: cambiar el estado de current node para un estado global solo para workspace
export default function WorkspaceContainer() {
  const [filesContext] = useFilesContext();
  const [fileManagerContext] = useFileManagerContext();
  const [currentNode, setCurrentNode] = useState(undefined);

  const container = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const width = useWidthObserver({
    ref: isMounted ? container : { current: null },
  });

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
    <div className="workspace_container" ref={container}>
      {currentNode && (
        <ResizeContainer
          resizeColor={"var(--borders)"}
          defaultWidth={60}
          containerWidth={width}
          minWidthOfLeftContainer={800}
          maxWidthOfLeftContainer={80}
        >
          <ResizeContainer.LeftContainer>
            <WorkspaceInputContainer currentNode={currentNode} />
          </ResizeContainer.LeftContainer>
          <ResizeContainer.RightContainer>
            <h1>{currentNode.name}</h1>
          </ResizeContainer.RightContainer>
        </ResizeContainer>
      )}
    </div>
  );
}
