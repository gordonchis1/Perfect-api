import { useEffect } from "react"
import useCurrentEntry from "../../../../../../Hooks/useCurrentEntry"
import { usePreviewStore } from "../../../../../../stores/PreviewStore"
import { useProjectStore } from "../../../../../../stores/ProjectStore"
import Button from "../../../../../Global/Button/Button"
import PreviewChatInput from "./PreviewChatInput/PreviewChatInput"
import "./WorkSpaceInputUrlPreviewChat.css"
import PreviewChatMessages from "./PreviewChatMessages/PreviewChatMessages"
import { StreamingMessage } from "@v0-sdk/react"

export default function WorkSpaceInputUrlPreviewChat() {
    const currentFileId = useProjectStore(store => store.currentFileId)
    const content = useProjectStore(store => store.openFiles[currentFileId].content)
    const currentEntry = useCurrentEntry()
    const previewStore = usePreviewStore()
    const initPreviewStore = usePreviewStore(store => store.init)
    const createProject = usePreviewStore(store => store.createProject)
    const v0Client = usePreviewStore(store => store.v0Client)
    const initV0Chat = usePreviewStore(store => store.initV0Chat)
    const loadV0Chat = usePreviewStore(store => store.loadV0Chat)

    useEffect(() => {
        const load = async () => {
            await loadV0Chat()
        }
        if (v0Client) return
        initPreviewStore()
        if (content?.v0ChatId && previewStore?.messagesHistory) {
            load()
        }
    }, [])

    const handleInitChat = async () => {
        if (!currentEntry) return
        if (!previewStore.projectId) {
            await createProject()
        }
        if (!content?.v0ChatId) {
            await initV0Chat(currentEntry)
        }
    }
    return (
        <div className="input-preview-chat_container">
            <PreviewChatMessages />
            {content?.v0ChatId ?
                <PreviewChatInput />
                : <Button text={"init v0 chat"} onClick={handleInitChat} />
            }
        </div>
    )
}
