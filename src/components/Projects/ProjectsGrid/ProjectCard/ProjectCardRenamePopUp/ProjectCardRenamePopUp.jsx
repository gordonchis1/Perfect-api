import "./ProjectCardRenamePopUp.css";
import PopUp from "../../../../Global/PopUp/PopUp";
import { useState } from "react";

export default function ProjectCardRenamePopUp({ handleCloseRenamePopUp }) {
  const [newName, setNewName] = useState("");
  const handleCancel = () => {
    handleCloseRenamePopUp();
  };
  const handleRename = (event) => {
    event.preventDefault();

    handleCloseRenamePopUp();
  };

  return (
    <PopUp closeFunction={handleCloseRenamePopUp}>
      <div className="rename-popup_content-container">
        <p>Cambiar nombre</p>
        <form className="rename-popup_form" onSubmit={handleRename}>
          <input
            type="text"
            placeholder="Nuevo nombre"
            className="rename-popup-form_input"
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
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
