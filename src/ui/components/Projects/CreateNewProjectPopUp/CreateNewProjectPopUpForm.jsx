import { useProjectsStore } from "../../../stores/ProjectsStore";
import CreateNewProjectPopUpButton from "./CreateNewProjectPopUpButton";
import { useState } from "react";

export default function CreateNewProjectPopUpForm({ setState }) {
  const addProject = useProjectsStore((state) => state.addProject);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await addProject(e.target[0].value);
      setState(false);
    } catch (error) {
      setError({ error: true, message: error.message });
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
          color={"var(--primary)"}
          text={"Crear"}
          type="submit"
        />
      </div>
    </form>
  );
}
