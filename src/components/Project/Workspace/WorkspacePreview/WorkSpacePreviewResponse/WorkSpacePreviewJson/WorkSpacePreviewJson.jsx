import "./WorkSpacePreviewJson.css";
import JsonView from "@uiw/react-json-view";
import { githubDarkTheme } from "../../../../../../utils/constants/jsonRenderThemes";
import { useEffect, useRef, useState } from "react";
import WorkspacePreviewJsonStringComponent from "./WorkspacePreviewJsonStringImageComponent/WorkspacePreviewJsonStringImageComponent";
import WorkspacePreviewJsonStringUrlComponent from "./WorkspacePreviewJsonStringUrlComponent/WorkspacePreviewJsonStringUrlComponent";

// TODO: agregar un tema custom para json preview

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
          displayDataTypes={false}
          style={{
            borderRadius: "7px",
            fontSize: "20px",
            maxHeight: "100%",
            overflowY: "scroll",
            height: `${height}px`,
            ...githubDarkTheme,
          }}
        >
          <JsonView.String
            render={({ ...rest }, { type, value }) => {
              const isImage = /^https?.*\.(jpg|png)$/i.test(value);
              let isUrl;

              try {
                new URL(value);
                isUrl = true;
              } catch {
                isUrl = false;
              }

              if (type === "type" && isImage) {
                return <span />;
              }

              if (type === "value" && isImage) {
                return (
                  <WorkspacePreviewJsonStringComponent
                    rest={rest}
                    value={value}
                  />
                );
              }

              if (type === "value" && !isImage && isUrl) {
                return (
                  <WorkspacePreviewJsonStringUrlComponent
                    value={value}
                    rest={rest}
                  />
                );
              }
            }}
          ></JsonView.String>
        </JsonView>
      )}
    </div>
  );
}
