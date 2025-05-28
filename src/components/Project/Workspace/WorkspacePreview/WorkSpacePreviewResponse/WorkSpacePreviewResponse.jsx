import "./WorkSpacePreviewResponse.css";
import useWorkSpaceContentContext from "../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { useEffect, useState } from "react";
import WorkSpacePreviewResponseSelector from "./WorkSpacePreviewResponseSelector/WorkSpacePreviewResponseSelector";

export default function WorkSpacePreviewContainer() {
  const [content] = useWorkSpaceContentContext();
  const responses = [...content.responses].reverse();
  const [currentResponseIdx, setCurrentResponseIdx] = useState(0);
  console.log(content);

  return (
    <>
      {responses.length > 0 && (
        <div className="workspace-preview_response-container">
          <div className="workspace-preview_response-header-container">
            <div>
              <div>{responses[currentResponseIdx]?.status}</div>
              <div>{Math.trunc(responses[currentResponseIdx]?.time)}ms</div>
            </div>
            <WorkSpacePreviewResponseSelector
              responses={responses}
              currentResponseIdx={currentResponseIdx}
              setCurrentResponseIdx={setCurrentResponseIdx}
            />
          </div>
        </div>
      )}
    </>
  );
}
