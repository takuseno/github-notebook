const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const config = require('./config.json')
let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, webPreferences: {webSecurity: false}})

  win.loadURL(config.base_url)

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
