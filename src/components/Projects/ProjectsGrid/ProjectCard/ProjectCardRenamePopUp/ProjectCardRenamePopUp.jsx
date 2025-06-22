import "./ProjectCardRenamePopUp.css";
import PopUp from "../../../../Global/PopUp/PopUp";
import { useState } from "react";
import { renameProject } from "../../../../../utils/renameProject";

export default function ProjectCardRenamePopUp({
  handleCloseRenamePopUp,
  id,
  setProjects,
  projects,
}) {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState({
    message: "",
    error: false,
  });
  const handleCancel = () => {
    handleCloseRenamePopUp();
  };
  const handleRename = async (event) => {
    event.preventDefault();

    try {
      const updatedProject = await renameProject(id, newName);
      const updatedProjects = [...projects];

      const renameIdx = updatedProjects.findIndex(
        (project) => project.id === id
      );

      updatedProjects[renameIdx] = updatedProject;
      setProjects(updatedProjects);

      handleCloseRenamePopUp();
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  return (
    <PopUp closeFunction={handleCloseRenamePopUp}>
      <div className="rename-popup_content-container">
        <p className="rename-popup_title">Cambiar nombre</p>
        <form className="rename-popup_form" onSubmit={handleRename}>
          <input
            type="text"
            placeholder="Nuevo nombre"
            className="rename-popup-form_input"
            value={newName}
            style={{ borderBottom: error.error ? "1px solid red" : "" }}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
          {error.error && (
            <p className="rename-popup_error-message">{error.message}</p>
          )}
          <div className="rename-popup-form_buttons-container">
            <button
              className="rename-popup-form_button rename-popup_cancel-btn"
              onClick={handleCancel}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="rename-popup-form_button rename-popup_confirm-btn"
              type="submit"
              disabled={newName ? false : true}
              style={{ opacity: newName ? "1" : ".6" }}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </PopUp>
  );
}
