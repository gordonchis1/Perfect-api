import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useLexicalEditorStore } from "../../stores/LexicalEditorStore";

export default function EditorGlobalContextPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor) return;
    const lexicalEditorStore = useLexicalEditorStore.getState();
    const init = lexicalEditorStore.init;
    init(editor);
  }, [editor]);

  return null;
}
