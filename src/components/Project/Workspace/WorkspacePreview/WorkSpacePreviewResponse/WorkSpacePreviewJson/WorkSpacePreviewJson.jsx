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

  const processImgUrl = (url, width, height) => {
    const w = width.toString();
    const h = height.toString();

    if (url.includes("{w}") && url.includes("{h}")) {
      return url.replace("{w}", w).replace("{h}", h);
    }

    if (url.includes("?")) {
      const urlObj = new URL(url);
      if (urlObj.searchParams.has("w") || urlObj.searchParams.has("width")) {
        urlObj.searchParams.set("w", w);
        urlObj.searchParams.set("width", w);
      }
      if (urlObj.searchParams.has("h") || urlObj.searchParams.has("height")) {
        urlObj.searchParams.set("h", h);
        urlObj.searchParams.set("height", h);
      }
      return urlObj.toString();
    }

    const resizeRegex = /\/resize\/\d+x\d+\//;
    if (resizeRegex.test(url)) {
      return url.replace(resizeRegex, `/resize/${w}x${h}/`);
    }

    if (!url.includes("?")) {
      return `${url}?w=${w}&h=${h}`;
    }

    return url;
  };

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
        >
          <JsonView.String
            render={({ ...rest }, { type, value }) => {
              const isImage = /^https?.*\.(jpg|png)$/i.test(value);

              if (type === "type" && isImage) {
                return <span />;
              }

              if (type === "value" && isImage) {
                return (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span {...rest}>"{value}"</span>
                    <img
                      src={processImgUrl(value, 40, 40)}
                      height={"40"}
                      width={"40"}
                    />
                  </div>
                );
              }
            }}
          ></JsonView.String>
        </JsonView>
      )}
    </div>
  );
}
