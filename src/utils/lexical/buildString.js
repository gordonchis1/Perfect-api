import { $getRoot, $isTextNode, createEditor } from "lexical";
import { $isVariableNode, VariableNode } from "./variableNode";
import { UndefinedVariableNode } from "./undefinedVariableNode";
import { buildQueryParams } from "../buildQueryParams";
import { useLexicalEditorStore } from "../../stores/LexicalEditorStore";

export function parseEditorState() {
  const { editor } = useLexicalEditorStore.getState();
  if (!editor) return "";

  let inputString = undefined;
  editor.read(() => {
    const root = $getRoot();
    inputString = buildString(root);
  });

  return inputString;
}

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

export function rebuildFullFinalString(queryParams) {
  const { editor } = useLexicalEditorStore.getState();
  if (!editor) return;

  let inputString;
  let finalString;

  editor.read(() => {
    const root = $getRoot();
    inputString = buildString(root);
  });

  try {
    const url = new URL(inputString);
    const queryParamsString = buildQueryParams(queryParams, url.searchParams);
    url.search = queryParamsString;
    finalString = url.toString();
  } catch {
    const queryParamsString = buildQueryParams(queryParams);
    finalString = inputString + "?" + queryParamsString;
  }

  return finalString;
}
