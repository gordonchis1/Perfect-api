import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";
import { textNodeTransform } from "./transformVariableNode";
import { useEffect } from "react";

export default function VariablePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerNodeTransform(TextNode, textNodeTransform);
  }, [editor]);

  return null;
}
