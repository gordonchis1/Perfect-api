import { useEffect } from "react";
import "./UrlFormerBodyNoBody.css";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../../providers/FileManager/reducer";
import useFilesContext from "../../../../../../../Hooks/useFilesContext";
import useFileManagerContext from "../../../../../../../Hooks/FileManager/useFileMangerContext";
import useWorkSpaceContentContext from "../../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";

export default function UrlFormerBodyNoBody() {
  const [filesContext] = useFilesContext();
  const [, filemanagerDispatch] = useFileManagerContext();
  const [content] = useWorkSpaceContentContext();

  useEffect(() => {
    filemanagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesContext.currentFile,
        newContent: {
          ...content,
          body: {
            ...content.body,
            bodyContent: null,
          },
        },
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
