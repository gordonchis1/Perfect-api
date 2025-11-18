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
          fontSize: "16px",
          minimap: { enabled: false },
          readOnly: true,
        }}
        theme={config.preferences.appearance.editorTheme || "vs-dark"}
      />
    </div>
  );
}
