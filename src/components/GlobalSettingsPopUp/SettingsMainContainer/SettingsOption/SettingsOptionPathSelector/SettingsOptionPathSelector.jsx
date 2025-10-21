import { userSettingsOptionsMap } from "../../../../../utils/userConfiguration/userSettingsConstants";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SettingsOptionPathSelector.css";
import { open } from "@tauri-apps/plugin-dialog";
import { getConfig } from "../../../../../utils/userConfiguration/getConfig";
import { useEffect, useState } from "react";
import { exists } from "@tauri-apps/plugin-fs";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";

export default function SettingsOptionPathSelector({
  configOptions,
  option,
  tab,
  section,
  type,
  setConfigOptions,
}) {
  const [isValidPath, setIsValidPath] = useState(true);

  useEffect(() => {
    if (configOptions[section][option] === undefined) {
      setIsValidPath(false);
      return;
    }

    const checkIfPathExists = async () => {
      try {
        const pathExsist = await exists(configOptions[section][option]);

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
  }, [configOptions]);

  const handleOpenFolderDialog = async () => {
    const updatedConfigOptions = { ...configOptions };
    const file = await open({
      files: type === "filePath" ? true : false,
      directory: type === "path" ? true : false,
      multiple: false,
      title: "Select folder",
      recursive: true,
      defaultPath: configOptions[section][option] || undefined,
    });
    if (file === null) return;

    updatedConfigOptions[section][option] = file;

    const config = await getConfig();
    await config.set(tab, updatedConfigOptions);
    await config.save();

    setConfigOptions((prev) => {
      return { ...prev, [section]: { ...prev[section], [option]: file } };
    });
  };

  return (
    <SettingsOptionContainer option={option}>
      <SettingsOptionText option={option} />
      <div className="settings-option_input-container">
        <input
          className="settings-option_input"
          value={configOptions[section][option] || ""}
          placeholder={userSettingsOptionsMap[option]?.title}
          readOnly={true}
          style={{ borderColor: isValidPath ? "var(--borders)" : "red" }}
          onClick={handleOpenFolderDialog}
        ></input>
        <button
          onClick={handleOpenFolderDialog}
          className="settings-option_button-open-dir"
        >
          <FontAwesomeIcon icon={faFolder} />
        </button>
      </div>
    </SettingsOptionContainer>
  );
}
