import "./WorkSpacePreviewResponseHeaders.css";
import useWorkspacePreviewContext from "../../../../../Hooks/useWorkspacePreviewContext";
import PreviewReponseHeader from "./PreviewResponseHeader/PreviewResponseHeader";

export default function WorkSpacePreviewResponseHeaders() {
  const [content] = useWorkspacePreviewContext();

  return (
    <div className="worksapce-preview_response-headers-container custom-scroll-bar">
      {Object.entries(
        content.responses[content.currentResponseIdx].headers
      ).map(([key, value], index) => {
        return (
          <PreviewReponseHeader
            index={index}
            key={key}
            keyValue={key}
            value={value}
          />
        );
      })}
    </div>
  );
}
