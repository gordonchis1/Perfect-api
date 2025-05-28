import "./WorkSpacePreviewResponse.css";
import useWorkSpaceContentContext from "../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { useState } from "react";
import WorkspacePreviewHeader from "./WorkSpacePreviewHeader/WorkspacePreviewHeader";

export default function WorkSpacePreviewContainer() {
  const [content] = useWorkSpaceContentContext();
  const responses = [...content.responses].reverse();
  const [currentResponseIdx, setCurrentResponseIdx] = useState(0);

  return (
    <>
      {responses.length > 0 && (
        <div className="workspace-preview_response-container">
          <WorkspacePreviewHeader
            currentResponseIdx={currentResponseIdx}
            responses={responses}
            setCurrentResponseIdx={setCurrentResponseIdx}
          />
          <div>{JSON.stringify(responses[currentResponseIdx].response)}</div>
        </div>
      )}
    </>
  );
}
