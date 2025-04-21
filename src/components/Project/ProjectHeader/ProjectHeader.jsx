import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProjectHeader.css";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ExportButton from "./ExportButton/ExportButton";

//TODO: Agregar custom right click para cambiar de nombre en el nombre del proyecto
export default function ProjectHeader({ project }) {
  return (
    <div className="project-header-container">
      <ExportButton id={project.id} />
      <h1>{project.name}</h1>
      <button className="project-header_settings-button">
        <FontAwesomeIcon icon={faGear} />
      </button>
    </div>
  );
}
