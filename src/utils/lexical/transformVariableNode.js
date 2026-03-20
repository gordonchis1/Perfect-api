import { $createVariableNode } from "./variableNode";
import findVariable from "./findVariable";
import { $createUndefinedVariableNode } from "./undefinedVariableNode";
import { useProjectStore } from "../../stores/ProjectStore";
import { VirtualFileSystem, File } from "../ProjectFileObject";
import { findVariableInFullPath } from "../findVariable";

export function textNodeTransform(node) {
  if (!node.isSimpleText() || node.hasFormat("code")) {
    return;
  }

  const text = node.getTextContent();
  const variableMatch = findVariable(text);
  let targetNode;

  if (variableMatch && variableMatch.length == 0) return;

  const testKey = variableMatch[0];
  const start = testKey[0] + 1;
  const end = testKey[1];
  let variable = text.slice(start, end);
  const parts = node.splitText(testKey[0], testKey[1] + 1);

  if (testKey[0] == 0 || parts.length == 1) {
    targetNode = parts[0];
  } else {
    targetNode = parts[1];
  }
  if (variable == "") {
    targetNode.replace(targetNode);
  }

  variable = variable.toUpperCase().replace(" ", "_");

  const variableElement = findVariableInFullPath(variable);
  let variableNode;

  if (variableElement !== undefined) {
    // Add value for recreate de final url
    variableNode = $createVariableNode(variable, variableElement.value);
  } else {
    variableNode = $createUndefinedVariableNode(variable, undefined);
  }
  targetNode.replace(variableNode);
}
