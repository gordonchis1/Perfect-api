import { useEffect, useRef, useState } from "react";
import "./WorkspacePreviewLoading.css";
import LoaderSpiner from "../../../../Global/LoaderSpiner/LoaderSpiner";

export default function WorkspacePreviewLoading({ url, isRuning }) {
  const [time, setTime] = useState(0);

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

  return (
    <div className="workspace-preview_loading-container">
      <LoaderSpiner size={"60px"} />
      <div className="preview-loading_content">
        <h2>{url}</h2>
        <p className="preview-loading_timer">
          <span>Envinado peticion:</span> <span>{time}ms</span>
        </p>
      </div>
    </div>
  );
}
