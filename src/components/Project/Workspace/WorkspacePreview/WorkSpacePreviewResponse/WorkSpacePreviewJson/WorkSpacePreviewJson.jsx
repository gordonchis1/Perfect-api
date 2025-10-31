import "./WorkSpacePreviewJson.css";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../../Global/LoaderSpiner/LoaderSpiner";
import { useEffect, useRef } from "react";

export default function WorkSpacePreviewJson() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const hoverRef = useRef(null);
  const onDidDisposeDispRef = useRef(null);

  function esImagenURL(url) {
    return /\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i.test(url);
  }

  function reemplazarTamañoEnURL(url, width, height) {
    if (typeof url !== "string") return url;

    const patrones = [
      { regex: /\{w\}x\{h\}/gi, reemplazo: `${width}x${height}` },
      {
        regex: /=[wh](\d+)(-[wh](\d+))?/gi,
        reemplazo: `=w${width}-h${height}`,
      },
      { regex: /=s\d+/gi, reemplazo: `=s${Math.max(width, height)}` },
      { regex: /__w-\d+__/gi, reemplazo: `__w-${width}__` },
      { regex: /\{width\}x\{height\}/gi, reemplazo: `${width}x${height}` },
      { regex: /\{w\}/gi, reemplazo: `${width}` },
      { regex: /\{h\}/gi, reemplazo: `${height}` },
    ];

    let nuevaURL = url;
    for (const { regex, reemplazo } of patrones) {
      nuevaURL = nuevaURL.replace(regex, reemplazo);
    }

    return nuevaURL;
  }

  const handleOnEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    if (hoverRef.current) {
      hoverRef.current.dispose();
      hoverRef.current = null;
    }

    const hover = monaco.languages.registerHoverProvider("json", {
      provideHover: function (model, position) {
        const content = model.getLineContent(position.lineNumber);
        const col = position.column;
        let startCol = col;
        let endCol = col;
        let range = {};

        while (startCol > 1 && content[startCol - 2] !== '"') {
          startCol--;
        }

        if (content[startCol - 2] === '"') {
          while (endCol <= content.length && content[endCol - 1] !== '"') {
            endCol++;
          }
          if (endCol <= content.length && content[endCol - 1] === '"') {
            range = {
              startLineNumber: position.lineNumber,
              startColumn: startCol,
              endLineNumber: position.lineNumber,
              endColumn: endCol,
            };
          }
        } else {
          return;
        }
        const text = model.getValueInRange(range);

        try {
          new URL(text);

          if (esImagenURL(text)) {
            return {
              contents: [
                {
                  supportHtml: true,
                  value: `<img src="${reemplazarTamañoEnURL(
                    text,
                    200,
                    200
                  )}" style="max-width: 200px; max-height:200px;"></img>`,
                },
              ],
            };
          } else {
            return {
              contents: [{ value: "# Es url " }],
            };
          }
        } catch {
          return;
        }
      },
    });

    hoverRef.current = hover;

    if (onDidDisposeDispRef.current) {
      onDidDisposeDispRef.current.dispose();
      onDidDisposeDispRef.current = null;
    }
    onDidDisposeDispRef.current = editor.onDidDispose(() => {
      if (hoverRef.current) {
        hoverRef.current.dispose();
        hoverRef.current = null;
      }
      editorRef.current = null;
      if (onDidDisposeDispRef.current) {
        onDidDisposeDispRef.current.dispose();
        onDidDisposeDispRef.current = null;
      }
    });
  };

  useEffect(() => {
    return () => {
      if (onDidDisposeDispRef.current) {
        try {
          onDidDisposeDispRef.current.dispose();
        } catch {}
        onDidDisposeDispRef.current = null;
      }

      if (hoverRef.current) {
        try {
          hoverRef.current.dispose();
        } catch {}
        hoverRef.current = null;
      }

      if (editorRef.current) {
        try {
          editorRef.current.dispose();
        } catch {}
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {workspacePreviewContext.responses.length > 0 && (
        <Editor
          loading={<LoaderSpiner size={"70px"} />}
          height={"100%"}
          defaultLanguage="json"
          value={JSON.stringify(
            workspacePreviewContext.responses[
              workspacePreviewContext.currentResponseIdx
            ].response,
            null,
            2
          )}
          onMount={handleOnEditorMount}
          theme="vs-dark"
          options={{
            definitionLinkOpensInPeek: true,
            links: true,
            automaticLayout: true,
            hover: true,
            wordWrap: "on",
            wordWrapColumn: 60,
            readOnly: true,
            fontSize: 16,
            minimap: { enabled: false },
          }}
        />
      )}
    </>
  );
}
