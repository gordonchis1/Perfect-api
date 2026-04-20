import CreateNewProjectPopUp from "../../CreateNewProjectPopUp/CreateNewProjectPopUp";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function ProjectsAddCard() {
  const [state, setState] = useState(false);

  return (
    <>
      <div className="add-card-container" onClick={() => setState(true)}>
        <Plus size={20} />
        Nuevo projecto
      </div>
      {state && <CreateNewProjectPopUp state={state} setState={setState} />}
    </>
  );
}
