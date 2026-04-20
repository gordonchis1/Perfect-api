const { app, contextBridge, ipcRenderer } = require('electron')
const fs = require('fs/promises')
const { join } = require('path')

async function readTextFile(path) {
    if (!path) {
        throw new Error("No path.")
    };
    await fs.access(path)
    return await fs.readFile(path, "utf8")
}

async function writeTextFile(path, content) {
    if (!path || !content) {
        throw new Error("No path or content")
    }
    return fs.writeFile(path, content)
}

async function exists(path) {
    try {
        await fs.access(path)
        return true
    } catch {
        return false;
    }
}

async function mkdir(path) {
    if (!path) {
        throw new Error("No path")
    }
    const dirCreation = await fs.mkdir(path, { recursive: true })

    return dirCreation
}

async function remove(path) {
    if (!path) {
        throw new Error("No path")
    }

    return await fs.rm(path)
}


async function rename(oldPath, newPath) {
    if (!oldPath || !newPath) {
        throw new Error("No old path or new path")
    }

    return await fs.rename(oldPath, newPath)
}

contextBridge.exposeInMainWorld("electron", {
    setTheme: (theme) => ipcRenderer.invoke("set-theme", theme)
})

contextBridge.exposeInMainWorld("fs", {
    readTextFile,
    writeTextFile,
    exists,
    mkdir,
    remove,
    rename
})

// https://www.electronjs.org/docs/latest/api/dialog
contextBridge.exposeInMainWorld("dialog", {
    openDialog: (options) => ipcRenderer.invoke("open:dialog", options)
})

contextBridge.exposeInMainWorld("path", {
    join,
    appDataDir: () => ipcRenderer.invoke('get-data-dir'),
    documentDir: () => ipcRenderer.invoke('get-document-dir')
})


