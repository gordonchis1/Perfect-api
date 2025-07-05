import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../../Global/LoaderSpiner/LoaderSpiner";
import "./WorkSpacePreviewText.css";

export default function WorkSpacePreviewText() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();

  return (
    <div className="workspace-preview-response_text-preview-container">
      {workspacePreviewContext.responses.length > 0 && (
        <Editor
          loading={<LoaderSpiner size={"70px"} />}
          height={"100%"}
          defaultLanguage="text"
          value={
            workspacePreviewContext.responses[
              workspacePreviewContext.currentResponseIdx
            ].response
          }
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
