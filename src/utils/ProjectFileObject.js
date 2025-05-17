// TODO: poner los directorios primero luego usar orden alfabetico y si es igual el nombre usar el ultimo numero

import { nanoid } from "nanoid";

export class VirtualFileSystem {
  constructor(jsonData = null) {
    if (jsonData) {
      this.root = this._buildFromJson(jsonData);
    } else {
      this.root = new Directory("/");
    }
  }
  _buildFromJson(node) {
    if (node.type === "file") {
      return new File(node.name, node.content, node.isOpen, node.id);
    } else if (node.type === "dir") {
      const dir = new Directory(
        node.name,
        node.isOpen,
        node.dirConfig,
        node.id
      );
      for (const child of node.children || []) {
        dir.addChild(this._buildFromJson(child));
      }
      return dir;
    }
    return null;
  }
  getDirByPath(path) {
    const pathParts = path.split("/").filter(Boolean);
    return this._findDir(this.root, pathParts);
  }
  _findDir(currentDir, pathParts) {
    if (pathParts.length === 0) return currentDir;

    const nextPart = pathParts.shift();

    const nextDir = currentDir.children.find((child) => {
      return child instanceof Directory && child.name === nextPart;
    });

    if (!nextDir) throw new Error(`Directory not found: ${nextPart}`);

    return this._findDir(nextDir, pathParts);
  }
  createFile(path, name, content) {
    const dir = this.getDirByPath(path);
    dir.addChild(new File(name, content));
  }
  createDir(path, name) {
    const dir = this.getDirByPath(path);
    dir.addChild(new Directory(name));
  }
  print(node = this.root, prefix = "", isLast = true) {
    const connector = prefix ? (isLast ? "└── " : "├── ") : "";

    console.log(prefix + connector + node.name);

    if (node.type === "dir" && node.children?.length) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");

      node.children.forEach((child, index) => {
        const last = index === node.children.length - 1;
        this.print(child, newPrefix, last);
      });
    }
  }
  getChildrenFromDir(node) {
    return node.children;
  }
  getFileByPath(path, root = this.root) {
    const parts = path.split("/").filter(Boolean);

    let current = root;
    for (let i = 0; i < parts.length; i++) {
      if (!current || current.type !== "dir") return null;

      const next = current.children.find((child) => child.name === parts[i]);

      if (!next) return null;
      current = next;
    }

    return current.type === "file" ? current : null;
  }

  getAbsolutePath(node, currentPath = "") {
    if (node === this.root) {
      return "/" + currentPath;
    }

    const parentNode = this.getParentNode(node);
    currentPath = node.name + (currentPath ? "/" + currentPath : "");

    return this.getAbsolutePath(parentNode, currentPath);
  }

  getParentNode(node) {
    let parentNode = null;

    const searchParent = (currentNode) => {
      if (!currentNode.children) return;

      for (const child of currentNode.children) {
        if (child === node) {
          parentNode = currentNode;
          return;
        }
        searchParent(child);
      }
    };

    searchParent(this.root);
    return parentNode;
  }
  remove(node) {
    if (!(node instanceof FSNode)) return;

    const parentNode = this.getParentNode(node);
    const childrensOfParentNode = parentNode.children;

    const indexOfDeletedChildren = childrensOfParentNode.findIndex(
      (children) => children.name === node.name
    );

    if (indexOfDeletedChildren === -1)
      throw new Error("Error searching for node in the parent node");

    parentNode.children.splice(indexOfDeletedChildren, 1);

    return node;
  }

  move(node, to) {
    if (!(node instanceof FSNode)) return;

    const nodeToMove = this.remove(node);

    const toDirectory = this.getDirByPath(to);

    toDirectory.addChild(nodeToMove);
  }

  toJSON(node = this.root) {
    const base = {
      name: node.name,
      type: node.type,
      isOpen: node.name === "/" ? true : node.isOpen,
      id: node.id,
    };

    if (node.type === "file") {
      base.content = node.content;
    } else if (node.type === "dir") {
      base.children = node.children.map((child) => this.toJSON(child));
    }

    return base;
  }

  clone() {
    const json = this.toJSON();

    return new VirtualFileSystem(json);
  }
}

export class FSNode {
  constructor(name, type, isOpen = false, id) {
    this.name = name;
    this.type = type;
    this.isOpen = isOpen;
    this.id = id;
  }

  rename(newName) {
    this.name = newName;
  }
  toggleIsOpen() {
    return (this.isOpen = !this.isOpen);
  }
  getName() {
    return this.name;
  }
}

export class Directory extends FSNode {
  constructor(name, isOpen = false, dirConfig = {}, id = nanoid()) {
    super(name, "dir", isOpen, id);
    this.dirConfig = dirConfig;
    this.children = [];
  }
  getParentNode(vfs, node) {
    if (!(vfs instanceof VirtualFileSystem))
      throw new Error("The vfs is not a instance of VirtualFileSystem");

    console.log(node);

    return vfs.getParentNode(node);
  }
  addChild(node) {
    if (!(node instanceof FSNode)) {
      console.error("You can only add instance of File or Directory");
      return;
    }

    let baseName = node.name;
    let maxSuffix = -1;

    const extractNameAndSuffix = (name) => {
      const match = name.match(/^(.*?)(?: \((\d+)\))?$/);
      return [match[1], match[2] !== undefined ? parseInt(match[2], 10) : null];
    };

    this.children.forEach((child) => {
      const [childBase, suffix] = extractNameAndSuffix(child.name);
      if (childBase === baseName) {
        if (suffix === null) {
          maxSuffix = Math.max(maxSuffix, 0);
        } else {
          maxSuffix = Math.max(maxSuffix, suffix);
        }
      }
    });

    if (maxSuffix >= 0) {
      node.name = `${baseName} (${maxSuffix + 1})`;
    }

    this.children.push(node);
  }

  getChildrens() {
    return this.children;
  }
  print() {
    console.log(this.children);
  }
}

export class File extends FSNode {
  constructor(name, content = "", isOpen = false, id = nanoid()) {
    super(name, "file", isOpen, id);
    this.content = content;
  }
}
