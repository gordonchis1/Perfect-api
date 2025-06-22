import "./ProjectCardContextMenu.css";
import useClickAway from "../../../../../Hooks/useClickAway";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteProject } from "../../../../../utils/deleteProject";

export default function ProjectCardContextMenu({
  contextMenu,
  handleCloseContextMenu,
  project,
}) {
  const containerRef = useRef(null);
  useClickAway(containerRef, handleCloseContextMenu);

  const handleDeleteProject = () => {
    deleteProject(project.id);
  };

  return (
    <div
      ref={containerRef}
      className="project-card_context-menu-container"
      style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
    >
      <button
        className="project-card_context-menu-option"
        onClick={handleDeleteProject}
      >
        <FontAwesomeIcon icon={faTrash} />
        <p>Eliminar</p>
      </button>
    </div>
  );
}
