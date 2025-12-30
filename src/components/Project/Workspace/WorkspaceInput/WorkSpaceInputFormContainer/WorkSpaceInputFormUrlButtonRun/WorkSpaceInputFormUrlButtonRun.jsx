import "./WorkSpaceInputFormUrlButtonRun.css";
import { Play } from "lucide-react";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import { File } from "../../../../../../utils/ProjectFileObject";

export default function WorkSpaceInputFormUrlButtonRun() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const currnetFileId = useProjectStore((store) => store.currentFileId);
  const fileManagerState = useProjectStore((store) => store.vfs);

  const handleRun = async () => {
    if (!content.url.parseUrl) return;
    if (content.isRuning) return;

    const node = fileManagerState.getNodeById(currnetFileId);
    if (node instanceof File) {
      node.run();
    }
  };

  return (
    <button
      className="workspace-input-form_run-button "
      onClick={handleRun}
      disabled={content.isRuning}
      style={{
        background: content.isRuning ? "var(--primary-transparent)" : "",
        cursor: content.isRuning ? "not-allowed" : "",
        color: content.isRuning ? "var(--muted-foreground)" : "",
      }}
    >
      <Play size={16} />
      Send
    </button>
  );
}
