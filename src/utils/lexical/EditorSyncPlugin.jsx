import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useEffect } from "react";
import { useProjectStore } from "../../stores/ProjectStore";
import { buildString } from "./buildString";
import { buildQueryParams } from "../buildQueryParams";

export default function EditorSyncPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState, tags }) => {
      if (tags.has("hydrate")) return;
      editor.read(() => {
        const root = $getRoot();
        let finalString = buildString(root);
        const store = useProjectStore.getState();
        const currentFileId = store.currentFileId;
        const updateContentOfOpenFile = store.updateContentOfOpenFile;
        const content = store.openFiles[currentFileId]?.content;
        const json = editor.toJSON();
        if (!currentFileId) return;

        const queryParamsStr = buildQueryParams(content?.url?.queryParams);

        try {
          const url = new URL(finalString);
          url.search = queryParamsStr;
          finalString = url.toString();
        } catch {
          if (finalString.length != 0) {
            finalString = finalString + "?" + queryParamsStr;
          }
        }

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
