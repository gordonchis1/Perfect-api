import { Trash2 } from "lucide-react";
import "./UrlFormerQueryParamsDeleteQueryButton.css";

export default function UrlFormerQueryParamsDeleteQueryButton({
  index,
  querys,
  setQuerys,
}) {
  const handleDeleteQuery = (index) => {
    const updatedQuerys = [...querys];
    updatedQuerys.splice(index, 1);
    setQuerys(updatedQuerys);
  };

  return (
    <button
      onClick={() => handleDeleteQuery(index)}
      className="query-params_delete-button"
    >
      <Trash2 size={20} />
    </button>
  );
}
