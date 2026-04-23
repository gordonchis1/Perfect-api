const { BrowserWindow, app, ipcMain, dialog, nativeTheme, net, session } = require('electron')
const { isDev } = require("./utils.cjs")
const path = require('node:path')
const { default: axios } = require('axios')
const { CookieJar, Store, fromJSON, Cookie } = require('tough-cookie')
const { wrapper } = require('axios-cookiejar-support')
const { generateResponse } = require('./response.cjs')


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
const fetcherMap = new Map()

async function fetch(config, id, cookies) {
    const jar = await CookieJar.fromJSON(cookies)
    const client = wrapper(axios.create({ jar }))
    let start;
    let response;
    let duration;
    let error;
    let responseCookies = null;


    try {
        const controller = new AbortController();
        fetcherMap.set(id, controller)
        start = Date.now();
        if (config?.body) {
            config['data'] = config?.body
        }
        response = await client({
            ...config,
            withCredentials: true,
            signal: controller.signal,
            responseType: 'arraybuffer',
        })
        responseCookies = jar.toJSON()
    } catch (err) {
        if (err.__CANCEL__) {
            error = {
                type: "abort",
                message: err?.message || err,
            };
        }
        else if (err.status) {
            if (err.response) {
                response = err.response
            }
            error = {
                type: "http",
                status: err.status,
                message: err.response.statusText,
            };

        }
        else {
            error = {
                type: "Network",
                status: 0,
                message: ""
            }
        }
    }
    finally {
        duration = Date.now() - start;
        fetcherMap.delete(id)
    }

    const entry = await generateResponse(response, error, duration, responseCookies)

    return entry;
}

function handleAbort(id) {
    if (!fetcherMap.has(id)) {
        return
    }

    const controller = fetcherMap.get(id)
    controller.abort()
}


app.whenReady().then(() => {
    ipcMain.handle('get-data-dir', () => app.getPath("userData"))
    ipcMain.handle('get-document-dir', () => app.getPath("documents"))
    ipcMain.handle("open:dialog", (event, args) => handleOpenDialog(args))
    ipcMain.handle("set-theme", (event, args) => setTheme(args))
    ipcMain.handle("fetch-abort", (evnet, args) => handleAbort(args))
    ipcMain.handle("fetch", (event, args) => fetch(...args))

    createWindow()
})


