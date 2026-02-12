import "./Selector.css";
import { useState, useRef } from "react";
import useClickAway from "../../../Hooks/useClickAway";
import OptionDefault from "./DefaultsSelector/OptionDefault/OptionDefault";
import { SelectorContext, useSelectorContext } from "./SelectorContext";
import TriggerDefault from "./DefaultsSelector/TriggerDefault/TriggerDefault";

export default function Selector({
  value,
  onChange,
  children,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  useClickAway(containerRef, () => setIsOpen(false));

  const handleSelect = (val, keyVal) => {
    onChange?.(val, keyVal || null);
    setIsOpen(false);
  };

  return (
    <SelectorContext.Provider
      value={{
        value,
        onChange: handleSelect,
        isOpen,
        toggleOpen: () => setIsOpen(!isOpen),
      }}
    >
      <div className={`selector_container ${className}`} ref={containerRef}>
        {children}
      </div>
    </SelectorContext.Provider>
  );
}

Selector.Trigger = function Trigger({ children, label = null }) {
  const { isOpen, toggleOpen, value } = useSelectorContext();

  let content;
  if (typeof children === "function") {
    content = children({ selected: value, isOpen });
  } else if (children) {
    content = children;
  } else {
    content = <TriggerDefault label={label} isOpen={isOpen} />;
  }

  return <div onClick={toggleOpen}>{content}</div>;
};

Selector.Options = function Options({ children, className = "", ...props }) {
  const { isOpen } = useSelectorContext();
  return (
    <>
      {isOpen && (
        <div className={`${className} selector_options-container`} {...props}>
          {children}
        </div>
      )}
    </>
  );
};

Selector.Option = function Option({ value, children, label = null }) {
  const { onChange, value: selectedValue } = useSelectorContext();

  let content;
  if (typeof children === "function") {
    content = children({
      selected: value,
      isSelected: value === selectedValue,
    });
  } else if (children) {
    content = children;
  } else {
    content = (
      <OptionDefault label={label} isSelected={value == selectedValue} />
    );
  }

  return <div onClick={() => onChange(value)}>{content}</div>;
};
