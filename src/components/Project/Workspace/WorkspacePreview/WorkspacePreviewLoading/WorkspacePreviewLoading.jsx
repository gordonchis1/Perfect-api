import { useEffect, useRef, useState } from "react";
import "./WorkspacePreviewLoading.css";
import LoaderSpiner from "../../../../Global/LoaderSpiner/LoaderSpiner";
import { useProjectStore } from "../../../../../stores/ProjectStore";
import { File } from "../../../../../utils/ProjectFileObject";

export default function WorkspacePreviewLoading({ url, isRuning }) {
  const [time, setTime] = useState(0);
  const fileManagerState = useProjectStore((store) => store.vfs);
  const currentFileId = useProjectStore((store) => store.currentFileId);

  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  const updateTime = () => {
    if (startTimeRef.current !== null) {
      const now = performance.now();
      setTime(Math.round(now - startTimeRef.current));
      rafRef.current = requestAnimationFrame(updateTime);
    }
  };

  useEffect(() => {
    if (isRuning) {
      startTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(updateTime);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [isRuning]);

  const handleStop = () => {
    if (!isRuning) return;

    const node = fileManagerState.getNodeById(currentFileId);

    if (node instanceof File) {
      node.abort();
    }
  };

  return (
    <div className="workspace-preview_loading-container">
      <LoaderSpiner size={"60px"} />
      <div className="preview-loading_content">
        <h2>{url}</h2>
        <p className="preview-loading_timer">
          <span>Envinado peticion:</span> <span>{time}ms</span>
        </p>
        {isRuning && (
          <button className="preview-loading_stop-btn" onClick={handleStop}>
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
