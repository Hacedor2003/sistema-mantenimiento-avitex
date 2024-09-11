import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import connectDB from './db/db'
import {
  createCategorias,
  createEquipos,
  createEstados_Revision,
  createOrden_Mantenimiento,
  createTipo_Mantenimiento,
  createUsuarios
} from './lib/Hook_Create'
import {
  deleteCategorias_By_Id,
  deleteEquipos_By_Id,
  deleteEstados_Revision_By_Id,
  deleteOrden_Mantenimiento_By_Id,
  deleteTipo_Mantenimiento_By_Id,
  deleteUsuarios_By_Id
} from './lib/Hook_Delete'
import {
  editCategorias_By_Id,
  editEquipos_By_Id,
  editEstados_Revision_By_Id,
  editOrden_Mantenimiento_By_Id,
  editPresupuesto_By_Id,
  editTipo_Mantenimiento_By_Id,
  editUsuarios_By_Id
} from './lib/Hook_Edit'
import {
  getCategorias_All,
  getCategorias_By_ID,
  getCategorias_By_Nombre,
  getEquipos_All,
  getEquipos_By_Categoria,
  getEquipos_By_Id,
  getEstados_Revision_All,
  getEstados_Revision_By_Id,
  getEstados_Revision_By_Nombre,
  getOrden_Mantenimiento_All,
  getPresupuestos_All,
  getPresupuestos_By_Id,
  getTipo_Mantenimiento_All,
  getTipo_Mantenimiento_By_Id,
  getTipo_Mantenimiento_By_Tipo,
  getUsuarios_All,
  getUsuarios_By_Rol
} from './lib/Hook_Get'
import { MainScreen } from './MainScreen'

//Basic flags
autoUpdater.forceDevUpdateConfig = true
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

let mainWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new MainScreen()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  //DB
  //await connectDB()

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.hacedor')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC

  //Get
  ipcMain.handle('getEquipos_All', () => getEquipos_All())
  ipcMain.handle('getEquipos_By_Id', (_, id) => getEquipos_By_Id(id))
  ipcMain.handle('getEquipos_By_Categoria', (_, categoriasid) =>
    getEquipos_By_Categoria(categoriasid)
  )
  ipcMain.handle('getCategorias_By_ID', (_, id) => getCategorias_By_ID(id))
  ipcMain.handle('getTipo_Mantenimiento_All', () => getTipo_Mantenimiento_All())
  ipcMain.handle('getTipo_Mantenimiento_By_Tipo', (_, tipo) => getTipo_Mantenimiento_By_Tipo(tipo))
  ipcMain.handle('getCategorias_All', () => getCategorias_All())
  ipcMain.handle('getCategorias_By_Nombre', (_, nombre) => getCategorias_By_Nombre(nombre))
  ipcMain.handle('getEstados_Revision_All', () => getEstados_Revision_All())
  ipcMain.handle('getEstados_Revision_By_Nombre', (_, nombre) =>
    getEstados_Revision_By_Nombre(nombre)
  )
  ipcMain.handle('getUsuarios_All', () => getUsuarios_All())
  ipcMain.handle('getUsuarios_By_Rol', (_, rol) => getUsuarios_By_Rol(rol))
  ipcMain.handle('getOrden_Mantenimiento_All', () => getOrden_Mantenimiento_All())
  ipcMain.handle('getPresupuestos_All', () => getPresupuestos_All())
  ipcMain.handle('getPresupuestos_By_Id', (_, id) => getPresupuestos_By_Id(id))
  ipcMain.handle('getTipo_Mantenimiento_By_Id', (_, id) => getTipo_Mantenimiento_By_Id(id))
  ipcMain.handle('getEstados_Revision_By_Id', (_, id) => getEstados_Revision_By_Id(id))

  //Delete
  ipcMain.handle('deleteEquipos_By_Id', (_, id) => deleteEquipos_By_Id(id))
  ipcMain.handle('deleteTipo_Mantenimiento_By_Id', (_, id) => deleteTipo_Mantenimiento_By_Id(id))
  ipcMain.handle('deleteCategorias_By_Id', (_, id) => deleteCategorias_By_Id(id))
  ipcMain.handle('deleteEstados_Revision_By_Id', (_, id) => deleteEstados_Revision_By_Id(id))
  ipcMain.handle('deleteUsuarios_By_Id', (_, id) => deleteUsuarios_By_Id(id))
  ipcMain.handle('deleteOrden_Mantenimiento_By_Id', (_, id) => deleteOrden_Mantenimiento_By_Id(id))

  //Edit
  ipcMain.handle('editEquipos_By_Id', (_, id, updatedEquipoData) =>
    editEquipos_By_Id(id, updatedEquipoData)
  )
  ipcMain.handle('editTipo_Mantenimiento_By_Id', (_, id, updatedTipoMantenimientoData) =>
    editTipo_Mantenimiento_By_Id(id, updatedTipoMantenimientoData)
  )
  ipcMain.handle('editCategorias_By_Id', (_, id, updated) => editCategorias_By_Id(id, updated))
  ipcMain.handle('editEstados_Revision_By_Id', (_, id, updated) =>
    editEstados_Revision_By_Id(id, updated)
  )
  ipcMain.handle('editUsuarios_By_Id', (_, id, updated) => editUsuarios_By_Id(id, updated))
  ipcMain.handle('editOrden_Mantenimiento_By_Id', (_, id, updated) =>
    editOrden_Mantenimiento_By_Id(id, updated)
  )
  ipcMain.handle('editPresupuesto_By_Id', (_, id, presupuesto) =>
    editPresupuesto_By_Id(id, presupuesto)
  )

  //Create
  ipcMain.handle('createEquipos', (_, newData) => createEquipos(newData))
  ipcMain.handle('createTipo_Mantenimiento', (_, newData) => createTipo_Mantenimiento(newData))
  ipcMain.handle('createCategorias', (_, newData) => createCategorias(newData))
  ipcMain.handle('createEstados_Revision', (_, newData) => createEstados_Revision(newData))
  ipcMain.handle('createUsuarios', (_, newData) => createUsuarios(newData))
  ipcMain.handle('createOrden_Mantenimiento', (_, newData) => createOrden_Mantenimiento(newData))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  autoUpdater.checkForUpdates()
  mainWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`)
})

/*New Update Available*/
autoUpdater.on('update-available', () => {
  mainWindow.showMessage(`Update available. Current version ${app.getVersion()}`)
  const pth = autoUpdater.downloadUpdate()
  mainWindow.showMessage(pth)
})

autoUpdater.on('update-not-available', () => {
  mainWindow.showMessage(`No update available. Current version ${app.getVersion()}`)
})

/*Download Completion Message*/
autoUpdater.on('update-downloaded', () => {
  mainWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`)
})

autoUpdater.on('error', (info) => {
  mainWindow.showMessage(info)
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
