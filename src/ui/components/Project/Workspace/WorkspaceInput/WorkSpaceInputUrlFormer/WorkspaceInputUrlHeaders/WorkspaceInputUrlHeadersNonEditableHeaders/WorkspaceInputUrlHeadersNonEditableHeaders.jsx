import "./WorkspaceInputUrlHeadersNonEditableHeaders.css";

export default function WorkspaceInputUrlHeadersNonEditableHeaders({
  keyValue,
  value,
}) {
  return (
    <div className="url-headers_header-container">
      <div className="url-headers_ineditable-value">{keyValue}</div>
      <div className="url-headers_ineditable-value">{value}</div>
    </div>
  );
}
