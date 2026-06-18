import { create } from "zustand";
import { createV0Client, createV0project, getV0Chat, initV0Chat } from "../utils/v0/v0Utils";
import { useProjectStore } from "./ProjectStore";
import { v0PromptContext } from "../utils/v0/prompt";
import { useUserConfigStore } from "./UserConfigStore";

export const usePreviewStore = create((set, get) => ({
    currentChatId: null,
    demo: null,
    messagesHistory: [],
    v0Client: null,
    projectId: null,

    init: async () => {
        const updatedState = { ...get() }
        const v0Client = createV0Client()
        const currentFileId = useProjectStore.getState().currentFileId
        const content = useProjectStore.getState().openFiles[currentFileId].content
        if (content?.v0ChatId) {
            updatedState['currentChatId'] = content.v0ChatId
        }
        updatedState['v0Client'] = v0Client
        set(updatedState)
    },
    createProject: async () => {
        if (get().projectId) return
        if (!get().v0Client) return
        const projectId = await createV0project(get().v0Client)
        get().setProjectId(projectId)
    },
    setProjectId: (projectId) => {
        set({ ...get(), projectId })
    },
    initV0Chat: async (currentEntry) => {
        if (get().currentChatId) return
        const currentFileId = useProjectStore.getState().currentFileId
        const content = useProjectStore.getState().openFiles[currentFileId].content

        if (content?.v0ChatId) {
            set({ ...get, currentChatId: content.v0ChatId })
            return
        }

        const chat = await initV0Chat(currentEntry)
        if (!chat?.id) return

        set({ ...get, currentChatId: chat.id })
    },
    loadV0Chat: async () => {
        if (!get().currentChatId) return
        const chat = await getV0Chat(get().currentChatId)
        console.log(chat)
        if (chat.id) {
            set({ ...get(), messagesHistory: chat.messages, demo: chat.latestVersion.demoUrl })
        }
    },
    sendMessage: async (message = "") => {
        const v0Client = get().v0Client
        const chatId = get().currentChatId
        const apiKey = useUserConfigStore.getState().config?.connections?.apikeys?.v0;
        if (!v0Client || !chatId || !apiKey) return
        if (message.length == 0) {
            message = "Create a page with the api endpoint"
        }
        try {
            const result = await window.v0.sendV0Message(message, apiKey, chatId);
            console.log(result)
            window.v0.onStreamData((data) => console.log(data))



            /*const result = await v0Client.chats.sendMessage({
                chatId,
                message,
                responseMode: "experimental_stream"
            })
            console.log(result)

            if (result.id) {
                set({ ...get(), demo: result.latestVersion.demoUrl, messagesHistory: result.messages })
                console.log(result)
            }*/
        } catch (error) {
            console.log(error)
        }
    }
}))
