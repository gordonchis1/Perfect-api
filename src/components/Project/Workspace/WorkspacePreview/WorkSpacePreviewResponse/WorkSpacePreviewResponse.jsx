import "./WorkSpacePreviewResponse.css";
import useWorkSpaceContentContext from "../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { useEffect, useState } from "react";
import WorkspacePreviewHeader from "./WorkSpacePreviewHeader/WorkspacePreviewHeader";
import WorkSpacePreviewJson from "./WorkSpacePreviewJson/WorkSpacePreviewJson";

// TODO: actuzlizar el heigth en tiempo real
export default function WorkSpacePreviewContainer() {
  const [content] = useWorkSpaceContentContext();
  const responses = [...content.responses].reverse();
  const [currentResponseIdx, setCurrentResponseIdx] = useState(0);
  const [isJson, setIsJson] = useState(false);

  useEffect(() => {
    const response = responses[currentResponseIdx]?.response;
    const validJson = typeof response === "object" && response !== null;
    console.log(validJson);
    setIsJson(validJson);
  }, [responses, currentResponseIdx]);

  return (
    <>
      {responses.length > 0 && (
        <div className="workspace-preview_response-container">
          <WorkspacePreviewHeader
            currentResponseIdx={currentResponseIdx}
            responses={responses}
            setCurrentResponseIdx={setCurrentResponseIdx}
          />
          {isJson ? (
            <WorkSpacePreviewJson
              currentResponseIdx={currentResponseIdx}
              responses={responses}
            />
          ) : (
            <div>{JSON.stringify(responses[currentResponseIdx].response)}</div>
          )}
        </div>
      )}
    </>
  );
}
