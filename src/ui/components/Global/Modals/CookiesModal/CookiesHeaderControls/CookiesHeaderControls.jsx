import { CookieJar } from "tough-cookie"
import { useProjectStore } from "../../../../../stores/ProjectStore"
import Button from "../../../Button/Button"
import "./CookiesHeaderControls.css"
import { Plus, Trash2 } from "lucide-react"

export default function CookiesHeaderControls() {
    const updateCookies = useProjectStore(store => store.updateCookies)
    const handleDelateAll = () => {
        const newJar = new CookieJar()
        const jsonJar = newJar.toJSON()
        updateCookies(jsonJar)
    }
    const handleAddCookie = () => {
        // pass 
    }


    return <div className="cookies-header-controls_container">
        <Button
            text={"Add cookie"}
            onClick={handleAddCookie}
            icon={<Plus size={17} />}
        />
        <Button
            onClick={handleDelateAll}
            text={"Delate All"}
            icon={<Trash2 size={17} />}
            className={"delate-btn"}
            color="var(--destructive)"
            background="transparent"
        />
    </div>
}
