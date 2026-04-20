const { BrowserWindow, app, ipcMain, dialog, nativeTheme } = require('electron')
const { isDev } = require("./utils.cjs")
const path = require('node:path')


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            sandbox: false
        }
    })
    if (isDev()) {
        win.loadURL('http://localhost:3000')
    } else {
        win.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"))
    }
}

async function handleOpenDialog(options) {
    console.log(options)
    const { filePaths } = await dialog.showOpenDialog({ ...options })

    return filePaths

}

function setTheme(theme = "dark") {
    nativeTheme.themeSource = theme
}


app.whenReady().then(() => {
    ipcMain.handle('get-data-dir', () => app.getPath("userData"))
    ipcMain.handle('get-document-dir', () => app.getPath("documents"))
    ipcMain.handle("open:dialog", (event, args) => handleOpenDialog(args))
    ipcMain.handle("set-theme", (event, args) => setTheme(args))

    createWindow()
})


