import SettingsCutsomEditorComponent from "./SettingsCustomEditorComponent/SettingsCustomEditorComponent";

export default function OptionsSectionCustomsComponents({ section }) {
  return (
    <div style={{ width: "100%" }}>
      {section == "editor" && <SettingsCutsomEditorComponent />}
    </div>
  );
}
