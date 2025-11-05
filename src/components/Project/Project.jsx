import TabsContainer from "./Tabs/TabsContainer/TabsContainer";
import "./Project.css";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import { useEffect, useRef, useState } from "react";
import FileManager from "./FileManager/FileManager";
import ResizeContainer from "../Global/ResizeContainer/ResizeContainer";
import useWidthObserver from "../../Hooks/useWidthObserver";
import ProjectProviders from "./ProjectProviders";
import WorkspaceContainer from "./Workspace/WorkspaceContainer";
import WorkSpaceContentProvider from "../../providers/WorkSpaceContent/WorkSpaceContentProvider";
import { useFilemanagerStore } from "../../stores/FileManagerStore";
import { useParams } from "react-router";

export default function Project() {
  const container = useRef(null);
  const { id } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const initFileManager = useFilemanagerStore((state) => state.init);
  const fileManagerReset = useFilemanagerStore((state) => state.reset);

  useEffect(() => {
    if (id) {
      initFileManager(id);
    }

    return () => {
      fileManagerReset();
    };
  }, [id]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const width = useWidthObserver({
    ref: isMounted ? container : { current: null },
  });

  return (
    <>
      {isMounted && (
        <ProjectProviders>
          <div className="project-wrapper">
            <ProjectHeader />
            <div className="project-container" ref={container}>
              <ResizeContainer
                resizeColor={"var(--border)"}
                defaultWidth={14}
                maxWidthOfLeftContainer={14}
                minWidthOfLeftContainer={200}
                containerWidth={width}
              >
                <ResizeContainer.LeftContainer>
                  <FileManager />
                </ResizeContainer.LeftContainer>
                <ResizeContainer.RightContainer>
                  <WorkSpaceContentProvider>
                    <div className="workspace-wrapper">
                      <div className="workspace-container">
                        <TabsContainer />
                        <WorkspaceContainer />
                      </div>
                    </div>
                  </WorkSpaceContentProvider>
                </ResizeContainer.RightContainer>
              </ResizeContainer>
            </div>
          </div>
        </ProjectProviders>
      )}
    </>
  );
}
