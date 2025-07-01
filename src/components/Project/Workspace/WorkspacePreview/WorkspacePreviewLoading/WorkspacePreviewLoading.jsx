import { useEffect, useRef, useState } from "react";
import "./WorkspacePreviewLoading.css";

export default function WorkspacePreviewLoading({ url, isRuning }) {
  const [time, setTime] = useState(0);

  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  const updateTime = () => {
    if (startTimeRef.current !== null) {
      const now = performance.now();
      setTime(now - startTimeRef.current);
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
    <h1>
      Loading... {url} {time}
    </h1>
  );
}
