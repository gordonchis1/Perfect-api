import { Cookie } from "lucide-react"
import "./CookieButton.css"
import useModal from "../../../providers/ModalProvider/useModal"

export default function CookieButton() {
    const { open } = useModal()
    const handleOpen = () => {
        open("cookies")
    }
    return (
        <button className="cookie-button" onClick={handleOpen}>Cookies <Cookie /></button >
    )
}
