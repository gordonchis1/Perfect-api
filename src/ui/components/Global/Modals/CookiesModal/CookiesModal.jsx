import { Cookie } from "lucide-react";
import "./CookiesModal.css"
import CookiesHeaderControls from "./CookiesHeaderControls/CookiesHeaderControls";
import CookiesTable from "./CookiesTable/CookiesTable";
import { useState } from "react";
import AddCookie from "./AddCookie/AddCookie";

export default function CookiesModal() {
    const [isAdding, setIsAdding] = useState(false)

    return <div className="cookies-modal_container">
        <div className="cookies-modal_title">
            <p>Cookies</p><Cookie size={22} />
        </div>
        <CookiesHeaderControls setIsAdding={setIsAdding} />
        {isAdding && <AddCookie />}
        <CookiesTable />
    </div>
}
