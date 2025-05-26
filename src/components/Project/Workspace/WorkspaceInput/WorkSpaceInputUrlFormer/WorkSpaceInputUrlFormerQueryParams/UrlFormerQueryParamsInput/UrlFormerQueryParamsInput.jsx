import "./UrlFormerQueryParamsInput.css";

export default function UrlFormerQueryParamsInput({
  query,
  index,
  querys,
  setQuerys,
  inputModifier,
}) {
  const handleChangeQuery = (type, newValue, index) => {
    const updatedQuerys = [...querys];
    updatedQuerys[index][type] = newValue;
    setQuerys(updatedQuerys);
  };

  return (
    <input
      value={inputModifier === "key" ? query.key : query.value}
      type="text"
      onChange={(event) =>
        handleChangeQuery(inputModifier, event.target.value, index)
      }
      className="workspace-input-url-former_query-params-input"
      placeholder={inputModifier === "key" ? "Key" : "Value"}
      style={{ opacity: query.isActive ? "1" : "0.5" }}
      disabled={!query.isActive}
    />
  );
}
