import { useEffect, useState, useRef } from "react";
import "./WorkspaceContainer.css";
import ResizeContainer from "../../Global/ResizeContainer/ResizeContainer";
import useWidthObserver from "../../../Hooks/useWidthObserver";
import WorkspaceInputContainer from "./WorkspaceInput/WorkspaceInputContainer";
import useWorkSpaceContentContext from "../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import WorkSpacePreviewContainer from "./WorkspacePreview/WorkSpacePreviewContainer";
import WorkSpacePreviewProvider from "../../../providers/WorkspacePreview/WorkSpacePreviewProvider";

// TODO: remove content from files context use filemanger content insted
export default function WorkspaceContainer() {
  const [content] = useWorkSpaceContentContext();

  const container = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const width = useWidthObserver({
    ref: isMounted ? container : { current: null },
  });

  return (
    <div className="workspace_container" ref={container}>
      {content && (
        <ResizeContainer
          resizeColor={"var(--borders)"}
          defaultWidth={60}
          containerWidth={width}
          minWidthOfLeftContainer={800}
          maxWidthOfLeftContainer={80}
        >
          <ResizeContainer.LeftContainer>
            <WorkspaceInputContainer />
          </ResizeContainer.LeftContainer>
          <ResizeContainer.RightContainer>
            <WorkSpacePreviewProvider>
              <WorkSpacePreviewContainer />
            </WorkSpacePreviewProvider>
          </ResizeContainer.RightContainer>
        </ResizeContainer>
      )}
    </div>
  );
}
