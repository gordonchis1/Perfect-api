export class WSFile extends File() {
    constructor(
        name,
        content = fileContentDefault,
        isOpen = false,
        id
    ) {
        super(name, content, "WSfile", isOpen, id);
        this.isRunning = false
    }
}
