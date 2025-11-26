import { Editor } from "@monaco-editor/react";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import "./SettingsOptionEditorTheme.css";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";

const defaultExample = {
  name: "Perfect API",
  description:
    "Cliente ligero para probar, guardar y gestionar peticiones HTTP.",
  developer: "gordonchis",
  repository: "https://github.com/gordonchis1/perfect-api",
};

export default function SettingsOptionEditorTheme({ option, tab, section }) {
  const config = useUserConfigStore((store) => store.config);
  return (
    <div className="settings-option_editor-container">
      <SettingsOptionContainer option={option}>
        <SettingsOptionText option={option} />
      </SettingsOptionContainer>
      <Editor
        theme={config.preferences.appearance.editorTheme || "vs-dark"}
        width={"100%"}
        height={"150px"}
        defaultValue={JSON.stringify(defaultExample, null, 2)}
        defaultLanguage="json"
        language="json"
      />
    </div>
  );
}
