import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import connectDB from './db/db'
import { join } from 'path'
import {
  createEquipos,
  createTipo_Mantenimiento,
  createCategorias,
  createEstados_Revision,
  createUsuarios,
  createOrden_Mantenimiento
} from './lib/Hook_Create'
import {
  deleteEquipos_By_Id,
  deleteTipo_Mantenimiento_By_Id,
  deleteCategorias_By_Id,
  deleteEstados_Revision_By_Id,
  deleteUsuarios_By_Id,
  deleteOrden_Mantenimiento_By_Id
} from './lib/Hook_Delete'
import {
  editEquipos_By_Id,
  editTipo_Mantenimiento_By_Id,
  editCategorias_By_Id,
  editEstados_Revision_By_Id,
  editUsuarios_By_Id,
  editOrden_Mantenimiento_By_Id
} from './lib/Hook_Edit'
import {
  getEquipos_All,
  getEquipos_By_Id,
  getTipo_Mantenimiento_All,
  getTipo_Mantenimiento_By_Tipo,
  getCategorias_All,
  getCategorias_By_Nombre,
  getEstados_Revision_All,
  getEstados_Revision_By_Nombre,
  getUsuarios_All,
  getUsuarios_By_Rol,
  getOrden_Mantenimiento_All,
  getEquipos_By_Categoria,
  getCategorias_By_ID
} from './lib/Hook_Get'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
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

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  //DB
  await connectDB()

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC

  //Get
  ipcMain.handle('getEquipos_All', (_, ...args) => getEquipos_All(...args))
  ipcMain.handle('getEquipos_By_Id', (_, ...args) => getEquipos_By_Id(...args))
  ipcMain.handle('getEquipos_By_Categoria', (_, ...args) => getEquipos_By_Categoria(...args))
  ipcMain.handle('getCategorias_By_ID', (_, ...args) => getCategorias_By_ID(...args))
  ipcMain.handle('getTipo_Mantenimiento_All', (_, ...args) => getTipo_Mantenimiento_All(...args))
  ipcMain.handle('getTipo_Mantenimiento_By_Tipo', (_, ...args) =>
    getTipo_Mantenimiento_By_Tipo(...args)
  )
  ipcMain.handle('getCategorias_All', (_, ...args) => getCategorias_All(...args))
  ipcMain.handle('getCategorias_By_Nombre', (_, ...args) => getCategorias_By_Nombre(...args))
  ipcMain.handle('getEstados_Revision_All', (_, ...args) => getEstados_Revision_All(...args))
  ipcMain.handle('getEstados_Revision_By_Nombre', (_, ...args) =>
    getEstados_Revision_By_Nombre(...args)
  )
  ipcMain.handle('getUsuarios_All', (_, ...args) => getUsuarios_All(...args))
  ipcMain.handle('getUsuarios_By_Rol', (_, ...args) => getUsuarios_By_Rol(...args))
  ipcMain.handle('getOrden_Mantenimiento_All', (_, ...args) => getOrden_Mantenimiento_All(...args))

  //Delete
  ipcMain.handle('deleteEquipos_By_Id', (_, ...args) => deleteEquipos_By_Id(...args))
  ipcMain.handle('deleteTipo_Mantenimiento_By_Id', (_, ...args) =>
    deleteTipo_Mantenimiento_By_Id(...args)
  )
  ipcMain.handle('deleteCategorias_By_Id', (_, ...args) => deleteCategorias_By_Id(...args))
  ipcMain.handle('deleteEstados_Revision_By_Id', (_, ...args) =>
    deleteEstados_Revision_By_Id(...args)
  )
  ipcMain.handle('deleteUsuarios_By_Id', (_, ...args) => deleteUsuarios_By_Id(...args))
  ipcMain.handle('deleteOrden_Mantenimiento_By_Id', (_, ...args) =>
    deleteOrden_Mantenimiento_By_Id(...args)
  )

  //Edit
  ipcMain.handle('editEquipos_By_Id', (_, ...args) => editEquipos_By_Id(...args))
  ipcMain.handle('editTipo_Mantenimiento_By_Id', (_, ...args) =>
    editTipo_Mantenimiento_By_Id(...args)
  )
  ipcMain.handle('editCategorias_By_Id', (_, ...args) => editCategorias_By_Id(...args))
  ipcMain.handle('editEstados_Revision_By_Id', (_, ...args) => editEstados_Revision_By_Id(...args))
  ipcMain.handle('editUsuarios_By_Id', (_, ...args) => editUsuarios_By_Id(...args))
  ipcMain.handle('editOrden_Mantenimiento_By_Id', (_, ...args) =>
    editOrden_Mantenimiento_By_Id(...args)
  )

  //Create
  ipcMain.handle('createEquipos', (_, ...args) => createEquipos(...args))
  ipcMain.handle('createTipo_Mantenimiento', (_, ...args) => createTipo_Mantenimiento(...args))
  ipcMain.handle('createCategorias', (_, ...args) => createCategorias(...args))
  ipcMain.handle('createEstados_Revision', (_, ...args) => createEstados_Revision(...args))
  ipcMain.handle('createUsuarios', (_, ...args) => createUsuarios(...args))
  ipcMain.handle('createOrden_Mantenimiento', (_, ...args) => createOrden_Mantenimiento(...args))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
