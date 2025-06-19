import { useEffect, useState } from "react";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerBody.css";
import UrlFormerBodyFormatSelector from "./UrlFormerBodyFormatSelector/UrlFormerBodyFormatSelector";
import UrlFormerBodyEditor from "./UrlFormerBodyEditor/UrlFormerBodyEditor";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import UrlFormerBodyNoBody from "./UrlFormerBodyNoBody/UrlFormerBodyNoBody";

const supportedBodyFormat = {
  "Plain Text": {
    contentType: "text/plain",
    component: <UrlFormerBodyEditor language={"plaintext"} />,
    defaultValue: "",
  },
  JSON: {
    contentType: "application/json",
    component: <UrlFormerBodyEditor language={"json"} />,
    defaultValue: "{\n}",
  },
  XML: {
    contentType: "application/xml",
    component: <UrlFormerBodyEditor language={"xml"} />,
    defaultValue: "<>",
  },
  "No body": {
    contentType: null,
    component: <UrlFormerBodyNoBody />,
    defaultValue: "",
  },
};

export default function WorkSpaceInputUrlFormerBody() {
  const [content] = useWorkSpaceContentContext();
  const [currentFormat, setCurrentFormat] = useState(
    content?.body?.bodyType || "No body"
  );
  const [filesContext] = useFilesContext();

  useEffect(() => {
    setCurrentFormat(content?.body?.bodyType || "No body");
  }, [filesContext.currentFile, content.body.bodyType]);

  return (
    <div className="workspace-input-url-former_body-container">
      {content?.body?.bodyContent !== undefined && (
        <UrlFormerBodyFormatSelector
          currentFormat={currentFormat}
          setCurrentFormat={setCurrentFormat}
          supportedBodyFormat={supportedBodyFormat}
        />
      )}
      <div className="former-body_body-content-container">
        {supportedBodyFormat[currentFormat].component}
      </div>
    </div>
  );
}
