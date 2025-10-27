import "./ProjectHeader.css";
import useProjectContext from "../../../Hooks/FileManager/useProjectContext";
import BackButton from "./BackButton/BackButton";
import ExportButton from "./ExportButton/ExportButton";
import SettingsButton from "./SettingsButton/SettingsButton";

export default function ProjectHeader() {
  const project = useProjectContext();

  return (
    <div className="project-header-container">
      <div className="project-header_left-container">
        <BackButton />
        <h1 className="project-header_title">Perfect API</h1>
      </div>
      <div className="project-header_right-container">
        <ExportButton id={project.id} />
        <SettingsButton />
      </div>
    </div>
  );
}
