import { useState, useEffect } from "react";
import { getVersion } from "@tauri-apps/api/app";
import { check } from "@tauri-apps/plugin-updater";
import "./UpdateNotification.css";
import { relaunch } from "@tauri-apps/plugin-process";
import { fetch } from "@tauri-apps/plugin-http";
import { useUserConfigStore } from "../../../stores/UserConfigStore";

export default function UpdateNotification({ setUpdateNotification }) {
  const config = useUserConfigStore((state) => state.config);
  const [updater, setUpdater] = useState(undefined);
  const [isOpen, setIsOpen] = useState(true);
  const [updating, setUpdateing] = useState({
    isUpdating: false,
    progress: 0,
  });

  useEffect(() => {
    const getLatestVersion = async () => {
      try {
        const response = await fetch(
          "https://github.com/gordonchis1/Perfect-api/releases/latest/download/latest.json"
        );
        const data = await response.json();
        setUpdater((prev) => ({
          ...prev,
          lastestVersion: data.version,
        }));
      } catch {
        setUpdater({
          lastestVersion: "Unknown",
        });
      }
    };

    const getUpdateInfo = async () => {
      const currentVersion = await getVersion();
      const checkForUpdate = await check();

      if (checkForUpdate !== null) {
        setUpdater({
          isUpdateAvailable: true,
          currentVersion: currentVersion,
        });
        setIsOpen(true);
      } else {
        setUpdater({
          isUpdateAvailable: false,
          currentVersion: currentVersion,
        });
        setIsOpen(true);
      }
      getLatestVersion();
    };

    if (config && config.general.app.autoUpdate) {
      getUpdateInfo();
    }
  }, [config?.genera?.app?.autoUpdate]);

  useEffect(() => {
    const intervalAnimation = setInterval(() => {
      if (updating.isUpdating) return;
      setIsOpen(false);
    }, 7000);

    const interval = setInterval(() => {
      if (updating.isUpdating) return;
      setUpdater(undefined);
    }, 80000);

    return () => {
      clearInterval(intervalAnimation);
      clearInterval(interval);
    };
  }, []);

  const handleUpdate = async () => {
    const update = await check();

    let downloaded = 0;
    let contentLength = 0;
    let progress = 0;

    setUpdateing({ isUpdating: true, progress });

    await update.downloadAndInstall((event) => {
      switch (event.event) {
        case "Started":
          contentLength = event.data.contentLength;
          console.log(`started downloading ${event.data.contentLength} bytes`);
          break;
        case "Progress":
          downloaded += event.data.chunkLength;
          progress = (downloaded / contentLength) * 100;
          setUpdateing({ isUpdating: true, progress });
          break;
        case "Finished":
          console.log("download finished");
          break;
      }
    });

    await relaunch();
  };

  return (
    <>
      {updater !== undefined && (
        <div
          className="update-notfication_container"
          style={{
            zIndex: 1000,
            borderBottom: updater.isUpdateAvailable
              ? "4px solid var(--warning)"
              : "4px solid var(--success)",
            animation: isOpen
              ? "fadeIn 0.5s ease-in-out"
              : "fadeOut 0.5s ease-in-out forwards",
          }}
        >
          {updater.isUpdateAvailable ? (
            <p>A new version of Perfect API is available.</p>
          ) : (
            <p>You are using the latest version of Perfect API.</p>
          )}
          <p>Current version: {updater.currentVersion}</p>
          {updater.isUpdateAvailable && (
            <p>Latest version: {updater.lastestVersion}</p>
          )}
          {updater.isUpdateAvailable && !updating.isUpdating ? (
            <button
              className="update-notification_update-button"
              style={{ opacity: updating.isUpdating ? 0.5 : 1 }}
              onClick={handleUpdate}
              disabled={updating.isUpdating}
            >
              Update
            </button>
          ) : (
            <div className="update-notification_update-progress-container">
              <div
                className="update-notification_update-progress"
                style={{ width: `${updating.progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
