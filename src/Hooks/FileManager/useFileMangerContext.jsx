import { useContext } from "react";
import { fileManagerContext } from "../../providers/FileManager/FileManagerProvider";

export default function useFileManagerContext() {
  const context = useContext(fileManagerContext);

  if (!context) {
    throw new Error(
      "useFileManager must be used within a <FileManagerProvider>"
    );
  }

  return context;
}
