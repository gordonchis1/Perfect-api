import { Trash2 } from "lucide-react";
import "./UrlFormerQueryParamsDeleteQueryButton.css";

export default function UrlFormerQueryParamsDeleteQueryButton({ onClick }) {
  return (
    <button onClick={onClick} className="query-params_delete-button">
      <Trash2 size={20} />
    </button>
  );
}
