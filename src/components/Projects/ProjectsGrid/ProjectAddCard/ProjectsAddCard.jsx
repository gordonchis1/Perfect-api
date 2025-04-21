import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateNewProjectPopUp from "../../CreateNewProjectPopUp/CreateNewProjectPopUp";
import { useState } from "react";

export default function ProjectsAddCard({ setProjects }) {
  const [state, setState] = useState(false);

  return (
    <>
      <div className="add-card-container" onClick={() => setState(true)}>
        <FontAwesomeIcon icon={faAdd} className="add-card-icon" />
        Nuevo projecto
      </div>
      {state && (
        <CreateNewProjectPopUp
          state={state}
          setState={setState}
          setProjects={setProjects}
        />
      )}
    </>
  );
}
