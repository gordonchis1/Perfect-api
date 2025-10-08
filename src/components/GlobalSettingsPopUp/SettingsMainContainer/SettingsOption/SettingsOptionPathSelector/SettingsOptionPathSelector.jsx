import { userSettingsOptionsMap } from "../../../../../utils/constants/userSettingsConstants";
import { faFolder, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SettingsOptionPathSelector.css";
import { open } from "@tauri-apps/plugin-dialog";
import { getConfig } from "../../../../../utils/userConfiguration/getConfig";
import { useEffect, useState } from "react";
import { exists } from "@tauri-apps/plugin-fs";

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
    <div key={option} className="settings-main_option-container">
      <div className="settings-option_text">
        <h4 className="settings-option_title">
          {userSettingsOptionsMap[option]?.title || option}
        </h4>
        <p className="settings-option_description">
          {userSettingsOptionsMap[option]?.description || option}
        </p>
        {userSettingsOptionsMap[option]?.alert && (
          <p className="settings-option_alert">
            <FontAwesomeIcon icon={faWarning} className="option-alert_icon" />
            {userSettingsOptionsMap[option]?.alert}
          </p>
        )}
      </div>
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
    </div>
  );
}
