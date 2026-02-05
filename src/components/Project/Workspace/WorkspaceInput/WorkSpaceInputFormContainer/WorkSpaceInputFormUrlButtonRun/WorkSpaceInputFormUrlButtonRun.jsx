import "./WorkSpaceInputFormUrlButtonRun.css";
import { Play } from "lucide-react";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import { File } from "../../../../../../utils/ProjectFileObject";

export default function WorkSpaceInputFormUrlButtonRun() {
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );
  const fileManagerState = useProjectStore((store) => store.vfs);

  const handleRun = async () => {
    if (!content.url.finalUrl) return;
    if (content.isRunning) return;

    const node = fileManagerState.getNodeById(currentFileId);
    if (node instanceof File) {
      await node.run();
    }
  };

  return (
    <button
      className="workspace-input-form_run-button "
      onClick={handleRun}
      disabled={content.isRunning}
      style={{
        background: content.isRunning ? "var(--primary-transparent)" : "",
        cursor: content.isRunning ? "not-allowed" : "",
        color: content.isRunning ? "var(--muted-foreground)" : "",
      }}
    >
      <Play size={16} />
      Send
    </button>
  );
}
