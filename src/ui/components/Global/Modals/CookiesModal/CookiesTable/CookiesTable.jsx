import { Cookie, CookieJar } from "tough-cookie"
import { useProjectStore } from "../../../../../stores/ProjectStore"
import "./CookiesTable.css"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import CookieEditor from "./CookieEditor/CookieEditor"

export default function CookiesTable() {
    const updateCookies = useProjectStore(store => store.updateCookies)
    const cookies = useProjectStore(store => store.cookies)
    const [isEditing, setIsEditing] = useState({
        state: false,
        idx: true,
    })

    const convertToCookieInstance = () => {
        const parsedCookies = []
        for (let cookie of cookies.cookies) {
            const parsedCookie = Cookie.fromJSON(cookie)
            parsedCookies.push(parsedCookie)
        }
        return parsedCookies
    }
    const cookiesToRender = convertToCookieInstance()

    const handleEdit = (cookie, idx) => {
        setIsEditing({
            state: true,
            idx
        })
    }

    const handleDelateCookie = (cookie, idx) => {
        const updatedCookies = structuredClone(cookies)
        const delatedCookie = updatedCookies.cookies.splice(idx, 1)

        if (!delatedCookie) return

        const delatedCookieJson = cookie.toJSON()
        if (delatedCookie[0].creation == delatedCookieJson.creation && delatedCookie[0].key == delatedCookieJson.key) {
            updateCookies(updatedCookies)
        }
    }

    return <div className="cookies-table_container">
        {cookies && cookiesToRender.map((cookie, idx) => {
            return (
                <div
                    className="cookie_container"
                    style={{ background: idx % 2 == 0 ? "var(--primary-transparent)" : "" }}
                >
                    <div className="cookie-row_container">
                        <p>{cookie.domain}</p>
                        <p>{cookie.toString()}</p>
                        <div className="cookie-btn_container">
                            {!isEditing.state && (
                                <>
                                    <button
                                        className="cookie-btn"
                                        onClick={() => handleDelateCookie(cookie, idx)}
                                    >
                                        <Trash2 color="var(--destructive)" />
                                    </button>
                                    <button
                                        className="cookie-btn"
                                        onClick={() => { handleEdit(cookie, idx) }}
                                    >
                                        <Pencil />
                                    </button>
                                </>
                            )}
                        </div>

                    </div>
                    {(isEditing.state && isEditing.idx == idx) &&
                        <CookieEditor cookie={cookie} setIsEditing={setIsEditing} isEditing={isEditing} />
                    }
                </div>
            )
        })}
    </div>
}
