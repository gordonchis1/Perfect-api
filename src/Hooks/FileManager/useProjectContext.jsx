import { useContext } from "react";
import { projectContext } from "../../providers/Project/ProjectProvider";

export default function useProjectContext() {
  const context = useContext(projectContext);

  if (!context) {
    throw new Error(
      "useProjectContext must be used within a <projectProvider>"
    );
  }
  return context;
}
