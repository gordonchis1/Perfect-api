import TabsContainer from "./Tabs/TabsContainer/TabsContainer";
import "./Project.css";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import { useEffect, useRef, useState } from "react";
import FileManager from "./FileManager/FileManager";
import ResizeContainer from "../Global/ResizeContainer/ResizeContainer";
import useWidthObserver from "../../Hooks/useWidthObserver";
import FileManagerProvider from "../../providers/FileManager/FileManagerProvider";
import ProjectProvider from "../../providers/Project/ProjectProvider";
import FilesProvider from "../../providers/FilesProvider/FilesProvider";
import MainContentTab from "./MainContentTab/MainContentTab";

export default function Project() {
  const container = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const width = useWidthObserver({
    ref: isMounted ? container : { current: null },
  });

  return (
    <>
      {isMounted && (
        <ProjectProvider>
          <FileManagerProvider>
            <FilesProvider>
              <div className="project-wrapper">
                <ProjectHeader />
                <div className="project-container" ref={container}>
                  <ResizeContainer
                    resizeColor={"var(--borders)"}
                    defaultWidth={14}
                    maxWidthOfLeftContainer={14}
                    minWidthOfLeftContainer={200}
                    containerWidth={width}
                  >
                    <ResizeContainer.LeftContainer>
                      <FileManager />
                    </ResizeContainer.LeftContainer>
                    <ResizeContainer.RightContainer>
                      <div className="workspace-container">
                        <TabsContainer />
                        <MainContentTab />
                      </div>
                    </ResizeContainer.RightContainer>
                  </ResizeContainer>
                </div>
              </div>
            </FilesProvider>
          </FileManagerProvider>
        </ProjectProvider>
      )}
    </>
  );
}
