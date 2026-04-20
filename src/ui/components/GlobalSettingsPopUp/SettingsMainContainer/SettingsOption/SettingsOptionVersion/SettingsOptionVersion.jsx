import { useState } from "react";
import { userSettingsOptionsMap } from "../../../../../utils/userConfiguration/userSettingsConstants";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import "./SettingsOptionVersion.css";

export default function SettingsOptionVersion({ option }) {
    const [currentVersion, setCurrentVersion] = useState("");
    const [updateAvailable, setUpdateAvailable] = useState({
        available: false,
        latesteVersion: "",
        message: "Buscar actualizaciones",
    });



    return (
        <SettingsOptionContainer option={option}>
            <SettingsOptionText
                option={option}
                text={`${userSettingsOptionsMap[option]?.title} ${currentVersion}`}
                description={
                    <a style={{ color: "var(--primary)" }} href="#">
                        Ver novedades
                    </a>
                }
            />
            {!updateAvailable.available ? (
                <button
                    className="settings-option_btn-search-updates"
                >
                    {updateAvailable.message}
                </button>
            ) : (
                <button
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
