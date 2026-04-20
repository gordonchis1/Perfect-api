import { useProjectsStore } from "../../../stores/ProjectsStore";
import ProjectsAddCard from "./ProjectAddCard/ProjectsAddCard";
import ProjectCard from "./ProjectCard/ProjectCard";

export default function ProjectsGrid() {
  const projects = useProjectsStore((state) => state.projects);
  const filters = useProjectsStore((state) => state.filters);

  const getFilteredProjects = () => {
    let filteredProjects = projects;

    if (filters.search !== "") {
      filteredProjects = projects.filter((project) => {
        return project.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());
      });
    }

    if (filters.all) return filteredProjects;

    if (filters.favorites) {
      filteredProjects = filteredProjects.filter((project) => {
        return project.isFavorite === true;
      });
    }

    if (filters.recent) {
      const now = new Date();
      filteredProjects = filteredProjects.filter((project) => {
        const lastUpdate = new Date(project.lastUpdate);
        const diffTime = Math.abs(now - lastUpdate) / 1000 / 60;
        return diffTime < 2880;
      });
    }

    return filteredProjects;
  };

  return (
    <div className="projects-grid-container">
      {projects && (
        <>
          {getFilteredProjects().map((project) => {
            return (
              <ProjectCard
                key={project.name}
                project={project}
                projects={projects}
              />
            );
          })}
          <ProjectsAddCard />
        </>
      )}
    </div>
  );
}
