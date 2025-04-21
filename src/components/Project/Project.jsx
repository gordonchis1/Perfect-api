import TabsContainer from "./Tabs/TabsContainer/TabsContainer";
import "./Project.css";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { getProjectById } from "../../utils/getProjects";
import FileManager from "./FileManager/FileManager";
import ResizeContainer from "../Global/ResizeContainer/ResizeContainer";
import useWidthObserver from "../../Hooks/useWidthObserver";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(undefined);
  const container = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      const project = await getProjectById(id);
      setProject(project);
    };

    getProject();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const width = useWidthObserver({
    ref: isMounted ? container : { current: null },
  });

  // TODO: add loading state
  // TODO: Add error state
  return (
    <div className="project-container" ref={container}>
      {project && (
        <>
          <ProjectHeader project={project} />
          <ResizeContainer
            resizeColor={"var(--borders)"}
            defaultWidth={14}
            maxWidthOfLeftContainer={14}
            minWidthOfLeftContainer={300}
            containerWidth={width}
          >
            <ResizeContainer.LeftContainer>
              <FileManager project={project} />
            </ResizeContainer.LeftContainer>
            <ResizeContainer.RightContainer>
              <TabsContainer></TabsContainer>
            </ResizeContainer.RightContainer>
          </ResizeContainer>
        </>
      )}
    </div>
  );
}
