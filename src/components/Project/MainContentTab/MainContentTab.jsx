import { useEffect, useState, useRef } from "react";
import useFileManagerContext from "../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../Hooks/useFilesContext";
import "./MainContentTab.css";
import { VirtualFileSystem } from "../../../utils/ProjectFileObject";
import ResizeContainer from "../../Global/ResizeContainer/ResizeContainer";
import useWidthObserver from "../../../Hooks/useWidthObserver";

// TODO: remove content from files context use filemanger content insted
export default function MainContentTab() {
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
    <>
      {currentNode && (
        <div className="main-content-tab_container" ref={container}>
          <ResizeContainer
            resizeColor={"var(--borders)"}
            defaultWidth={60}
            containerWidth={width}
            minWidthOfLeftContainer={800}
            maxWidthOfLeftContainer={70}
          >
            <ResizeContainer.LeftContainer>
              <h1>{currentNode.name}</h1>
            </ResizeContainer.LeftContainer>
            <ResizeContainer.RightContainer>
              <h1>{currentNode.name}</h1>
            </ResizeContainer.RightContainer>
          </ResizeContainer>
        </div>
      )}
    </>
  );
}
