import { useState } from "react";
import CookieField from "../../CookieField/CookieField";
import { formatDateForInput } from "../../../../../../utils/cookies/formatCookies";
import "./CookieEditor.css"
import Button from "../../../../Button/Button";
import { Check, X } from "lucide-react";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import { CookieJar } from "tough-cookie";

export default function CookieEditor({ cookie, setIsEditing, isEditing }) {
    const [updateCookie, setUpdateCookie] = useState(cookie)
    const [updatedCookieRaw, setUpdateCookieRaw] = useState(cookie.toString())
    const updateCookies = useProjectStore(store => store.updateCookies)

    const cookies = useProjectStore(store => store.cookies)

    const handleCancel = () => {
        setIsEditing({ state: false, idx: undefined })
    }

    const handleConfirmEdit = () => {
        const jar = CookieJar.fromJSON(cookies)
        const jarJson = jar.toJSON()
        jarJson.cookies[isEditing.idx] = updateCookie.toJSON()
        updateCookies(jarJson)
        setIsEditing({ state: false, idx: undefined })

    }

    return (
        <div className="cookie-editor_container">
            <CookieField
                placeholder={"Key"}
                value={updateCookie.key}
                cookie={updateCookie}
                setCookie={setUpdateCookie}
                setCookieRaw={setUpdateCookieRaw}
                field={"key"}
            />
            <CookieField
                field={"value"}
                placeholder={"Value"}
                value={updateCookie.value}
                setCookieRaw={setUpdateCookieRaw}
                setCookie={setUpdateCookie}
                cookie={updateCookie}
            />
            <CookieField
                field={"domain"}
                placeholder={"Domain"}
                value={updateCookie.domain}
                setCookieRaw={setUpdateCookieRaw}
                setCookie={setUpdateCookie}
                cookie={updateCookie}
            />
            <CookieField
                field={"path"}
                placeholder={"Path"}
                value={updateCookie.path}
                setCookieRaw={setUpdateCookieRaw}
                setCookie={setUpdateCookie}
                cookie={updateCookie}
            />
            <CookieField
                field={"expires"}
                placeholder={"Expires"}
                value={formatDateForInput(updateCookie.expires)}
                setCookieRaw={setUpdateCookieRaw}
                setCookie={setUpdateCookie}
                cookie={updateCookie}
                type={"datetime-local"}
            />

            <div className="cookie-editor_bts-container">
                <Button text={"Save"} icon={<Check />} onClick={handleConfirmEdit} />
                <Button
                    onClick={handleCancel}
                    text={"Cancel"}
                    icon={<X />}
                    background="var(--destructive)"
                />
            </div>

        </div>
    )
}
