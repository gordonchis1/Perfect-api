import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProjectHeader.css";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ExportButton from "./ExportButton/ExportButton";
import useProjectContext from "../../../Hooks/FileManager/useProjectContext";

//TODO: Agregar custom right click para cambiar de nombre en el nombre del proyecto
export default function ProjectHeader() {
  const project = useProjectContext();

  return (
    <>
      <div className="project-header-container">
        {project !== undefined && (
          <>
            <ExportButton id={project.id} />
            <h1>{project.name}</h1>
            <button className="project-header_settings-button">
              <FontAwesomeIcon icon={faGear} />
            </button>
          </>
        )}
      </div>
    </>
  );
}
