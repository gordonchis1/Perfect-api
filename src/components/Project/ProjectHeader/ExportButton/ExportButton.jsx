import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import ChooseFolder from "../../../../utils/ChooseFolder";

export default function ExportButton({ id }) {
  const handleExportClick = async () => {
    await ChooseFolder(id);
  };

  return (
    <button
      className="project-header_export-button"
      onClick={handleExportClick}
    >
      <FontAwesomeIcon icon={faFileExport} />
      Exportar
    </button>
  );
}
