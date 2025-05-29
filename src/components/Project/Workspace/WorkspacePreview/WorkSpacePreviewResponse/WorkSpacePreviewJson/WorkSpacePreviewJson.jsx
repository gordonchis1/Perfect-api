import "./WorkSpacePreviewJson.css";
import JsonView from "@uiw/react-json-view";
import { githubDarkTheme } from "../../../../../../utils/constants/jsonRenderThemes";
import { useEffect, useRef, useState } from "react";

export default function WorkSpacePreviewJson({
  responses,
  currentResponseIdx,
}) {
  const jsonPreviewContainerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (jsonPreviewContainerRef.current) {
        const measuredHeight = jsonPreviewContainerRef.current.offsetHeight;
        setHeight(measuredHeight);
        setReady(true);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="workspace-preview-response_json-preview-container"
      ref={jsonPreviewContainerRef}
    >
      {ready && (
        <JsonView
          value={responses[currentResponseIdx].response}
          style={{
            borderRadius: "7px",
            fontSize: "20px",
            maxHeight: "100%",
            overflowY: "scroll",
            height: `${height}px`,
            ...githubDarkTheme,
          }}
        />
      )}
    </div>
  );
}
