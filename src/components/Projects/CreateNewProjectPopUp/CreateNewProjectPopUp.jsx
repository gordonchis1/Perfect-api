import CreateNewProjectPopUpForm from "./CreateNewProjectPopUpForm";

export default function CreateNewProjectPopUp({
  state,
  setState,
  setProjects,
}) {
  return (
    <>
      {state && (
        <>
          <div
            className="create-new-project-close-container"
            onClick={() => setState(false)}
          ></div>
          <div className="container-new-project-popup">
            <div className="popup_text-container">
              <h1 className="container-popup_h1">Crear un nuevo proyecto</h1>
              <p className="container-popup_p">
                Introduce el nombre para tu nuevo proyecto
              </p>
            </div>
            <CreateNewProjectPopUpForm
              setState={setState}
              setProjects={setProjects}
            />
          </div>
        </>
      )}
    </>
  );
}
