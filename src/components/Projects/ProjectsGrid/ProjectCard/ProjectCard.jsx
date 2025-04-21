import { Link } from "react-router";
import AddToFavoriteButton from "./AddToFavoriteButton";

export default function ProjectCard({ project, setProjects }) {
  function getTimeSinceLastUpdate(item) {
    const now = new Date();
    const lastUpdate = new Date(item.lastUpdate);
    const diffMs = now - lastUpdate;
    const diffHours = diffMs / 1000 / 60 / 60;

    if (diffHours < 1) {
      const minutes = Math.floor(diffHours * 60);
      return `Hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    } else if (diffHours < 24) {
      const hours = Math.floor(diffHours);
      return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`;
    } else {
      const days = Math.floor(diffHours / 24);
      return `Hace ${days} dia${days !== 1 ? "s" : ""}`;
    }
  }

  return (
    <div className="project-card">
      <Link to={`/project/${project.id}`} className="project-card-link">
        <span className="project-card-name">{project.name}</span>
        <span className="project-card-lastupdate">
          {getTimeSinceLastUpdate(project)}
        </span>
      </Link>
      <div className="project-card-container-options">
        <AddToFavoriteButton project={project} setProjects={setProjects} />
        <div className="project-card-options-section">
          <button className="project-card-option-button">Editar</button>
          <button className="project-card-option-button">Ejecutar</button>
        </div>
      </div>
    </div>
  );
}
