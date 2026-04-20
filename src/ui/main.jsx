import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router";

createRoot(document.getElementById("root")).render(
    <HashRouter>
        <App />
    </HashRouter>,
);
