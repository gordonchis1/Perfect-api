// ? Provadier for update open files content

import { createContext, useReducer } from "react";
import filesReducer from "./reducer";

export const filesContext = createContext([]);

export default function FilesProvider({ children }) {
  const [state, dispatch] = useReducer(filesReducer, []);

  return (
    <filesContext.Provider value={state}>{children}</filesContext.Provider>
  );
}
