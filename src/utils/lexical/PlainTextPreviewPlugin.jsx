import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $isTextNode } from "lexical";
import { useEffect } from "react";
import { $isVariableNode, testDic } from "./variableNode";

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

export default function PlainTextPreviewPlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.read(() => {
        const root = $getRoot();
        const response = buildString(root);
        onChange(response);
      });
    });
  }, [editor]);

  return null;
}
