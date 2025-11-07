import { Download } from "lucide-react";
import ChooseFolder from "../../../../utils/ChooseFolder";
import "./ExportButton.css";
import { useProjectStore } from "../../../../stores/ProjectStore";

export default function ExportButton() {
  const id = useProjectStore((state) => state.projectId);
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
