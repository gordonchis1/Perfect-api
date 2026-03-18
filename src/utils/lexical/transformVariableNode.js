import { $createVariableNode } from "./variableNode";
import findVariable from "./findVariable";
import { $createUndefinedVariableNode } from "./undefinedVariableNode";
import { useProjectStore } from "../../stores/ProjectStore";
import { VirtualFileSystem, File } from "../ProjectFileObject";

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
  if (variable == "") {
    targetNode.replace(targetNode);
  }

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

  let variableNode;
  const variableElement = variables.find((element) => {
    return element.key == variable.toUpperCase();
  });

  if (variables !== undefined && variableElement !== undefined) {
    variableNode = $createVariableNode(variable.toUpperCase());
  } else {
    variableNode = $createUndefinedVariableNode(variable.toUpperCase());
  }
  targetNode.replace(variableNode);
}
