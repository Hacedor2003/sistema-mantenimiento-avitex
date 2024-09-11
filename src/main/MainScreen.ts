/* eslint-disable prettier/prettier */
import { is } from '@electron-toolkit/utils'
import { BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

export class MainScreen {
  private mainWindow:BrowserWindow

  constructor() {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 1000,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      center: true,
      title: 'Sistema de Mantenimiento',
      frame: true,
      vibrancy: 'under-window',
      visualEffectState: 'active',
      titleBarStyle: 'default',
      trafficLightPosition: { x: 15, y: 10 },
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: true,
        contextIsolation: true
      }
    })

    this.mainWindow.on('ready-to-show', () => {
      this.mainWindow.show()
    })

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }
  
  showMessage(message) {
    console.log("showMessage trapped");
    console.log(message);
    this.mainWindow.webContents.send("updateMessage", message);
  }

  close() {
    this.mainWindow.close();
    ipcMain.removeAllListeners();
  }

  hide() {
    this.mainWindow.hide();
  }

  handleMessages() {
    
  }
}
