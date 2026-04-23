import useCurrentEntry from "../../../../../Hooks/useCurrentEntry"
import useModal from "../../../../../providers/ModalProvider/useModal";
import "./WorkspacePreviewCookies.css"

export default function WorkspacePreviewCookies() {
    const entry = useCurrentEntry()
    const cookies = entry?.response?.cookies;
    const { open } = useModal()


    if (!cookies) return
    return <div className="preview-cookies_container">
        <div className="cookies_subtitle-container">
            <div className="cookies_subtitle"><p>Name</p></div>
            <div className="cookies_subtitle"><p>Value</p></div>
        </div>
        {cookies.map((cookie, index) => {
            return <div className="cookies_cookie-container" key={index} style={{ background: index % 2 == 0 ? "var(--primary-transparent)" : "" }}>
                <p className="cookie_value-p">{cookie.key}</p>
                <p className="cookie_key-p">{cookie.value}</p>
            </div>
        })}
        <button type="" onClick={() => open('cookies')}>Cookies</button>
    </div>

}
