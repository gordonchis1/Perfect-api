import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../../Global/LoaderSpiner/LoaderSpiner";
import "./WorkSpacePreviewText.css";
import { useUserConfigStore } from "../../../../../../stores/UserConfigStore";

export default function WorkSpacePreviewText() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const config = useUserConfigStore((state) => state.config);

  return (
    <div className="workspace-preview-response_text-preview-container">
      {workspacePreviewContext.responses.length > 0 && (
        <Editor
          loading={<LoaderSpiner size={"70px"} />}
          height={"100%"}
          defaultLanguage="text"
          value={String(
            workspacePreviewContext.responses[
              workspacePreviewContext.currentResponseIdx
            ].response
          )}
          theme={config.preferences.editor.editorTheme || "vs-dark"}
          width={"100%"}
          options={{
            definitionLinkOpensInPeek: true,
            links: true,
            automaticLayout: true,
            hover: true,
            wordWrap: "on",
            wordWrapColumn: 60,
            readOnly: true,
            fontSize: config.preferences.editor.editorFontSize,
            minimap: {
              enabled: config.preferences.editor.editorMiniMap || false,
            },
          }}
        ></Editor>
      )}
    </div>
  );
}
