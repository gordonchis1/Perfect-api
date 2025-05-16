import { useContext } from "react";
import { FilesContext } from "../providers/FilesProvider/FilesProvider";

export default function useFilesContext() {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error("useFiles must be used within a <FilesProvider>");
  }
  return context;
}
