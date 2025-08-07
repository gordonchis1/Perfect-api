import { createContext, useReducer } from "react";
import { docsReducer } from "./reducer";

export const DocsContext = createContext();

export default function DocsProvider({ children }) {
  const [state, dispatch] = useReducer(docsReducer, "Hoal mundo");

  return (
    <DocsContext.Provider value={[state, dispatch]}>
      {children}
    </DocsContext.Provider>
  );
}
