import { $createRangeSelection, $getRoot, $setSelection } from "lexical";
import { create } from "zustand";
import { buildString } from "../utils/lexical/buildString";

export const useLexicalEditorStore = create((set, get) => ({
  editor: undefined,
  init: (editor) => {
    set({ editor });
  },
  delateAllQueryParams: () => {
    const editor = get().editor;
    if (editor) {
      editor.update(() => {
        const root = $getRoot();
        const currentString = buildString(root);

        const startQueryParamsidx = currentString.indexOf("?");
        if (startQueryParamsidx === -1) return;

        const textNodes = root.getAllTextNodes();

        let startNode = null;
        let offset = 0;

        for (const node of textNodes) {
          if (node.__text.includes("?")) {
            startNode = node;
            offset = node.__text.indexOf("?");
            break;
          }
        }

        if (!startNode) return;

        const selection = $createRangeSelection();

        selection.anchor.set(startNode.__key, offset, "text");

        const lastNode = textNodes[textNodes.length - 1];
        selection.focus.set(
          lastNode.__key,
          lastNode.getTextContentSize(),
          "text",
        );

        $setSelection(selection);
        selection.removeText();
      });
    }
  },
}));
