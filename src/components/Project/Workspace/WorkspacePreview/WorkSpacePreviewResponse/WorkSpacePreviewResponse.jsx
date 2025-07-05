import "./WorkSpacePreviewResponse.css";
import { useEffect, useState } from "react";
import WorkspacePreviewHeader from "./WorkSpacePreviewHeader/WorkspacePreviewHeader";
import WorkSpacePreviewJson from "./WorkSpacePreviewJson/WorkSpacePreviewJson";
import useWorkspacePreviewContext from "../../../../../Hooks/useWorkspacePreviewContext";
import { detectFormat } from "../../../../../utils/detectFromatResponses";
import { WORKSPACE_PREVIEW_ACTIONS } from "../../../../../providers/WorkspacePreview/WorkSpacePreviewProvider";
import WorkSpacePreviewText from "./WorkSpacePreviewText/WorkSpacePreviewText";

const renderPreviewType = {
  json: <WorkSpacePreviewJson />,
  html: <div>HTML Preview</div>,
  text: <WorkSpacePreviewText />,
};

// TODO: actuzlizar el heigth en tiempo real
// TODO: agreagr un componente cuando no hay respuesta
export default function WorkSpacePreviewContainer() {
  const [responseType, setResponseType] = useState(undefined);
  const [workspacePreviewContext, workspacePreviewContextDispatcher] =
    useWorkspacePreviewContext();
  useEffect(() => {
    workspacePreviewContextDispatcher({
      type: WORKSPACE_PREVIEW_ACTIONS.SET_CURRENT_RESPONSE_IDX,
      payload: 0,
    });
  }, [workspacePreviewContext.responses]);

  useEffect(() => {
    const response =
      workspacePreviewContext.responses[
        workspacePreviewContext.currentResponseIdx
      ]?.response;

    if (response !== undefined) {
      setResponseType(detectFormat(response));
    }
  }, [workspacePreviewContext]);

  return (
    <>
      {workspacePreviewContext.responses.length > 0 && (
        <div className="workspace-preview_response-container">
          <WorkspacePreviewHeader />
          {renderPreviewType[responseType]}
        </div>
      )}
    </>
  );
}
