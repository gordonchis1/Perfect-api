import { Editor } from "@monaco-editor/react";
import { useUserConfigStore } from "../../../../../../../stores/UserConfigStore";
import "./CodeGeneratorEditor.css";

export default function CodeGeneratorEditor({ output, language }) {
  const config = useUserConfigStore((store) => store.config);

  return (
    <div className="code-generator_editor-container">
      <Editor
        width={"100%"}
        height={"100%"}
        value={output}
        language={language == "node" ? "javascript" : language}
        options={{
          fontSize: config.preferences.editor.editorFontSize,
          minimap: {
            enabled: config.preferences.editor.editorMiniMap || false,
          },
          readOnly: true,
        }}
        theme={config.preferences.editor.editorTheme || "vs-dark"}
      />
    </div>
  );
}
