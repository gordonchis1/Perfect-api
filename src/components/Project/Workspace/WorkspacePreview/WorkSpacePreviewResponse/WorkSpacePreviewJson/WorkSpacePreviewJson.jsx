import "./WorkSpacePreviewJson.css";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../../Global/LoaderSpiner/LoaderSpiner";

export default function WorkSpacePreviewJson() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();

  return (
    <div className="workspace-preview-response_json-preview-container">
      {workspacePreviewContext.responses.length > 0 && (
        <Editor
          loading={<LoaderSpiner size={"70px"} />}
          height={"100%"}
          path="response.json"
          defaultPath="response.json"
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
