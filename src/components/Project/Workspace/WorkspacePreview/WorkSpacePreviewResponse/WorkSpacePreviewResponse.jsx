import "./WorkSpacePreviewResponse.css";
import useWorkSpaceContentContext from "../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { useEffect, useState } from "react";
import WorkSpacePreviewResponseSelector from "./WorkSpacePreviewResponseSelector/WorkSpacePreviewResponseSelector";

export default function WorkSpacePreviewContainer() {
  const [content] = useWorkSpaceContentContext();
  const { responses } = content;
  const [currentResponseIdx, setCurrentResponse] = useState(
    responses.length - 1 || 0
  );

  useEffect(() => {
    if (responses.length - 1 > 0) {
      setCurrentResponse(responses.length - 1);
    } else {
      setCurrentResponse(0);
    }
  }, [responses]);

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
            />
          </div>
        </div>
      )}
    </>
  );
}
