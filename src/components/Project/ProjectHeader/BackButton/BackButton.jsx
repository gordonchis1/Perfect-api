import "./BackButton.css";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const save = async () => {
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
