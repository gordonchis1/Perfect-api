import { Download } from "lucide-react";
import ChooseFolder from "../../../../utils/ChooseFolder";
import "./ExportButton.css";

export default function ExportButton({ id }) {
  const handleExportClick = async () => {
    await ChooseFolder(id);
  };

  return (
    <button
      className="project-header_export-button"
      onClick={handleExportClick}
    >
      <Download size={17} />
      Exportar
    </button>
  );
}
