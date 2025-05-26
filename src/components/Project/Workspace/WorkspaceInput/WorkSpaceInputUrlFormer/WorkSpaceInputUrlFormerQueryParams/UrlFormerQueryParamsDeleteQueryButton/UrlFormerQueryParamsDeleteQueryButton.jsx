import "./UrlFormerQueryParamsDeleteQueryButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
