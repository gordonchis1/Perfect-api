import Markdown from "react-markdown"
import { usePreviewStore } from "../../../../../../../stores/PreviewStore"
import "./PreviewChatMessages.css"

export default function PreviewChatMessages() {
    const messages = usePreviewStore(store => store.messagesHistory)
    return <div className="preview-chat-messages_container">
        {messages.map(msg => {
            return (
                <div
                    key={msg.id}
                    className="preview-chat_message-container"
                    style={{ alignSelf: msg.role == "user" ? "flex-end" : "flex-start" }}
                >
                    <Markdown>{msg.content}</Markdown>
                </div>
            )
        })}
    </div>
}
