import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $isTextNode } from "lexical";
import { useEffect } from "react";
import { $isVariableNode, testDic } from "./variableNode";
import { useProjectStore } from "../../stores/ProjectStore";

function buildString(node) {
  if ($isTextNode(node)) {
    if ($isVariableNode(node)) {
      return testDic[node.__variable];
    }
    return node.getTextContent();
  }

  let result = "";
  const children = node.getChildren();

  for (const child of children) {
    result += buildString(child);
  }

  return result;
}

export default function EditorSyncPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState, tags }) => {
      if (tags.has("hydrate")) return;
      editor.read(() => {
        const root = $getRoot();
        const finalString = buildString(root);
        const store = useProjectStore.getState();
        const currentFileId = store.currentFileId;
        const updateContentOfOpenFile = store.updateContentOfOpenFile;
        const content = store.openFiles[currentFileId]?.content;
        const json = editor.toJSON();

        updateContentOfOpenFile(currentFileId, {
          ...content,
          url: {
            ...content.url,
            finalUrl: finalString,
            inputUrl: json,
          },
        });
      });
    });
  }, [editor]);

  return null;
}
