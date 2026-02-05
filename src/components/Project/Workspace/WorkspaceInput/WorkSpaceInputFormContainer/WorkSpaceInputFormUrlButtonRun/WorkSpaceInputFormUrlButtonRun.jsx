import "./WorkSpaceInputFormUrlButtonRun.css";
import { Play } from "lucide-react";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import { File } from "../../../../../../utils/ProjectFileObject";

export default function WorkSpaceInputFormUrlButtonRun() {
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );
  const openFiles = useProjectStore((store) => store.openFiles);
  const fileManagerState = useProjectStore((store) => store.vfs);

  const handleRun = async () => {
    if (!content.url.finalUrl) return;

    const node = fileManagerState.getNodeById(currentFileId);
    if (node.content.isRunning) return;

    if (node instanceof File) {
      await node.run();
    }
  };

  return (
    <button
      className="workspace-input-form_run-button "
      onClick={handleRun}
      disabled={openFiles[currentFileId].isRunning}
      style={{
        background: openFiles[currentFileId].isRunning
          ? "var(--primary-transparent)"
          : "",
        cursor: openFiles[currentFileId].isRunning ? "not-allowed" : "",
        color: openFiles[currentFileId].isRunning
          ? "var(--muted-foreground)"
          : "",
      }}
    >
      <Play size={16} />
      Send
    </button>
  );
}
