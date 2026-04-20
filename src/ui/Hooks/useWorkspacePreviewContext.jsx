import { useContext } from "react";
import { WorkSpacePreviewContext } from "../providers/WorkspacePreview/WorkSpacePreviewProvider";

export default function useWorkspacePreviewContext() {
  const context = useContext(WorkSpacePreviewContext);

  if (!context) {
    throw new Error(
      "useWorkspacePreviewContext must be used within a <WorkSpacePreviewProvider>"
    );
  }
  return context;
}
