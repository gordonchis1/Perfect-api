import { $createVariableNode, testDic } from "./variableNode";
import findVariable from "./findVariable";
import { $createUndefinedVariableNode } from "./undefinedVariableNode";

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
  const variable = text.slice(start, end);
  const parts = node.splitText(testKey[0], testKey[1] + 1);

  if (testKey[0] == 0 || parts.length == 1) {
    targetNode = parts[0];
  } else {
    targetNode = parts[1];
  }

  let variableNode;
  if (testDic[variable.toUpperCase()]) {
    variableNode = $createVariableNode(variable.toUpperCase());
  } else {
    variableNode = $createUndefinedVariableNode(variable.toUpperCase());
  }
  targetNode.replace(variableNode);
}
