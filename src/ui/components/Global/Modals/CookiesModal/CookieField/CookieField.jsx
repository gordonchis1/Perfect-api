import Input from "../../../Input/Input"
import "./CookieField.css"

export default function CookieField({ value, field, placeholder, cookie, setCookie, setCookieRaw, type = "input" }) {
    const handleChange = (event, input) => {
        let value = event.target.value

        const updatedCookie = cookie.clone()
        if (input == "expires") {
            const date = new Date(event.target.value)

            if (isNaN(date.getTime())) return;
            updatedCookie.setExpires(date)
        } else {

            updatedCookie[input] = value
        }
        setCookie(updatedCookie)
        setCookieRaw(updatedCookie.toString())
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
