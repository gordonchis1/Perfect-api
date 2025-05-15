import { useContext } from "react";
import { filesContext } from "../providers/FilesProvider/FilesProvider";

export default function useFilesContext() {
  const context = useContext(filesContext);

  if (!context) {
    throw new Error("useFiles must be used within a <FilesProvider>");
  }
  return context;
}
