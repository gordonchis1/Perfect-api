import "./WorkSpacePreviewResponse.css";
import { useEffect, useState } from "react";
import WorkSpacePreviewJson from "./WorkSpacePreviewJson/WorkSpacePreviewJson";
import useWorkspacePreviewContext from "../../../../../Hooks/useWorkspacePreviewContext";
import { detectFormat } from "../../../../../utils/detectFromatResponses";
import { WORKSPACE_PREVIEW_ACTIONS } from "../../../../../providers/WorkspacePreview/WorkSpacePreviewProvider";
import WorkSpacePreviewText from "./WorkSpacePreviewText/WorkSpacePreviewText";
import WorksSpacePreviewHtml from "./WorkSpacePreviewHtml/WorkSpacePreviewHtml";
import useCurrentEntry from "../../../../../Hooks/useCurrentEntry";

const renderPreviewType = {
  json: <WorkSpacePreviewJson />,
  html: <WorksSpacePreviewHtml />,
  text: <WorkSpacePreviewText />,
};

export default function WorkSpacePreviewContainer() {
  const [responseType, setResponseType] = useState("json");
  const [workspacePreviewContext, workspacePreviewContextDispatcher] =
    useWorkspacePreviewContext();

  useEffect(() => {
    workspacePreviewContextDispatcher({
      type: WORKSPACE_PREVIEW_ACTIONS.SET_CURRENT_RESPONSE_IDX,
      payload: 0,
    });
  }, [workspacePreviewContext.responses]);
  const currentEntry = useCurrentEntry();

  // useEffect(() => {
  // if (currentEntry?.response?.body?.raw !== undefined) {
  // setResponseType(detectFormat(currentEntry.response.body.raw));
  // }
  // }, []);

  return (
    <>
      {currentEntry && (
        <div className="workspace-preview_response-container">
          {renderPreviewType[responseType]}
        </div>
      )}
    </>
  );
}
