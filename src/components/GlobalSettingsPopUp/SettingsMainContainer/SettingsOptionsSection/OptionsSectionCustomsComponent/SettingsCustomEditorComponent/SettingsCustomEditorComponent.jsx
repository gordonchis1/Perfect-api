import { Editor } from "@monaco-editor/react";
import { useUserConfigStore } from "../../../../../../stores/UserConfigStore";
import { addMonacoThemes } from "../../../../../../utils/monaco/monacoHover";

const jsonExample = {
  name: "Perfect API",
  description:
    "Cliente ligero para probar, guardar y gestionar peticiones HTTP.",
  version: "1.0.0",
  developer: "gordonchis",
  repository: "https://github.com/gordonchis1/perfect-api",
};

export default function SettingsCutsomEditorComponent() {
  const config = useUserConfigStore((store) => store.config);
  useUserConfigStore((store) => store.appVersion);

  return (
    <div>
      <Editor
        width={"100%"}
        height={"200px"}
        theme={config.preferences.editor.editorTheme || "vs-dark"}
        defaultLanguage="json"
        defaultValue={JSON.stringify(jsonExample, null, 2)}
        beforeMount={addMonacoThemes}
        options={{
          theme: config.preferences.editor.editorTheme || "vs-dark",
          fontSize: config.preferences.editor.editorFontSize,
          readOnly: true,
          minimap: {
            enabled: config.preferences.editor.editorMiniMap || false,
          },
        }}
      />
    </div>
  );
}
