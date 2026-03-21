import "./UrlFormerQueryParamsInput.css";

export default function UrlFormerQueryParamsInput({
  query,
  onChange,
  inputModifier,
}) {
  return (
    <input
      value={inputModifier === "key" ? query.key : query.value}
      type="text"
      onChange={(event) => onChange(event)}
      className="workspace-input-url-former_query-params-input"
      placeholder={inputModifier === "key" ? "Key" : "Value"}
      style={{ opacity: query.isActive ? "1" : "0.5" }}
      disabled={!query.isActive}
    />
  );
}
