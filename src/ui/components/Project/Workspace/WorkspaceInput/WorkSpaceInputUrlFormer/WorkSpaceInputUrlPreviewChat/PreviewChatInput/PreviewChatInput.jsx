import { useState } from "react"
import Button from "../../../../../../Global/Button/Button"
import Input from "../../../../../../Global/Input/Input"
import "./PreviewChatInput.css"
import { usePreviewStore } from "../../../../../../../stores/PreviewStore"
import { StreamingMessage } from "@v0-sdk/react"

export default function PreviewChatInput() {
    const sendMessage = usePreviewStore(store => store.sendMessage)
    const [input, setInput] = useState("")
    const handleSendMessage = async () => {
        await sendMessage(input)
    }

    return (
        <div className="preview-chat_input-container">
            <Input placeholder={"Instructions"} onChange={(event) => setInput(event.target.value)} /><Button text={"Send"} onClick={handleSendMessage} />
        </div>
    )
}
