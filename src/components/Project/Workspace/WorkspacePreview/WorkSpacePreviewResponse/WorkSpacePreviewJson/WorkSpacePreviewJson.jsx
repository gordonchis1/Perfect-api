import "./WorkSpacePreviewJson.css";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../../Global/LoaderSpiner/LoaderSpiner";
import { useEffect, useRef, useState } from "react";
import {
  addMonacoThemes,
  registerMonacoHover,
} from "../../../../../../utils/monaco/monacoHover";
import { useUserConfigStore } from "../../../../../../stores/UserConfigStore";
import { fileContentDefault } from "../../../../../../utils/constants/ProjectFileConstants";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import useCurrentEntry from "../../../../../../Hooks/useCurrentEntry";

export default function WorkSpacePreviewJson() {
  const [line, setLine] = useState({
    startLineNumber: 1,
    startColumn: undefined,
    endLineNumber: undefined,
    endColumn: undefined,
  });
  const addFile = useProjectStore((store) => store.addFile);
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const currentEntry = useCurrentEntry();

  const config = useUserConfigStore((state) => state.config);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const hoverRef = useRef(null);
  const onDidDisposeDispRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a[data-href^='action/']");
      if (!link) return;

      e.preventDefault(); // evitar navegación
      const text = link.getAttribute("data-href");
      const url = new URL("https://perfectApi/" + text);
      const params = new URLSearchParams(url.search);
      const callUrl = params.get("url");

      if (!callUrl) return;

      addFile(currentFileId, {
        ...fileContentDefault,
        url: {
          ...fileContentDefault.url,
          inputUrl: callUrl,
          finalUrl: callUrl,
        },
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("click", handleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (onDidDisposeDispRef.current) {
        try {
          onDidDisposeDispRef.current.dispose();
        } catch {
          // ignore
        }
        onDidDisposeDispRef.current = null;
      }

      if (hoverRef.current) {
        try {
          hoverRef.current.dispose();
        } catch {
          // ignore
        }
        hoverRef.current = null;
      }

      if (editorRef.current) {
        try {
          editorRef.current.dispose();
        } catch {
          // ignore
        }
        editorRef.current = null;
      }
    };
  }, []);

  const handleOnEditorMount = (editor, monaco) => {
    registerMonacoHover(
      editor,
      monaco,
      editorRef,
      monacoRef,
      onDidDisposeDispRef,
      hoverRef
    );

    // const model = editor.getModel();

    // const response = model.findMatches(
    //   "https://rickandmortyapi.com/api/character/avatar/41.jpeg",
    //   false,
    //   false,
    //   false,
    //   null,
    //   false
    // )[0].range;
    // console.log(response);

    // setLine({ ...response });

    // const decoration = editor.createDecorationsCollection([
    //   {
    //     options: { inlineClassName: "editor-sub" },
    //     range: new monaco.Range(
    //       response.startLineNumber,
    //       response.startColumn,
    //       response.endLineNumber,
    //       response.endColumn
    //     ),
    //   },
    // ]);
  };

  const handleBeforeMount = (monaco) => {
    addMonacoThemes(monaco);
  };

  return (
    <div ref={containerRef} className="json-preview_container">
      {currentEntry?.response?.body?.raw && (
        <Editor
          loading={<LoaderSpiner size={"70px"} />}
          height={"100%"}
          defaultLanguage="json"
          value={JSON.stringify(
            currentEntry?.response?.body?.raw || "No Content",
            null,
            2
          )}
          onMount={(editor, monaco) => handleOnEditorMount(editor, monaco)}
          beforeMount={(monaco) => {
            handleBeforeMount(monaco);
          }}
          line={line.startLineNumber}
          theme={config.preferences.editor.editorTheme || "vs-dark"}
          options={{
            definitionLinkOpensInPeek: true,
            links: true,
            automaticLayout: true,
            hover: true,
            wordWrap: "on",
            wordWrapColumn: 60,
            readOnly: true,
            fontSize: config.preferences.editor.editorFontSize,
            minimap: {
              enabled: config.preferences.editor.editorMiniMap || false,
            },
            colorDecoratorsActivatedOn: "clickAndHover",
            colorDecorators: true,
            defaultColorDecorators: true,
          }}
        />
      )}
    </div>
  );
}
