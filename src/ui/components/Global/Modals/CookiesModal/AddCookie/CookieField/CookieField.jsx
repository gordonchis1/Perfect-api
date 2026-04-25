import Input from "../../../../Input/Input"
import "./CookieField.css"

export default function CookieField({ value, field, placeholder, newCookie, setNewCookie, setNewCookieRaw, type = "input" }) {
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


    return <div>
        <label className="cookie-field_label">{placeholder}</label>
        <Input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(event) => { handleChange(event, field) }} />
    </div>
}
