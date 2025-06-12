import "./WorkSpacePreviewJson.css";
import { useRef } from "react";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import { Editor } from "@monaco-editor/react";

export default function WorkSpacePreviewJson() {
  const jsonPreviewContainerRef = useRef(null);
  const [workspacePreviewContext] = useWorkspacePreviewContext();

  return (
    <div
      className="workspace-preview-response_json-preview-container"
      ref={jsonPreviewContainerRef}
    >
      {workspacePreviewContext.responses.length > 0 && (
        <Editor
          height={"100%"}
          defaultLanguage="json"
          value={JSON.stringify(
            workspacePreviewContext.responses[
              workspacePreviewContext.currentResponseIdx
            ].response,
            null,
            2
          )}
          theme="vs-dark"
          width={"100%"}
          options={{
            definitionLinkOpensInPeek: true,
            links: true,
            automaticLayout: true,
            hover: true,
            wordWrap: "on",
            wordWrapColumn: 60,
            readOnly: true,
            fontSize: 20,
            minimap: { enabled: false },
          }}
        ></Editor>
      )}
    </div>
  );
}
