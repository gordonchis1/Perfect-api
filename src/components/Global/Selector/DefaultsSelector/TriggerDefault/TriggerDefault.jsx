import { ChevronDown } from "lucide-react";
import "./TriggerDefault.css";

export default function TriggerDefault({ label, isOpen }) {
  return (
    <button className="trigger-default_button">
      <span>{label}</span>
      <ChevronDown size={20} className={isOpen ? "trigger-icon-open" : ""} />
    </button>
  );
}
