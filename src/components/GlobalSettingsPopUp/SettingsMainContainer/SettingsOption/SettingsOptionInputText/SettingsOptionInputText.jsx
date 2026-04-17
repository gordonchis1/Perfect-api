import Input from "../../../../Global/Input/Input";
import SettingsOptionContainer from "../SettingsOptionContainer/SettingsOptionContainer";
import SettingsOptionText from "../SettingsOptionContainer/SettingsOptionText/SettingsOptionText";

export default function SettingsOptionInputText(
    {
        option,
        section,
        tab,
        title,
        description,
        placeholder
    }) {

    return (
        <SettingsOptionContainer option={option}>
            <SettingsOptionText description={description} option={option} text={title} />
            <Input placeholder={placeholder} />
        </SettingsOptionContainer>
    )
}
