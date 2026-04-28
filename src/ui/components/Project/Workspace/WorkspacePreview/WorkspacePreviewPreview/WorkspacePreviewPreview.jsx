import { useUserConfigStore } from "../../../../../stores/UserConfigStore"
import Button from "../../../../Global/Button/Button"
import "./WorkspacePreviewPreview.css"
import useModal from "../../../../../providers/ModalProvider/useModal"
import { usePreviewStore } from "../../../../../stores/PreviewStore"

export default function WorkspacePreviewPreview() {
    const config = useUserConfigStore(store => store.config)
    const { open } = useModal()
    const demoUrl = usePreviewStore(store => store.demo)

    if (!config?.connections?.apikeys?.v0) {
        return (
            <div className="preview_container">
                <Button text={"Set your v0 api key"} onClick={() => open("settings", { tab: "connections" })} />
            </div>
        )
    }

    return (
        <div className="preview_container">
            {demoUrl &&
                <iframe src={demoUrl} className="preview_iframe"></iframe>
            }
        </div>
    )
}
