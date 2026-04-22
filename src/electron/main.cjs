const { BrowserWindow, app, ipcMain, dialog, nativeTheme, net, session } = require('electron')
const { isDev } = require("./utils.cjs")
const path = require('node:path')
const { default: axios } = require('axios')
const { CookieJar } = require('tough-cookie')
const { wrapper } = require('axios-cookiejar-support')


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
    const { filePaths } = await dialog.showOpenDialog({ ...options })

    return filePaths

}

function setTheme(theme = "dark") {
    nativeTheme.themeSource = theme
}
async function fetch(config) {
    const beforeRedirect = (options, data) => {
        console.log(data)
    }
    const jar = new CookieJar()
    const client = wrapper(axios.create({ jar }))

    const response = await client({
        ...config,
        beforeRedirect,
        withCredentials: true,
    })

    const { data } = response

    const cookies = await jar.serialize()
    console.log(cookies)
    console.log(data)

    return;
}


app.whenReady().then(() => {
    ipcMain.handle('get-data-dir', () => app.getPath("userData"))
    ipcMain.handle('get-document-dir', () => app.getPath("documents"))
    ipcMain.handle("open:dialog", (event, args) => handleOpenDialog(args))
    ipcMain.handle("set-theme", (event, args) => setTheme(args))
    ipcMain.handle("fetch", (event, args) => fetch(args))

    createWindow()
})


