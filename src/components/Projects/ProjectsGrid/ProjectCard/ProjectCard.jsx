import { Link } from "react-router";
import AddToFavoriteButton from "./AddToFavoriteButton";
import ProjectCardContextMenu from "./ProjectCardContextMenu/ProjectCardContextMenu";
import { useState } from "react";
import ProjectCardRenamePopUp from "./ProjectCardRenamePopUp/ProjectCardRenamePopUp";

const defaultContextMenuState = {
  x: 0,
  y: 0,
  show: false,
};

const defaultRenamePopUpState = {
  show: false,
  id: "",
};

export default function ProjectCard({ project, setProjects, projects }) {
  const [contextMenu, setContextMenu] = useState(defaultContextMenuState);
  const [isRename, setIsRename] = useState(defaultRenamePopUpState);

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

  const handleContextMenu = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event;

    setContextMenu({ x: clientX, y: clientY, show: true });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(defaultContextMenuState);
  };

  const handleCloseRenamePopUp = () => {
    setIsRename(defaultRenamePopUpState);
  };
  console.log(isRename);

  return (
    <>
      {isRename.show && (
        <ProjectCardRenamePopUp
          handleCloseRenamePopUp={handleCloseRenamePopUp}
        />
      )}
      <div className="project-card" onContextMenu={handleContextMenu}>
        {contextMenu.show && (
          <ProjectCardContextMenu
            setIsRename={setIsRename}
            contextMenu={contextMenu}
            handleCloseContextMenu={handleCloseContextMenu}
            project={project}
            projects={projects}
            setProjects={setProjects}
          />
        )}
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
    </>
  );
}
