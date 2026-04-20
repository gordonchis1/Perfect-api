import { createContext, useContext } from "react";

export const SelectorContext = createContext(null);

export const useSelectorContext = () => {
  const context = useContext(SelectorContext);
  if (context == null) {
    throw new Error("useSelectorContext must be used within a Selector");
  }
  return context;
};
