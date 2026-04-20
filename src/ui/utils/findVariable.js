import { useProjectStore } from "../stores/ProjectStore";
import { Directory, FSNode, VirtualFileSystem } from "./ProjectFileObject";

export const findVariableInFullPath = (variable) => {
  const projectStore = useProjectStore.getState();
  const currentFileId = projectStore.currentFileId;
  const vfs = projectStore.vfs;

  if (vfs instanceof VirtualFileSystem) {
    const currentElement = vfs.getNodeById(currentFileId);
    return recursiveFindVariableInParentNode(variable, currentElement);
  }
};

export const recursiveFindVariableInParentNode = (variable, node) => {
  if (!node) {
    return undefined;
  }

  const projectStore = useProjectStore.getState();
  const vfs = projectStore.vfs;

  if (node instanceof Directory) {
    const variables = node.dirConfig.variables;
    if (variables != undefined) {
      const variableElement = variables.find((element) => {
        return element.key == variable;
      });

      if (variableElement != undefined) {
        return variableElement;
      }
    }
  }

  if (node instanceof FSNode && vfs instanceof VirtualFileSystem) {
    const parent = vfs.getParentNode(node);
    return recursiveFindVariableInParentNode(variable, parent);
  }
};
