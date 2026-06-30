import { fileContentDefault } from "../constants/projectFileConstants";
import { useProjectStore } from "../../stores/ProjectStore";
import { nanoid } from "nanoid";
import { useHistoryStore } from "../../stores/HistoryStore";
import { canHaveBody } from "../fetch/costants";
import { generateEntry } from "../entry/entry";
import { File } from "./file";

export class HTTPFile extends File {
    constructor(
        name,
        content = fileContentDefault,
        isOpen = false,
        id
    ) {
        super(name, content, "HTTPFile", isOpen, id);
        this.runningId = null;
    }
    toggleIsRunning() {
        this.content = { ...this.content, isRunning: !this.content.isRunning };
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
