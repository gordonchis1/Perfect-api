import { useUserConfigStore } from "../../../../../stores/UserConfigStore"
import { useProjectStore } from "../../../../../stores/ProjectStore"
import useCurrentEntry from "../../../../../Hooks/useCurrentEntry"
import { generateV0File } from "../../../../../utils/v0/generateV0File"
import Button from "../../../../Global/Button/Button"
import { v0PromptContext } from "../../../../../utils/v0/prompt"
import { createClient, } from "v0-sdk"
import "./WorkspacePreviewPreview.css"
import useModal from "../../../../../providers/ModalProvider/useModal"

export default function WorkspacePreviewPreview() {
    const config = useUserConfigStore(store => store.config)
    const currentFileId = useProjectStore(store => store.currentFileId)
    const openFile = useProjectStore(store => store.openFiles[currentFileId])
    const currentEntry = useCurrentEntry()
    const setV0Project = useProjectStore(store => store.setV0Project)
    const v0ProjectId = useProjectStore(store => store.v0Project)
    const { open } = useModal()

    const createV0project = async () => {
        if (v0ProjectId) return
        if (!config?.connections?.apikeys?.v0) return

        try {
            const v0 = createClient({
                apiKey: config.connections.apikeys.v0,

            })

            const name = `${openFile?.name}-Perfect api`
            const project = await v0.projects.create({
                name,
                instructions: v0PromptContext,
                files: [
                    {
                        name: `${openFile?.name}`,
                        content: generateV0File(currentEntry)

                    }
                ],
            })
            setV0Project(project.id)
        } catch (error) {
            console.error(error)

        }
    }

    if (!config?.connections?.apikeys?.v0) {
        return (
            <div className="preview_container">
                <Button text={"Set your v0 api key"} onClick={() => open("settings", { tab: "connections" })} />
            </div>
        )
    }

    return (
        <div className="preview_container">
            {
                !v0ProjectId && <Button text={"Create v0 project"} onClick={createV0project} />
            }
        </div>
    )
}
