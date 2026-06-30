import { FSNode } from "./FSNode";

export class File extends FSNode {
    constructor(
        name,
        content,
        type,
        isOpen = false,
        id
    ) {
        super(name, type, isOpen, id);
        this.content = content;
    }

    updateContent(newContent) {
        this.content = newContent;
        return newContent;
    }

}
