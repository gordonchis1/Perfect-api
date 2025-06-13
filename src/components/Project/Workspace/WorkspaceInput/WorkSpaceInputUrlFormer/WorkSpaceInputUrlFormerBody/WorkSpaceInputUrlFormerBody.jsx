import { useEffect, useState } from "react";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerBody.css";
import UrlFormerBodyFormatSelector from "./UrlFormerBodyFormatSelector/UrlFormerBodyFormatSelector";
import UrlFormerBodyEditor from "./UrlFormerBodyEditor/UrlFormerBodyEditor";

const supportedBodyFormat = {
  "Plain Text": {
    contentType: "text/plain",
    component: <UrlFormerBodyEditor language={"plaintext"} />,
  },
  JSON: {
    contentType: "application/json",
    component: <h1>Hola mundo plain JSON</h1>,
  },
  XML: {
    contentType: "application/xml",
    component: <h1>Hola mundo plain XML</h1>,
  },
  "No body": {
    contentType: null,
    component: <h1>Hola mundo NO BODY</h1>,
  },
};

export default function WorkSpaceInputUrlFormerBody() {
  const [content] = useWorkSpaceContentContext();
  const [currentFormat, setCurrentFormat] = useState(
    content?.body?.bodyType || "No body"
  );

  useEffect(() => {
    if (content?.body?.bodyType) {
      setCurrentFormat(content.body.bodyType);
    } else {
      setCurrentFormat("No body");
    }
  }, [content]);

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
