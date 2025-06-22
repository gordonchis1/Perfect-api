import { useRef } from "react";
import "./PopUp.css";
import useClickAway from "../../../Hooks/useClickAway";

export default function PopUp({ children, closeFunction }) {
  const contentContainerRef = useRef(null);
  useClickAway(contentContainerRef, closeFunction);

  return (
    <div className="popup-container">
      <div className="popup_content-container" ref={contentContainerRef}>
        {children}
      </div>
    </div>
  );
}
