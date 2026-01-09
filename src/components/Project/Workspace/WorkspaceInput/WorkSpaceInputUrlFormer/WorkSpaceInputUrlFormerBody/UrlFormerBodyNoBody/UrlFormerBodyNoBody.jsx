import { useEffect } from "react";
import "./UrlFormerBodyNoBody.css";
import { useProjectStore } from "../../../../../../../stores/ProjectStore";

export default function UrlFormerBodyNoBody() {
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile
  );

  useEffect(() => {
    updateContentOfOpenFile(currentFileId, {
      ...content,
      body: {
        ...content.body,
        raw: null,
        type: "noBody",
      },
    });
  }, []);

  return (
    <div className="url-former-body_no-body-container">
      <div className="no-body_content-container">
        <h2 className="no-body_content-title">La peticion no tiene body</h2>
        <p className="no-body_content-description">
          Elige un el formato del body arriba
        </p>
      </div>
    </div>
  );
}
