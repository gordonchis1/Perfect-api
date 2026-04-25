import { useRef, useState } from "react";
import { Cookie, CookieJar } from "tough-cookie";
import { Plus, X } from "lucide-react";
import "./AddCookie.css"
import Button from "../../../Button/Button";
import CookieField from "./CookieField/CookieField";
import { useProjectStore } from "../../../../../stores/ProjectStore";

export default function AddCookie({ setIsAdding }) {
    const [newCookie, setNewCookie] = useState(new Cookie())
    const containerRef = useRef(null)
    const cookies = useProjectStore(store => store.cookies)
    const [newCookieRaw, setNewCookieRaw] = useState("")
    const updateCookies = useProjectStore(store => store.updateCookies)


    const formatDateForInput = (strDate) => {
        const date = new Date(strDate)
        if (!date || date === "Infinity") return "";

        const pad = (n) => String(n).padStart(2, "0");

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

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
            newCookie={newCookie}
            setNewCookie={setNewCookie}
            setNewCookieRaw={setNewCookieRaw}
            field={"key"}
        />
        <CookieField
            field={"value"}
            placeholder={"Value"}
            value={newCookie.value}
            setNewCookieRaw={setNewCookieRaw}
            setNewCookie={setNewCookie}
            newCookie={newCookie}
        />
        <CookieField
            field={"domain"}
            placeholder={"Domain"}
            value={newCookie.domain}
            setNewCookieRaw={setNewCookieRaw}
            setNewCookie={setNewCookie}
            newCookie={newCookie}
        />
        <CookieField
            field={"path"}
            placeholder={"Path"}
            value={newCookie.path}
            setNewCookieRaw={setNewCookieRaw}
            setNewCookie={setNewCookie}
            newCookie={newCookie}
        />
        <CookieField
            field={"expires"}
            placeholder={"Expires"}
            value={formatDateForInput(newCookie.expires)}
            setNewCookieRaw={setNewCookieRaw}
            setNewCookie={setNewCookie}
            newCookie={newCookie}
            type={"datetime-local"}
        />

        <div className="add-cookie-form_btn-container">
            <Button onClick={handleAddCookie} text={"Add"} icon={<Plus />}></Button>
            <Button background={"var(--destructive)"} onClick={() => setIsAdding(false)} text={"Cancel"} icon={<X />}></Button>
        </div>
        <p>{newCookieRaw}</p>
    </div>
}
