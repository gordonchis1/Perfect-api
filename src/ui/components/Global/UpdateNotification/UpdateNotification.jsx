import { useState, useEffect } from "react";
import "./UpdateNotification.css";
import { useUserConfigStore } from "../../../stores/UserConfigStore";

export default function UpdateNotification() {
    const config = useUserConfigStore((state) => state.config);
    const [updater, setUpdater] = useState(undefined);
    const [isOpen, setIsOpen] = useState(true);
    const [updating, setUpdateing] = useState({
        isUpdating: false,
        progress: 0,
    });

    useEffect(() => {
        console.log("un implemented")
    }, [config?.genera?.app?.autoUpdate, config?.general]);

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
