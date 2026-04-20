import { Editor } from "@monaco-editor/react";
import useCurrentEntry from "../../../../../../Hooks/useCurrentEntry";
import "./WorkSpacePreviewHtml.css";
import LoaderSpiner from "../../../../../Global/LoaderSpiner/LoaderSpiner";
import { useUserConfigStore } from "../../../../../../stores/UserConfigStore";

export default function WorksSpacePreviewHtml() {
  const config = useUserConfigStore((store) => store.config);
  const currentEntry = useCurrentEntry();

  return (
    <div className="workspace-preview-response_html-preview-container">
      <Editor
        value={String(
          currentEntry?.response?.body?.raw || "<h1>No response body</h1>"
        )}
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
          colorDecoratorsActivatedOn: "clickAndHover",
          colorDecorators: true,
          defaultColorDecorators: true,
        }}
        loading={<LoaderSpiner />}
        height={"100%"}
        defaultLanguage="html"
        theme={config.preferences.editor.editorTheme || "vs-dark"}
      />
    </div>
  );
}

// <iframe
//   className="workspace-preview-response_html-preview"
//   title="HTML Preview"
//   srcDoc={String(
//     currentEntry?.response?.body?.raw || "<h1>No response body</h1>"
//   )}
//   style={{ width: "100%", height: "100%", border: "none" }}
//   sandbox="allow-same-origin"
// ></iframe>
