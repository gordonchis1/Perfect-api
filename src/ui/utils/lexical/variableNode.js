import { TextNode } from "lexical";

export function $createVariableNode(variable, value = undefined) {
  const node = new VariableNode(variable, value).setMode("token");
  return node;
}

export function $isVariableNode(node) {
  return node instanceof VariableNode;
}

export class VariableNode extends TextNode {
  static getType() {
    return "variable";
  }

  static clone(node) {
    return new VariableNode(node.__variable, node.__value, node.__key);
  }

  constructor(variable, value = undefined, key) {
    super(variable, key);
    this.__variable = variable.toUpperCase();
    this.__value = value;
  }

  /**
   * DOM that will be rendered by browser within contenteditable
   * This is what Lexical renders
   */
  createDOM() {
    const dom = document.createElement("span");
    dom.className = "variable-tag";
    dom.innerText = this.__variable;

    return dom;
  }

  static importJSON(serializedNode) {
    return $createVariableNode(
      serializedNode.variable,
      serializedNode.value,
    ).updateFromJSON(serializedNode);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      variable: this.__variable,
      value: this.__value,
    };
  }
}
