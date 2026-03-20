import { $isTextNode } from "lexical";
import { $isVariableNode } from "./variableNode";

export function buildString(node) {
  if ($isTextNode(node)) {
    if ($isVariableNode(node)) {
      return node.__value || "";
    }
    return node.getTextContent();
  }

  let result = "";
  if (!node.getChildren) {
    return "";
  }

  const children = node.getChildren();

  for (const child of children) {
    result += buildString(child);
  }

  return result;
}
