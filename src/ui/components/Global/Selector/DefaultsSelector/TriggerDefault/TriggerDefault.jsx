import { ChevronDown } from "lucide-react";
import "./TriggerDefault.css";

export default function TriggerDefault({ label, isOpen, ...props }) {
  return (
    <button className="trigger-default_button" {...props}>
      <span>{label}</span>
      <ChevronDown size={20} className={isOpen ? "trigger-icon-open" : ""} />
    </button>
  );
}
