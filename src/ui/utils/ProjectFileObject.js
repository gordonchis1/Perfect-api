import { nanoid } from "nanoid";
import { fileContentDefault } from "./constants/projectFileConstants";
import { useProjectStore } from "../stores/ProjectStore";
import { generateEntry } from "./entry/entry";
import { canHaveBody } from "./fetch/costants";
import { useHistoryStore } from "../stores/HistoryStore";
import { AUTH_TYPES } from "./constants/AUTH_TYPES.JS";
import { DEFAULT_DIR_CONFIG } from "./constants/DefaultDirConfig";
import { CookieJar } from "tough-cookie";

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
        const base = {
            name: node.name,
            type: node.type,
            isOpen: node.name === "/" ? true : node.isOpen,
            id: node.id,
        };

        if (node.type === "file") {
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
    constructor(
        name,
        isOpen = false,
        dirConfig = DEFAULT_DIR_CONFIG,
        id = nanoid(),
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

export class File extends FSNode {
    constructor(
        name,
        content = fileContentDefault,
        isOpen = false,
        id = nanoid(),
    ) {
        super(name, "file", isOpen, id);
        this.content = content;
        this.runningId = null;
    }
    toggleIsRunning() {
        this.content = { ...this.content, isRunning: !this.content.isRunning };
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
        const toggleIsRunning = useProjectStore.getState().toggleIsRunning;
        const updateContentOfOpenFile =
            useProjectStore.getState().updateContentOfOpenFile;
        const body = content.body;
        const updateHistory = useHistoryStore.getState().update;
        const setCurrentHistoryId = useHistoryStore.getState().setCurrentId;
        const updateCookies = useProjectStore.getState().updateCookies
        const cookies = useProjectStore.getState().cookies

        let response;
        const headersToSend = {};

        headers.forEach((header) => {
            if (header.key != "Host") {
                if (header.isActive) {
                    headersToSend[`${header.key}`] = header.value;
                }
            }
        });

        let finalInfo = {
            headers: headersToSend,
            finalUrl: url.finalUrl,
        };

        if (content?.auth?.type && content?.auth?.type != "none") {
            AUTH_TYPES[content.auth.type].apply(finalInfo);
        }

        // ? Change toggle is running
        const id = nanoid()
        toggleIsRunning(this);
        try {

            const fetchOptions = {
                url: finalInfo.finalUrl,
                method: type,
                headers: finalInfo.headers,
            };

            if (canHaveBody(type) && body.type !== "noBody" && body.raw !== null) {
                switch (body.type) {
                    case "json":
                        fetchOptions.body = JSON.stringify(JSON.parse(body.raw));
                        break;
                    case "text":
                        fetchOptions.body = body.raw;
                        break;
                    case "form":
                        fetchOptions.body = body.raw;
                        break;
                }
            }

            this.runningId = id;
            response = await window.http.fetch(fetchOptions, id, cookies)
        } catch (err) {
            console.log(err)
        } finally {
            toggleIsRunning(this);
        }

        const newEntry = await generateEntry(content, response, id);
        if (newEntry?.response?.cookies && newEntry.response.cookies.cookies.length != 0) {
            updateCookies(newEntry.response.cookies)
            const jarOnlySendCookies = CookieJar.fromJSON(newEntry.response.cookies)
            const sendCookies = await jarOnlySendCookies.getCookies(finalInfo.finalUrl)


            const sendCookiesJson = sendCookies.map(c => c.toJSON())
            const sendCookiesJar = new CookieJar()
            const sendCookiesJarJson = sendCookiesJar.toJSON()
            sendCookiesJarJson.cookies = [...sendCookiesJson]
            newEntry.response.cookies = sendCookiesJarJson


        }

        const updateEntries = {};
        let updatedOrder = [];
        updateEntries[newEntry.id] = newEntry;

        const pinnedEntries = content.history.order.filter(
            (id) => content.history.entries[id].isPinned == true,
        );
        const unPinnedEntries = content.history.order.filter(
            (id) => content.history.entries[id].isPinned == false,
        );

        // ! replace 5 for user confiugration
        updatedOrder = unPinnedEntries.slice(0, 20 - 1);
        updatedOrder.unshift(newEntry.id);
        updatedOrder.unshift(...pinnedEntries);

        for (let id of updatedOrder) {
            if (content.history.entries[id]) {
                updateEntries[id] = content.history.entries[id];
            }
        }




        updateHistory(updatedOrder, updateEntries);
        setCurrentHistoryId(newEntry.id);
        updateContentOfOpenFile(
            currentFile,
            {
                ...content,
                history: {
                    entries: updateEntries,
                    order: updatedOrder,
                },
            },
            true,
        );

        return newEntry;
    }

    abort() {
        if (this.runningId) {
            window.http.abort(this.runningId)
            this.runningId = null;
        }
    }
}
