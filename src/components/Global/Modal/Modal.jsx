import { useRef } from "react";
import useClickAway from "../../../Hooks/useClickAway";
import useModal from "../../../providers/ModalProvider/useModal";
import "./Modal.css";

export default function Modal({ children }) {
  const containerRef = useRef(null);
  const { close } = useModal();
  useClickAway(containerRef, close);

  return (
    <div className="modal_wrapper">
      <div className="modal_container" ref={containerRef}>
        {children}
      </div>
    </div>
  );
}
