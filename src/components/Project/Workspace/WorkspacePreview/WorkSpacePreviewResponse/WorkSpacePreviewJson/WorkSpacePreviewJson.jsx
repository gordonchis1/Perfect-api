import "./WorkSpacePreviewJson.css";
import JsonView from "@uiw/react-json-view";
import { githubDarkTheme } from "../../../../../../utils/constants/jsonRenderThemes";
import { useEffect, useRef, useState } from "react";

// tODO: arrelar bug de height al inizialisar el componente
export default function WorkSpacePreviewJson({
  responses,
  currentResponseIdx,
}) {
  const jsonPreviewContainerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (jsonPreviewContainerRef.current) {
      setHeight(jsonPreviewContainerRef.current.offsetHeight);
    }
  }, [jsonPreviewContainerRef]);

  return (
    <div
      className="workspace-preview-response_json-preview-container"
      ref={jsonPreviewContainerRef}
    >
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
    </div>
  );
}
