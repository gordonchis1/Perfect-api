import { createClient } from "v0-sdk"
import { useProjectStore } from "../../stores/ProjectStore"
import { useUserConfigStore } from "../../stores/UserConfigStore"
import { v0PromptContext } from "./prompt.js"
import { generateV0File } from "./generateV0File.js"
import { usePreviewStore } from "../../stores/PreviewStore.jsx"


export const createV0Client = () => {
    const config = useUserConfigStore.getState().config
    if (!config?.connections?.apikeys?.v0) return

    const v0 = createClient({
        apiKey: config.connections.apikeys.v0,

    })

    return v0
}

export const createV0project = async (v0) => {
    const projectStore = useProjectStore.getState()
    const v0ProjectId = projectStore?.projectMetadata?.v0ProjectId
    const config = useUserConfigStore.getState().config
    const projectName = projectStore.projectMetadata.name
    const setV0Project = projectStore.setV0Project

    if (v0ProjectId) return
    if (!config?.connections?.apikeys?.v0) return

    try {
        const name = `${projectName}-Perfect api`
        const project = await v0.projects.create({
            name,
            instructions: v0PromptContext,
        })
        setV0Project(project.id)

        console.log(project)
        return project.id


    } catch (error) {
        console.error(error)

    }
}

export const initV0Chat = async (currentEntry) => {
    const projectStore = useProjectStore.getState()
    const v0ProjectId = usePreviewStore.getState().projectId
    const currentFileId = projectStore.currentFileId
    const openFile = projectStore.openFiles[currentFileId]
    const v0Client = usePreviewStore.getState().v0Client
    const updateContentOfOpenFile = projectStore.updateContentOfOpenFile
    const content = projectStore.openFiles[currentFileId].content

    if (content?.v0ChatId) return

    try {
        const chat = await v0Client.chats.init({
            name: openFile.name,
            projectId: v0ProjectId,
            type: "files",
            files: [
                {
                    name: `${openFile.name}.json`,
                    content: generateV0File(currentEntry)
                },
            ],
        })

        updateContentOfOpenFile(currentFileId, { ...content, v0ChatId: chat.id }, true)
        return chat
    } catch (error) {
        console.error(error)
    }


}


export const getV0Chat = async (chatId) => {
    if (!chatId) return
    const v0Client = usePreviewStore.getState().v0Client
    if (!v0Client) return

    try {
        const chat = await v0Client.chats.getById({
            chatId
        })

        console.log(chat)
        return chat

    } catch (error) {
        console.log(error)
    }
}

