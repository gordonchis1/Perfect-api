import { useContext } from "react";
import { WorkSpaceContentContext } from "../../providers/WorkSpaceContent/WorkSpaceContentProvider";

export default function useWorkSpaceContentContext() {
  const context = useContext(WorkSpaceContentContext);

  if (!context) {
    throw new Error(
      "useWorkSpaceContentContext must be used within a <WorkSpaceContentProvider/>"
    );
  }
  return context;
}
