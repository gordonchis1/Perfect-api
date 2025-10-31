import "./Projects.css";
import ProjectsFilters from "./ProjectsFilters/ProjectsFilters";
import ProjectsHeader from "./ProjectsHeader/ProjectsHeader";
import ProjectsGrid from "./ProjectsGrid/ProjectsGrid";
import { useEffect } from "react";
import { getProjects } from "../../utils/getProjects";
import { initDocumentDir } from "../../utils/createDocumentDir";
import { useProjectsStore } from "../../stores/ProjectsStore";

export default function Projects() {
  const initProjects = useProjectsStore((state) => state.initProjects);

  useEffect(() => {
    async function createDir() {
      await initDocumentDir();
    }

    async function fetchProjects() {
      const projectsData = await getProjects();
      initProjects(projectsData);
    }

    async function initialize() {
      await createDir();
      await fetchProjects();
    }

    initialize();
  }, []);

  return (
    <div className="projects-container">
      <ProjectsHeader />
      <ProjectsFilters />
      <ProjectsGrid />
    </div>
  );
}
