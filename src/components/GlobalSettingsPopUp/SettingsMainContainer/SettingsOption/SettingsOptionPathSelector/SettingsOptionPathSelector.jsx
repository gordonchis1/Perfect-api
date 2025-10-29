import { userSettingsOptionsMap } from "../../../../../utils/userConfiguration/userSettingsConstants";
import "./SettingsOptionPathSelector.css";
import { open } from "@tauri-apps/plugin-dialog";
import { useEffect, useState } from "react";
import { exists } from "@tauri-apps/plugin-fs";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";
import { Folder } from "lucide-react";

export default function SettingsOptionPathSelector({
  option,
  tab,
  section,
  type,
}) {
  const config = useUserConfigStore((state) => state.config);
  const updateConfig = useUserConfigStore((state) => state.updateConfig);
  const [isValidPath, setIsValidPath] = useState(true);

  useEffect(() => {
    if (config[tab][section][option] === undefined) {
      setIsValidPath(false);
      return;
    }

    const checkIfPathExists = async () => {
      try {
        const pathExsist = await exists(config[tab][section][option]);

        if (pathExsist) {
          setIsValidPath(true);
        } else {
          setIsValidPath(false);
        }
      } catch {
        setIsValidPath(false);
      }
    };
    checkIfPathExists();
  }, [config[tab][section][option]]);

  const handleOpenFolderDialog = async () => {
    const updatedConfigOptions = { ...config };
    const file = await open({
      files: type === "filePath" ? true : false,
      directory: type === "path" ? true : false,
      multiple: false,
      title: "Select folder",
      recursive: true,
      defaultPath: config[tab][section][option] || undefined,
    });
    if (file === null) return;

    updatedConfigOptions[tab][section][option] = file;
    await updateConfig(updatedConfigOptions);
  };

  return (
    <SettingsOptionContainer option={option}>
      <SettingsOptionText option={option} />
      <div className="settings-option_input-container">
        <input
          className="settings-option_input"
          value={config[tab][section][option] || ""}
          placeholder={userSettingsOptionsMap[option]?.title}
          readOnly={true}
          style={{ borderColor: isValidPath ? "var(--sidebar-border)" : "red" }}
          onClick={handleOpenFolderDialog}
        ></input>
        <button
          onClick={handleOpenFolderDialog}
          className="settings-option_button-open-dir"
        >
          <Folder size={20} fill="var(--primary-text-color)" />
        </button>
      </div>
    </SettingsOptionContainer>
  );
}
