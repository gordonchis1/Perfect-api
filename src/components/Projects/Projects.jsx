import "./Projects.css";
import ProjectsFilters from "./ProjectsFilters/ProjectsFilters";
import ProjectsHeader from "./ProjectsHeader/ProjectsHeader";
import ProjectsGrid from "./ProjectsGrid/ProjectsGrid";
import { useEffect, useState } from "react";
import { getProjects } from "../../utils/getProjects";
import { initDocumentDir } from "../../utils/createDocumentDir";
import useFilterProjects from "../../Hooks/useFilterProjects";

export default function Projects() {
  const [projects, setProjects] = useState(undefined);
  const [filters, setFilters] = useState({
    search: "",
    favorites: false,
    recent: false,
    all: true,
  });

  const [filteredProjects, setFilteredProjects] = useFilterProjects(
    projects,
    filters
  );

  //TODO: Add handlerError function to handle errors in the fetchProjects function
  useEffect(() => {
    async function createDir() {
      await initDocumentDir();
    }

    async function fetchProjects() {
      const projectsData = await getProjects();
      setProjects(projectsData);
      setFilteredProjects(projectsData);
    }

    async function initialize() {
      await createDir();
      await fetchProjects();
    }

    initialize();
  }, []);

  useEffect(() => {
    setFilteredProjects(projects);
    setFilters({
      search: "",
      favorites: false,
      recent: false,
      all: true,
    });
  }, [projects]);

  // TODO: Add loading state
  // TODO: Add error state
  return (
    <div className="projects-container">
      <ProjectsHeader setProjects={setProjects} />
      <ProjectsFilters setFilters={setFilters} filters={filters} />
      <ProjectsGrid projects={filteredProjects} setProjects={setProjects} />
    </div>
  );
}
