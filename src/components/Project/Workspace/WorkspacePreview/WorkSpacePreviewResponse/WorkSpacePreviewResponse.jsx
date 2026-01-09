import "./WorkSpacePreviewResponse.css";
import { useEffect, useState } from "react";
import WorkSpacePreviewJson from "./WorkSpacePreviewJson/WorkSpacePreviewJson";
import WorkSpacePreviewText from "./WorkSpacePreviewText/WorkSpacePreviewText";
import WorksSpacePreviewHtml from "./WorkSpacePreviewHtml/WorkSpacePreviewHtml";
import useCurrentEntry from "../../../../../Hooks/useCurrentEntry";
import { useMonaco } from "@monaco-editor/react";
import { addMonacoThemes } from "../../../../../utils/monaco/monacoHover";
import { getBodyViewType } from "../../../../../utils/detectFromatResponses";
import WorkSpacePreviewXml from "./WorkSpacePreviewXml/WorkSpacePreviewXml";
import WorkSpacePreviewImage from "./WorkSpacePreviewImage/WorkspacePreviewImage";

function renderResponseBody(type) {
  switch (type) {
    case "json":
      return <WorkSpacePreviewJson />;
    case "html":
      return <WorksSpacePreviewHtml />;
    case "text":
      return <WorkSpacePreviewText />;
    case "xml":
      return <WorkSpacePreviewXml />;
    case "image":
      return <WorkSpacePreviewImage />;
    case "binary":
      return <h1>Binary coming soon....</h1>;
    default:
      return <WorkSpacePreviewText />;
  }
}

export default function WorkSpacePreviewContainer() {
  const [responseType, setResponseType] = useState("json");
  const monaco = useMonaco();
  const [isThemeAdded, setIsThemeAdded] = useState(false);

  useEffect(() => {
    if (monaco) {
      addMonacoThemes(monaco);
      setIsThemeAdded(true);
    }
  }, [monaco]);

  const currentEntry = useCurrentEntry();

  useEffect(() => {
    if (currentEntry?.response?.body?.raw !== undefined) {
      const responseType = getBodyViewType(
        currentEntry.response.body.contentType
      );
      setResponseType(responseType);
    }
  }, [currentEntry]);

  return (
    <>
      {currentEntry && isThemeAdded && (
        <div className="workspace-preview_response-container">
          {renderResponseBody(responseType)}
        </div>
      )}
    </>
  );
}
