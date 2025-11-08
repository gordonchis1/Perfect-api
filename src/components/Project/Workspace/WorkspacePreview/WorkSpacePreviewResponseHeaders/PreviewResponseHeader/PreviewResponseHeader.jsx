import "./PreviewResponseHeader.css";

export default function PreviewReponseHeader({ value, keyValue, index }) {
  return (
    <div
      className="preview-response_header-container"
      style={
        index % 2 == 0
          ? {
              background: "var(--primary-transparent)",
            }
          : {}
      }
    >
      <p className="preview-response_header-key">{keyValue}:</p>
      <p className="preview-response_header-value">{value}</p>
    </div>
  );
}
