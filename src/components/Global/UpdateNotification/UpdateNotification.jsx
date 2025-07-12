import { useState, useEffect } from "react";
import { getVersion } from "@tauri-apps/api/app";
import { check } from "@tauri-apps/plugin-updater";
import "./UpdateNotification.css";

const defaultUpdateState = {
  isUpdateAvailable: false,
  currentVersion: "",
};

export default function UpdateNotification() {
  const [updater, setUpdater] = useState(defaultUpdateState);

  useEffect(() => {
    const getUpdateInfo = async () => {
      const currentVersion = await getVersion();
      const checkForUpdate = await check();

      if (checkForUpdate !== null) {
        setUpdater({
          isUpdateAvailable: true,
          currentVersion: currentVersion,
        });
      } else {
        setUpdater({
          isUpdateAvailable: false,
          currentVersion: currentVersion,
        });
      }
    };

    getUpdateInfo();
  }, []);

  return (
    <div
      className="update-notfication_container"
      style={{
        zIndex: 1000,
        borderBottom: updater.isUpdateAvailable
          ? "4px solid var(--warning)"
          : "4px solid var(--success)",
      }}
    >
      {updater.isUpdateAvailable ? (
        <p>
          A new version of Perfect API is available.
          <br /> Current version: {updater.currentVersion}
        </p>
      ) : (
        <p>
          You are using the latest version of Perfect API.
          <br /> Current version: {updater.currentVersion}
        </p>
      )}
    </div>
  );
}
