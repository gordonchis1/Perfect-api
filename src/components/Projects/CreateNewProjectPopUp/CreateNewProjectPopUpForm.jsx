import { createNewProject } from "../../../utils/createNewProject";
import CreateNewProjectPopUpButton from "./CreateNewProjectPopUpButton";
import { useState } from "react";

export default function CreateNewProjectPopUpForm({ setState, setProjects }) {
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const newProject = await createNewProject(e.target[0].value);
      setProjects((prev) => [...prev, newProject]);
      setState(false);
    } catch (e) {
      console.log(e);
      const errorMessage = JSON.parse(e.message);
      setError({
        error: true,
        message: errorMessage.message,
      });
      console.error(error);
    }
  };
  return (
    <form className="popup_form-container" onSubmit={handleCreateProject}>
      <label htmlFor="name">Nombre</label>
      <input
        autoFocus
        className="popup_form-input"
        type="text"
        placeholder="Nombre del proyecto"
      />
      {error.error && <div className="popup_form-error">{error.message}</div>}
      <div className="popup_form-buttons-container">
        <CreateNewProjectPopUpButton
          color={"transparent"}
          text={"Cancelar"}
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            setState(false);
          }}
        />
        <CreateNewProjectPopUpButton
          color={"var(--accent-background)"}
          text={"Crear"}
          type="submit"
        />
      </div>
    </form>
  );
}
