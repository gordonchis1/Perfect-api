import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useProjectStore } from "../../stores/ProjectStore";
import { $getRoot } from "lexical";

export default function EditorInitializerPlugin() {
  const [editor] = useLexicalComposerContext();

  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );

  useEffect(() => {
    if (!editor) return;

    try {
      if (!content?.url?.inputUrl?.editorState) {
        throw new Error("No input url");
      }
      const editorState = editor.parseEditorState(
        content.url.inputUrl.editorState,
      );
      editor.setEditorState(editorState, { tag: "hydrate" });
    } catch {
      editor.update(
        () => {
          const root = $getRoot();

          root.clear();
        },
        { tag: "hydrate" },
      );
    }
  }, [editor, currentFileId]);

  return null;
}
