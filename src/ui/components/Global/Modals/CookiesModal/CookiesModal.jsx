import { Cookie } from "lucide-react";
import "./CookiesModal.css"
import CookiesHeaderControls from "./CookiesHeaderControls/CookiesHeaderControls";
import CookiesTable from "./CookiesTable/CookiesTable";

export default function CookiesModal() {

    return <div className="cookies-modal_container">
        <div className="cookies-modal_title">
            <p>Cookies</p><Cookie size={22} />
        </div>
        <CookiesHeaderControls />
        <CookiesTable />
    </div>
}
