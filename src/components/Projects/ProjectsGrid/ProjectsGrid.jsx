import ProjectsAddCard from "./ProjectAddCard/ProjectsAddCard";
import ProjectCard from "./ProjectCard/ProjectCard";

export default function ProjectsGrid({ projects, setProjects }) {
  return (
    <div className="projects-grid-container">
      {projects && (
        <>
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.name}
                project={project}
                setProjects={setProjects}
                projects={projects}
              />
            );
          })}
          <ProjectsAddCard setProjects={setProjects} />
        </>
      )}
    </div>
  );
}
