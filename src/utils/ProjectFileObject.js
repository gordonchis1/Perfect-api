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
      return new File(node.name, node.content);
    } else if (node.type === "dir") {
      const dir = new Directory(node.name, node.isOpen);
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
}

export class FSNode {
  constructor(name, type, dirConfig = {}, isOpen = false) {
    this.name = name;
    this.type = type;
    this.dirConfig = dirConfig;
    this.isOpen = isOpen;
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
  constructor(name, isOpen = false) {
    super(name, "dir");
    this.children = [];
    this.isOpen = isOpen;
  }
  addChild(node) {
    if (!(node instanceof FSNode)) {
      console.error("You can only add instance of File or Direcotry");
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
  constructor(name, content = "", isOpen = false) {
    super(name, "file");
    this.isOpen = isOpen;
    this.content = content;
  }
}
