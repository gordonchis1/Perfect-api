import { useEffect, useState, useRef } from "react";
import "./WorkspaceContainer.css";
import ResizeContainer from "../../Global/ResizeContainer/ResizeContainer";
import useWidthObserver from "../../../Hooks/useWidthObserver";
import WorkspaceInputContainer from "./WorkspaceInput/WorkspaceInputContainer";
import WorkSpacePreviewContainer from "./WorkspacePreview/WorkSpacePreviewContainer";
import WorkSpacePreviewProvider from "../../../providers/WorkspacePreview/WorkSpacePreviewProvider";
import { useProjectStore } from "../../../stores/ProjectStore";
import { useHistoryStore } from "../../../stores/historyStore";

// TODO: remove content from files context use filemanger content insted
export default function WorkspaceContainer() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );

  const container = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const initHistoryStore = useHistoryStore((state) => state.init);

  useEffect(() => {
    if (content && content.history) {
      initHistoryStore(content.history.order, content.history.entries);
    }
  }, []);

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
          resizeColor={"var(--border)"}
          defaultWidth={60}
          containerWidth={width}
          minWidthOfLeftContainer={750}
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
