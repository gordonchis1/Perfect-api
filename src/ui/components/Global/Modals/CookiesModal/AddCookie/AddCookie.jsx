import { useRef, useState } from "react";
import { Cookie, CookieJar } from "tough-cookie";
import { Plus, X } from "lucide-react";
import "./AddCookie.css"
import Button from "../../../Button/Button";
import { useProjectStore } from "../../../../../stores/ProjectStore";
import CookieField from "../CookieField/CookieField";
import { formatDateForInput } from "../../../../../utils/cookies/formatCookies";

export default function AddCookie({ setIsAdding }) {
    const [newCookie, setNewCookie] = useState(new Cookie())
    const containerRef = useRef(null)
    const cookies = useProjectStore(store => store.cookies)
    const [newCookieRaw, setNewCookieRaw] = useState("")
    const updateCookies = useProjectStore(store => store.updateCookies)



    const handleAddCookie = (event) => {
        event.preventDefault()
        const jar = CookieJar.fromJSON(cookies)
        const jarJson = jar.toJSON()
        jarJson.cookies.push(newCookie.toJSON())
        updateCookies(jarJson)
        setIsAdding(false)
    }

    return <div className="add-cookie_container" ref={containerRef}>
        <CookieField
            placeholder={"Key"}
            value={newCookie.key}
            cookie={newCookie}
            setCookie={setNewCookie}
            setCookieRaw={setNewCookieRaw}
            field={"key"}
        />
        <CookieField
            field={"value"}
            placeholder={"Value"}
            value={newCookie.value}
            setCookieRaw={setNewCookieRaw}
            setCookie={setNewCookie}
            cookie={newCookie}
        />
        <CookieField
            field={"domain"}
            placeholder={"Domain"}
            value={newCookie.domain}
            setCookieRaw={setNewCookieRaw}
            setCookie={setNewCookie}
            cookie={newCookie}
        />
        <CookieField
            field={"path"}
            placeholder={"Path"}
            value={newCookie.path}
            setCookieRaw={setNewCookieRaw}
            setCookie={setNewCookie}
            cookie={newCookie}
        />
        <CookieField
            field={"expires"}
            placeholder={"Expires"}
            value={formatDateForInput(newCookie.expires)}
            setCookieRaw={setNewCookieRaw}
            setCookie={setNewCookie}
            cookie={newCookie}
            type={"datetime-local"}
        />

        <div className="add-cookie-form_btn-container">
            <Button onClick={handleAddCookie} text={"Add"} icon={<Plus />}></Button>
            <Button background={"var(--destructive)"} onClick={() => setIsAdding(false)} text={"Cancel"} icon={<X />}></Button>
        </div>
        <p>{newCookieRaw}</p>
    </div>
}
