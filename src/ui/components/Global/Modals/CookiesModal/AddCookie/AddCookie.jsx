import { useState } from "react";
import Input from "../../../Input/Input";
import { Cookie } from "tough-cookie";
import { Plus } from "lucide-react";

export default function AddCookie() {
    const [newCookie, setNewCookie] = useState(new Cookie())
    const [newCookieRaw, setNewCookieRaw] = useState("")


    const handleChange = (event, input) => {
        let value = event.target.value

        const updatedCookie = newCookie.clone()
        if (input == "expires") {
            const date = new Date(event.target.value)

            if (isNaN(date.getTime())) return;
            updatedCookie.setExpires(date)
        } else {

            updatedCookie[input] = value
        }
        setNewCookie(updatedCookie)
        setNewCookieRaw(updatedCookie.toString())

    }
    const formatDateForInput = (strDate) => {
        const date = new Date(strDate)
        if (!date || date === "Infinity") return "";

        const pad = (n) => String(n).padStart(2, "0");

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };
    const handleAddCookie = (event) => {
        event.preventDefault()


        console.log("dd")
    }

    return <div className="add-cookie_container">
        <div>
            <Input placeholder={"key"} value={newCookie.key} onChange={(event) => { handleChange(event, "key") }} />
            <Input placeholder={"value"} value={newCookie.value} onChange={(event) => { handleChange(event, "value") }} />
            <Input placeholder={"domain"} value={newCookie.domain} onChange={event => handleChange(event, 'domain')} />
            <Input placeholder={"path"} value={newCookie.path} onChange={event => { handleChange(event, "path") }} />
            <Input placeholder={"expires"} type={"datetime-local"} value={formatDateForInput(newCookie.expires)} onChange={event => handleChange(event, "expires")} />
            <button onClick={handleAddCookie}>Add <Plus /></button>
        </div>
        <p>{newCookieRaw}</p>
    </div>
}
