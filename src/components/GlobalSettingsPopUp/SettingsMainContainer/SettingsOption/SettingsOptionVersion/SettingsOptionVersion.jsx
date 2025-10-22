import { useEffect, useState } from "react";
import { userSettingsOptionsMap } from "../../../../../utils/userConfiguration/userSettingsConstants";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import { getVersion } from "@tauri-apps/api/app";
import "./SettingsOptionVersion.css";
import { check } from "@tauri-apps/plugin-updater";

export default function SettingsOptionVersion({ option }) {
  const [currentVersion, setCurrentVersion] = useState("");
  const [updateAvailable, setUpdateAvailable] = useState({
    available: false,
    latesteVersion: "",
    message: "Buscar actualizaciones",
  });

  useEffect(() => {
    const getCurrentVersion = async () => {
      const currentVersion = await getVersion();
      setCurrentVersion(currentVersion);
    };
    getCurrentVersion();
  }, []);

  const handleSearchUpdates = async () => {
    // Lógica para buscar actualizaciones
    const checkForUpdate = await check();

    if (checkForUpdate !== null) {
      setUpdateAvailable({
        available: true,
        latesteVersion: checkForUpdate.version,
      });
    } else {
      setUpdateAvailable({
        available: false,
        message: "No hay actualizaciones disponibles",
      });
    }
  };
  const handleUpdate = async () => {
    const checkForUpdate = await check();

    await checkForUpdate.downloadAndInstall((event) => {
      switch (event.event) {
        case "Started":
          alert(
            `Descargando actualización... \n La app se reiniciará automáticamente.`
          );
          console.log(`started downloading ${event.data.contentLength} bytes`);
          break;
        case "Progress":
          break;
        case "Finished":
          console.log("download finished");
          break;
      }
    });
    alert(
      `Iniciando actualización a la versión ${updateAvailable.latesteVersion}...`
    );
  };

  return (
    <SettingsOptionContainer option={option}>
      <SettingsOptionText
        option={option}
        text={`${userSettingsOptionsMap[option]?.title} ${currentVersion}`}
        description={
          <a style={{ color: "var(--accent-background)" }} href="#">
            Ver novedades
          </a>
        }
      />
      {!updateAvailable.available ? (
        <button
          onClick={handleSearchUpdates}
          className="settings-option_btn-search-updates"
        >
          {updateAvailable.message}
        </button>
      ) : (
        <button
          onClick={handleUpdate}
          className="settings-option_update-available"
        >
          <p>
            Ultima version: <b>{updateAvailable.latesteVersion}</b>
          </p>
          <p>Actualizar</p>
        </button>
      )}
    </SettingsOptionContainer>
  );
}
