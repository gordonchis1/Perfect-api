// ? Provadier for update open files and file content
import { useReducer, createContext } from "react";
import filesReducer from "./reducer";

export const FilesContext = createContext([]);
export const filesContextDefaulttValue = {
  currentFile: "",
  openFiles: [],
};

export default function FilesProvider({ children }) {
  const [state, dispatch] = useReducer(filesReducer, filesContextDefaulttValue);

  return (
    <FilesContext.Provider value={[state, dispatch]}>
      {children}
    </FilesContext.Provider>
  );
}
