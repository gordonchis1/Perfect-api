import "./WorkSpacePreviewResponseHeaders.css";
import PreviewReponseHeader from "./PreviewResponseHeader/PreviewResponseHeader";
import useCurrentEntry from "../../../../../Hooks/useCurrentEntry";

export default function WorkSpacePreviewResponseHeaders() {
  const currentEntry = useCurrentEntry();

  return (
    <div className="worksapce-preview_response-headers-container custom-scroll-bar">
      {Object.entries(currentEntry?.response?.headers || {}).map(
        ([key, value], index) => {
          return (
            <PreviewReponseHeader
              index={index}
              key={key}
              keyValue={key}
              value={value}
            />
          );
        }
      )}
    </div>
  );
}
