import { FSNode } from "./FSNode";
import { DEFAULT_DIR_CONFIG } from "../constants/DefaultDirConfig";
import { nanoid } from "nanoid";

export class Directory extends FSNode {
    constructor(
        name,
        isOpen = false,
        dirConfig = DEFAULT_DIR_CONFIG,
        id,
    ) {
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


