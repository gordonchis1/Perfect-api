import "./UrlFormerQueryParamsOption.css";

export default function UrlFormerQueryParamsOption({
  icon,
  text,
  onClick,
  ...rest
}) {
  return (
    <button onClick={onClick} className="query-params_option" {...rest}>
      {text}
      {icon}
    </button>
  );
}
