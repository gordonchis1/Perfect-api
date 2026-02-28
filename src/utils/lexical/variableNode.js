import { TextNode } from "lexical";
export const testDic = {
  URL: "http://localhost:10767",
  PATH: "api/v1/playback/volume",
};

export function $createVariableNode(variable) {
  const node = new VariableNode(variable).setMode("token");
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
    return new VariableNode(node.__variable, node.__key);
  }

  constructor(variable, key) {
    super(variable, key);
    this.__variable = variable.toUpperCase();
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
    return $createVariableNode(serializedNode.variable).updateFromJSON(
      serializedNode,
    );
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      variable: this.__variable,
    };
  }
}
