import "./BackButton.css";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import useFilesContext from "../../../../Hooks/useFilesContext";
import useFileManagerContext from "../../../../Hooks/FileManager/useFileMangerContext";
import useProjectContext from "../../../../Hooks/FileManager/useProjectContext";
import { updateProjectContentAndState } from "../../../../utils/UpdateProject";

export default function BackButton() {
  const [files] = useFilesContext();
  const [content] = useFileManagerContext();
  const { id } = useProjectContext();

  const navigate = useNavigate();

  const handleGoBack = () => {
    const save = async () => {
      await updateProjectContentAndState(files, content, id);
      navigate(-1);
    };
    save();
  };
  return (
    <button className="project-header_back-btn" onClick={handleGoBack}>
      <ArrowLeft size={25} />
    </button>
  );
}
