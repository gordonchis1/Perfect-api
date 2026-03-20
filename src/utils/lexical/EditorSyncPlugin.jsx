import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $isTextNode } from "lexical";
import { useEffect } from "react";
import { $isVariableNode } from "./variableNode";
import { useProjectStore } from "../../stores/ProjectStore";
import { File, VirtualFileSystem } from "../ProjectFileObject";

function buildString(node) {
  const projectState = useProjectStore.getState();
  const currentFileId = projectState.currentFileId;
  const vfs = projectState.vfs;
  let variables = undefined;

  if (vfs instanceof VirtualFileSystem) {
    const currentFile = vfs.getNodeById(currentFileId);
    if (currentFile instanceof File) {
      const parent = vfs.getParentNode(currentFile);
      variables = parent.dirConfig.variables;
    }
  }

  if ($isTextNode(node)) {
    if ($isVariableNode(node) && variables !== undefined) {
      return node.__value || "";
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
        if (!currentFileId) return;

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
