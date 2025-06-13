import { useEffect, useState } from "react";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerBody.css";
import UrlFormerBodyFormatSelector from "./UrlFormerBodyFormatSelector/UrlFormerBodyFormatSelector";

const supportedBodyFormat = {
  "Plain Text": {
    contentType: "text/plain",
  },
  JSON: {
    contentType: "application/json",
  },
  XML: {
    contentType: "application/xml",
  },
  "No body": {
    contentType: null,
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
    </div>
  );
}
