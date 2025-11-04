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
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import {
  File,
  VirtualFileSystem,
} from "../../../../../../utils/ProjectFileObject";
import { fileContentDefault } from "../../../../../../utils/constants/ProjectFileConstants";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import useProjectContext from "../../../../../../Hooks/FileManager/useProjectContext";

export default function WorkSpacePreviewJson() {
  const { id } = useProjectContext();
  const [filesContext] = useFilesContext();
  const [filemanagerContext, filemanagerDispatch] = useFileManagerContext();
  const [workspacePreviewContext] = useWorkspacePreviewContext();
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

      if (filemanagerContext instanceof VirtualFileSystem) {
        const node = filemanagerContext.getNodeById(filesContext.currentFile);
        const parent = filemanagerContext.getParentNode(node);
        const path = filemanagerContext.getAbsolutePath(parent);

        filemanagerDispatch({
          type: FILEMANAGER_REDUCER_ACTIONS.addFile,
          payload: {
            id,
            path: path,
            content: {
              ...fileContentDefault,
              url: {
                ...fileContentDefault.url,
                inputUrl: callUrl,
                parseUrl: callUrl,
              },
            },
          },
        });
      }
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
