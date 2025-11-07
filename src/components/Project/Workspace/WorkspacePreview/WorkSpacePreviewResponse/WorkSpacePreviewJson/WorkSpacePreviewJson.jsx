import "./WorkSpacePreviewJson.css";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../../Global/LoaderSpiner/LoaderSpiner";
import { useEffect, useRef } from "react";
import {
  addMonacoThemes,
  registerMonacoHover,
} from "../../../../../../utils/monaco/monacoHover";
import { useUserConfigStore } from "../../../../../../stores/UserConfigStore";
import { fileContentDefault } from "../../../../../../utils/constants/ProjectFileConstants";
import { useProjectStore } from "../../../../../../stores/ProjectStore";

export default function WorkSpacePreviewJson() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const addFile = useProjectStore((store) => store.addFile);
  const currentFileId = useProjectStore((store) => store.currentFileId);

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

      console.log("Adding new file with URL:", callUrl);
      addFile(currentFileId, {
        ...fileContentDefault,
        url: {
          ...fileContentDefault.url,
          inputUrl: callUrl,
          parseUrl: callUrl,
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
  };

  const handleBeforeMount = (monaco) => {
    addMonacoThemes(monaco);
  };

  return (
    <div ref={containerRef} className="json-preview_container">
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
          onMount={(editor, monaco) => handleOnEditorMount(editor, monaco)}
          beforeMount={(monaco) => {
            handleBeforeMount(monaco);
          }}
          theme={config.preferences.appearance.editorTheme || "vs-dark"}
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
    </div>
  );
}
