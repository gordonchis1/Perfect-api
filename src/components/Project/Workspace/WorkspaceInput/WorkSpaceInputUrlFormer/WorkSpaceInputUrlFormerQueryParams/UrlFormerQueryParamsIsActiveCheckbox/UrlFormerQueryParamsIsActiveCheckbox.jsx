import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./UrlFormerQueryParamsIsActiveCheckbox.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function UrlFormerQueryParamsIsActiveCheckbox({
  index,
  query,
  querys,
  setQuerys,
}) {
  const handleChangeisActive = (index) => {
    const updatedQuerys = [...querys];
    updatedQuerys[index].isActive = !updatedQuerys[index].isActive;
    setQuerys(updatedQuerys);
  };

  return (
    <label className="url-former-query-params_is-active-label-checkbox">
      <input
        className="url-former-query-params_is-active-checkbox"
        type="checkbox"
        checked={query.isActive}
        onChange={() => handleChangeisActive(index)}
      />
      <div className="url-fomer-query-params_is-active-custom-checkbox">
        {query.isActive && <FontAwesomeIcon icon={faCheck} />}
      </div>
    </label>
  );
}
