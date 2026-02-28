import { VariableNode } from "./variableNode";

export class UndefinedVariableNode extends VariableNode {
  static getType() {
    return "undefined-variable";
  }
  static clone(node) {
    return new UndefinedVariableNode(node.__variable, node.__key);
  }
  constructor(variable, key) {
    super(variable, key);
  }

  createDOM(config) {
    const dom = document.createElement("span");
    dom.className = "undefined-variable-tag";
    dom.classList.add("variable-tag");
    dom.textContent = this.__variable;
    return dom;
  }

  static importJSON(serializedNode) {
    return $createUndefinedVariableNode(serializedNode).updateFromJSON(
      serializedNode,
    );
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      value: this.__variable,
    };
  }
}

export function $createUndefinedVariableNode(variable) {
  const node = new UndefinedVariableNode(variable).setMode("token");
  return node;
}

export function $isUndefinedVariableNode(node) {
  return node instanceof UndefinedVariableNode;
}
