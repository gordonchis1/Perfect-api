import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";
import { textNodeTransform } from "./transformVariableNode";

export default function VariablePlugin() {
  const [editor] = useLexicalComposerContext();

  editor.registerNodeTransform(TextNode, textNodeTransform);
}
