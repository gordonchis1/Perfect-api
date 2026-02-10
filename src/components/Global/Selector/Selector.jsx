import { useContext, createContext, useState, useRef } from "react";
import useClickAway from "../../../Hooks/useClickAway";

const SelectorContext = createContext({
  value: null,
  onChange: () => {},
  isOpen: false,
});

const useSelectorContext = () => {
  const context = useContext(SelectorContext);
  if (!context) {
    throw new Error("useSelectorContext must be used within a Selector");
  }
  return context;
};

export default function Selector({ value, onChange, children }) {
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
      <div ref={containerRef}>{children}</div>
    </SelectorContext.Provider>
  );
}

Selector.Trigger = function Trigger({ children }) {
  const { isOpen, toggleOpen, value } = useSelectorContext();

  return (
    <button onClick={toggleOpen}>
      {typeof children == "function"
        ? children({ selected: value, isOpen })
        : children}
    </button>
  );
};

Selector.Options = function Options({ children }) {
  const { isOpen } = useSelectorContext();
  return <>{isOpen && <div>{children}</div>}</>;
};

Selector.Option = function Option({ value, label }) {
  const { onChange } = useSelectorContext();
  return <button onClick={() => onChange(value)}>{label}</button>;
};
