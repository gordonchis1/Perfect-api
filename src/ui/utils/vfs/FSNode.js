import { nanoid } from "nanoid";

export class FSNode {
    constructor(name, type, isOpen = false, id = nanoid()) {
        this.name = name;
        this.type = type;
        this.isOpen = isOpen;
        this.id = id
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
