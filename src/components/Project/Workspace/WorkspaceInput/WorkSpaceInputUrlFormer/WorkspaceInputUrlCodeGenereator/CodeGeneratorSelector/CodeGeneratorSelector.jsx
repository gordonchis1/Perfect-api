import "./CodeGeneratorSelector.css";
import { useState, useRef } from "react";
import useClickAway from "../../../../../../../Hooks/useClickAway";
import { ChevronDown } from "lucide-react";

export default function CodeGeneratorSelector({
  currentValue,
  onChange,
  items,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const optionsContainerRef = useRef(null);
  useClickAway(optionsContainerRef, () => setIsOpen(false));

  const handleOnChange = (newValue) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="code-generator_selector-container">
      {currentValue && (
        <button
          onClick={() => setIsOpen(true)}
          className="code-generator_selector-current-btn"
        >
          <span> {currentValue.title}</span>
          <ChevronDown size={20} />
        </button>
      )}
      {items && isOpen && (
        <div
          className="code-generator_options-container custom-scroll-bar"
          ref={optionsContainerRef}
        >
          {items.map((item) => {
            return (
              <button
                className="code-generator-selector_option-btn"
                onClick={() => handleOnChange(item)}
                key={item.key}
                style={
                  item == currentValue
                    ? {
                        border: "1px solid var(--primary)",
                        background: "var(--primary-transparent)",
                        color: "var(--primary)",
                      }
                    : {}
                }
              >
                {item.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
