import { FSNode } from "./FSNode";
import { HTTPFile } from "./HTTPFile";
import { Directory } from "./directory";

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
        if (node.type === "HTTPFile") {
            return new HTTPFile(node.name, node.content, node.isOpen, node.id);
        } else if (node.type === "dir") {
            const dir = new Directory(
                node.name,
                node.isOpen,
                node.dirConfig,
                node.id,
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
        dir.addChild(new HTTPFile(name, content));
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
            (children) => children.name === node.name,
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
        console.log(node);
        const base = {
            name: node.name,
            type: node.type,
            isOpen: node.name === "/" ? true : node.isOpen,
            id: node.id,
        };

        //change this for a File object
        if (node.type == "HTTPFile") {
            base.content = node.content;
        } else if (node.type === "dir") {
            base.dirConfig = node.dirConfig;
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
