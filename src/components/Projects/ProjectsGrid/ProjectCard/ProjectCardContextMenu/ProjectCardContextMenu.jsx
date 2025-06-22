import "./ProjectCardContextMenu.css";
import useClickAway from "../../../../../Hooks/useClickAway";
import { useRef, useState } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteProject } from "../../../../../utils/deleteProject";
import ProjectCardContextMenuOption from "./ProjectCardContextMenuOption/ProjectCardContextMenuOption";
import PopUp from "../../../../Global/PopUp/PopUp";

// TODO: Agreagr un pop up para confimar la elminiacion de un project
export default function ProjectCardContextMenu({
  contextMenu,
  handleCloseContextMenu,
  setProjects,
  projects,
  project,
  setIsRename,
}) {
  const containerRef = useRef(null);
  useClickAway(containerRef, handleCloseContextMenu);

  const handleDeleteProject = () => {
    const updatedProjects = [...projects];

    const deltedIndex = updatedProjects.findIndex(
      (pro) => pro.id === project.id
    );

    updatedProjects.splice(deltedIndex, 1);
    setProjects(updatedProjects);

    deleteProject(project.id);
  };

  const handleRename = () => {
    setIsRename({ show: true, id: project.id });
    handleCloseContextMenu();
  };

  return (
    <>
      <div
        ref={containerRef}
        className="project-card_context-menu-container"
        style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
      >
        <ProjectCardContextMenuOption
          text={"Renombrar"}
          icon={faPenToSquare}
          onClick={handleRename}
        />
        <ProjectCardContextMenuOption
          text={"Eliminar"}
          icon={faTrash}
          color="red"
          onClick={handleDeleteProject}
        />
      </div>
    </>
  );
}
