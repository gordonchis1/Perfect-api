import "./WorkSpacePreviewJson.css";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../../Global/LoaderSpiner/LoaderSpiner";
import { useEffect, useRef } from "react";
import { handleOnEditorMount } from "../../../../../../utils/monacoHover";
import { useUserConfigStore } from "../../../../../../stores/UserConfigStore";

export default function WorkSpacePreviewJson() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const config = useUserConfigStore((state) => state.config);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const hoverRef = useRef(null);
  const onDidDisposeDispRef = useRef(null);
  console.log(config.preferences.appearance.editorTheme);

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
          onMount={(editor, monaco) =>
            handleOnEditorMount(
              editor,
              monaco,
              editorRef,
              monacoRef,
              onDidDisposeDispRef,
              hoverRef
            )
          }
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
    </>
  );
}
