import "./WorkSpacePreviewResponse.css";
import { useEffect, useState } from "react";
import WorkspacePreviewHeader from "./WorkSpacePreviewHeader/WorkspacePreviewHeader";
import WorkSpacePreviewJson from "./WorkSpacePreviewJson/WorkSpacePreviewJson";
import useWorkspacePreviewContext from "../../../../../Hooks/useWorkspacePreviewContext";

// TODO: actuzlizar el heigth en tiempo real
export default function WorkSpacePreviewContainer() {
  const [isJson, setIsJson] = useState(false);
  const [workspacePreviewContext] = useWorkspacePreviewContext();

  useEffect(() => {
    const response =
      workspacePreviewContext.responses[
        workspacePreviewContext.currentResponseIdx
      ]?.response;
    const validJson = typeof response === "object" && response !== null;
    setIsJson(validJson);
  }, [workspacePreviewContext]);

  return (
    <>
      {workspacePreviewContext.responses.length > 0 && (
        <div className="workspace-preview_response-container">
          <WorkspacePreviewHeader />
          {isJson ? (
            <WorkSpacePreviewJson />
          ) : (
            <div>
              {JSON.stringify(
                workspacePreviewContext.responses[
                  workspacePreviewContext.currentResponseIdx
                ].response
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
