import "./ProjectCardContextMenu.css";
import useClickAway from "../../../../../Hooks/useClickAway";
import { useRef } from "react";
import ProjectCardContextMenuOption from "./ProjectCardContextMenuOption/ProjectCardContextMenuOption";
import { Pen, Trash2 } from "lucide-react";
import { useProjectsStore } from "../../../../../stores/ProjectsStore";

// TODO: Agreagr un pop up para confimar la elminiacion de un project
export default function ProjectCardContextMenu({
  contextMenu,
  handleCloseContextMenu,
  project,
  setIsRename,
}) {
  const containerRef = useRef(null);
  const deleteProjectZ = useProjectsStore((state) => state.deleteProject);
  useClickAway(containerRef, handleCloseContextMenu);

  const handleDeleteProject = () => {
    deleteProjectZ(project.id);
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
          icon={<Pen size={16} />}
          onClick={handleRename}
        />
        <ProjectCardContextMenuOption
          text={"Eliminar"}
          icon={<Trash2 size={16} />}
          color="red"
          onClick={handleDeleteProject}
        />
      </div>
    </>
  );
}
