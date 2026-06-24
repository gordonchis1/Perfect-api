import Markdown from "react-markdown"
import { usePreviewStore } from "../../../../../../../stores/PreviewStore"
import "./PreviewChatMessages.css"
import { StreamingMessage, useStreamingMessage, Message } from "@v0-sdk/react"
import { useState } from "react"

export default function PreviewChatMessages() {
    const messages = usePreviewStore(store => store.messagesHistory)
    let controller;
    const [stream, setStream] = useState(null);
    const { content } = useStreamingMessage(stream, {});
    console.log(content)

    window.v0.onV0Stream(data => {
        if (controller instanceof ReadableStreamDefaultController) {
            console.log(data);
            controller.enqueue(data);
        }
    })

    window.v0.onV0StreamEnd(data => {
        if (controller instanceof ReadableStreamDefaultController) {
            console.log("Se termino")
            controller.close()
        }
    })
    const sendFakeMessage = () => {
        setStream(new ReadableStream({
            start(c) {
                controller = c
            }
        }))
    }


    return <div className="preview-chat-messages_container">
        {messages.map(msg => {
            return (
                <Message
                    key={msg.id}
                >
                </Message>
            )
        })}
        <button onClick={sendFakeMessage}>send</button>
    </div>
}
