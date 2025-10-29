import { Import, Plus } from "lucide-react";
import CreateNewProjectPopUp from "../CreateNewProjectPopUp/CreateNewProjectPopUp";
import ProjectsHeaderButton from "./ProjectsHeaderButton";
import { useState } from "react";

export default function ProjectsHeader({ setProjects }) {
  const [showPopUp, setShowPopUp] = useState(false);

  const handlePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  return (
    <header className="projects-header">
      <h1 className="projects-title">Proyectos</h1>
      <div className="projects-header-buttons">
        <ProjectsHeaderButton
          text={"Importar"}
          icon={<Import size={20} />}
          color={"transparent"}
          onClick={() => {
            console.log("Importar");
          }}
        />
        <ProjectsHeaderButton
          text={"Nuevo Projecto"}
          icon={<Plus size={20} />}
          color={"var(--primary)"}
          onClick={() => handlePopUp()}
        />
        <CreateNewProjectPopUp
          state={showPopUp}
          setState={setShowPopUp}
          setProjects={setProjects}
        />
      </div>
    </header>
  );
}
