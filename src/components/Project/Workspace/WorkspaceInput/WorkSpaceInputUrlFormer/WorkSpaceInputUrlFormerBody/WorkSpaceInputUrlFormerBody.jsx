import { useEffect, useState } from "react";
import "./WorkSpaceInputUrlFormerBody.css";
import UrlFormerBodyFormatSelector from "./UrlFormerBodyFormatSelector/UrlFormerBodyFormatSelector";
import UrlFormerBodyEditor from "./UrlFormerBodyEditor/UrlFormerBodyEditor";
import UrlFormerBodyNoBody from "./UrlFormerBodyNoBody/UrlFormerBodyNoBody";
import { useProjectStore } from "../../../../../../stores/ProjectStore";

const supportedBodyFormat = {
  text: {
    contentType: "text/plain",
    component: <UrlFormerBodyEditor language={"plaintext"} />,
    defaultValue: "",
    type: "text",
    text: "Plain Text",
  },
  json: {
    type: "json",
    text: "JSON",
    contentType: "application/json",
    component: <UrlFormerBodyEditor language={"json"} />,
    defaultValue: "{\n}",
  },
  xml: {
    type: "xml",
    text: "XML",
    contentType: "application/xml",
    component: <UrlFormerBodyEditor language={"xml"} />,
    defaultValue: "<>",
  },
  noBody: {
    text: "No body",
    type: "noBody",
    contentType: null,
    component: <UrlFormerBodyNoBody />,
    defaultValue: "",
  },
};

export default function WorkSpaceInputUrlFormerBody() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const [currentFormat, setCurrentFormat] = useState(
    content?.body?.type || "noBody"
  );

  const currentFileId = useProjectStore((store) => store.currentFileId);

  useEffect(() => {
    setCurrentFormat(content?.body?.type || "noBody");
  }, [currentFileId, content.body.type]);

  return (
    <div className="workspace-input-url-former_body-container">
      {content?.body?.type !== undefined && (
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
