import "./UrlFormerQueryParamsOption.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UrlFormerQueryParamsOption({
  icon,
  text,
  onClick,
  ...rest
}) {
  return (
    <button onClick={onClick} className="query-params_option" {...rest}>
      {text}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
}
