import Input from "../../../../Global/Input/Input";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";

export default function SettingsOptionInputText(
    {
        option,
        section,
        tab,
        title,
        description,
        placeholder
    }) {

    const updateConfig = useUserConfigStore((state) => state.updateConfig);
    const config = useUserConfigStore(state => state.config)

    const handleUpdateConfig = async (event) => {
        const value = event.target.value
        const updatedConfigOptions = { ...config };
        updatedConfigOptions[tab][section][option] = value;
        await updateConfig(updatedConfigOptions)
    }

    return (
        <SettingsOptionContainer option={option}>
            <SettingsOptionText description={description} option={option} text={title} />
            <Input
                placeholder={placeholder}
                onChange={handleUpdateConfig}
                value={config[tab][section][option] || ""}
            />

        </SettingsOptionContainer>
    )
}
