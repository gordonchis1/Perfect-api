// TODO: poner los directorios primero luego usar orden alfabetico y si es igual el nombre usar el ultimo numero
// TODO: cambiar donde se identfica por el id

import { nanoid } from "nanoid";
import { fileContentDefault } from "./constants/ProjectFileConstants";
import { fetch } from "@tauri-apps/plugin-http";
import { useProjectStore } from "../stores/ProjectStore";
import { generateResponse } from "./response/response";

const defaultOnChangeFunction = () => {
  console.log("Vfs Changed");
};
export class VirtualFileSystem {
  constructor(jsonData = null, onChange = defaultOnChangeFunction) {
    if (jsonData) {
      this.root = this._buildFromJson(jsonData);
    } else {
      this.root = new Directory("/");
    }
    this.onChange = onChange;
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

    this.onChange();
    return node;
  }

  move(node, to) {
    if (!(node instanceof FSNode) && !(to instanceof Directory)) return;

    const nodeToMove = this.remove(node);

    to.addChild(nodeToMove);
    this.onChange();
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

  getNodeById(id, currentNode = this.root) {
    if (currentNode.id === id) return currentNode;

    if (currentNode.type === "dir") {
      for (const child of currentNode.children) {
        const result = this.getNodeById(id, child);
        if (result) return result;
      }
    }

    return null;
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
    this.sortChildren();
  }

  sortChildren() {
    this.children.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "dir" ? -1 : 1;
    });
  }

  getChildrens() {
    return this.children;
  }
  print() {
    console.log(this.children);
  }
}

export class File extends FSNode {
  constructor(
    name,
    content = fileContentDefault,
    isOpen = false,
    id = nanoid()
  ) {
    super(name, "file", isOpen, id);
    this.content = content;
    this.controller = null;
  }
  toggleIsRuning() {
    this.content = { ...this.content, isRuning: !this.content.isRuning };
  }
  updateContent(newContent) {
    this.content = newContent;
    return newContent;
  }
  async run() {
    const openFiles = useProjectStore.getState().openFiles;
    const currentFile = useProjectStore.getState().currentFileId;
    const content = openFiles[currentFile].content;
    const { type, url, headers } = content;
    const toggleIsRuning = useProjectStore.getState().toggleIsRuning;
    const updateContentOfOpenFile =
      useProjectStore.getState().updateContentOfOpenFile;
    let time;
    const start = performance.now();
    let response;
    const headersToSend = {};

    headers.forEach((header) => {
      if (header.isActive) {
        if (header.key === "Host") {
          try {
            const formatedUrl = new URL(url.parseUrl);
            headersToSend[header.key] = formatedUrl.host;
          } catch {
            headersToSend[header.key] = "";
          }
        } else {
          headersToSend[header.key] = header.value;
        }
      }
    });

    try {
      this.controller = new AbortController();

      // ? Change toggle is runing
      toggleIsRuning(this);

      // ? Do the request
      response = await fetch(url.parseUrl, {
        method: type,
        signal: this.controller.signal,
        headers: headersToSend,
      });

      if (!response.ok) {
        throw response;
      }
    } catch (error) {
      if (error instanceof Response) {
        console.log({
          status: error.status,
          response: error.statusText,
          data: response.body,
        });
      }
      if (error.name === "AbortError") {
        console.log("Request abortada");
      }
    } finally {
      // ? Change toggle is runing
      time = Math.abs(performance.now() - start);
      toggleIsRuning(this);
    }

    const newResponse = await generateResponse(
      time,
      response,
      url.parseUrl,
      url.queryParams
    );

    const responses = [newResponse, ...content.responses];

    if (responses.length >= 5) {
      // ! Agregar la logica de respuestas fijadas
      responses.splice(5);
    }

    updateContentOfOpenFile(
      currentFile,
      {
        ...content,
        responses,
        isRuning: false,
      },
      true
    );
  }

  abort() {
    if (this.controller) {
      const toggleIsRuning = useProjectStore.getState().toggleIsRuning;
      this.controller.abort();
      toggleIsRuning(this);
      this.controller = null;
    }
  }
}
