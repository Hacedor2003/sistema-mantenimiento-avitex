import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    //Get
    getEquipos_All: (...args) => ipcRenderer.invoke('getEquipos_All', ...args),
    getEquipos_By_Id: (...args) => ipcRenderer.invoke('getEquipos_By_Id', ...args),
    getEquipos_By_Categoria: (...args) => ipcRenderer.invoke('getEquipos_By_Categoria', ...args),
    getTipo_Mantenimiento_All: (...args) =>
      ipcRenderer.invoke('getTipo_Mantenimiento_All', ...args),
    getTipo_Mantenimiento_By_Tipo: (...args) =>
      ipcRenderer.invoke('getTipo_Mantenimiento_By_Tipo', ...args),
    getCategorias_All: (...args) => ipcRenderer.invoke('getCategorias_All', ...args),
    getCategorias_By_Nombre: (...args) => ipcRenderer.invoke('getCategorias_By_Nombre', ...args),
    getCategorias_By_ID: (...args) => ipcRenderer.invoke('getCategorias_By_ID', ...args),
    getEstados_Revision_All: (...args) => ipcRenderer.invoke('getEstados_Revision_All', ...args),
    getEstados_Revision_By_Nombre: (...args) =>
      ipcRenderer.invoke('getEstados_Revision_By_Nombre', ...args),
    getUsuarios_All: (...args) => ipcRenderer.invoke('getUsuarios_All', ...args),
    getUsuarios_By_Rol: (...args) => ipcRenderer.invoke('getUsuarios_By_Rol', ...args),
    getOrden_Mantenimiento_All: (...args) =>
      ipcRenderer.invoke('getOrden_Mantenimiento_All', ...args),

    //Delete
    deleteEquipos_By_Id: (...args) => ipcRenderer.invoke('deleteEquipos_By_Id', ...args),
    deleteTipo_Mantenimiento_By_Id: (...args) =>
      ipcRenderer.invoke('deleteTipo_Mantenimiento_By_Id', ...args),
    deleteCategorias_By_Id: (...args) => ipcRenderer.invoke('deleteCategorias_By_Id', ...args),
    deleteEstados_Revision_By_Id: (...args) =>
      ipcRenderer.invoke('deleteEstados_Revision_By_Id', ...args),
    deleteUsuarios_By_Id: (...args) => ipcRenderer.invoke('deleteUsuarios_By_Id', ...args),
    deleteOrden_Mantenimiento_By_Id: (...args) =>
      ipcRenderer.invoke('deleteOrden_Mantenimiento_By_Id', ...args),

    //Edit
    editEquipos_By_Id: (...args) => ipcRenderer.invoke('editEquipos_By_Id', ...args),
    editTipo_Mantenimiento_By_Id: (...args) =>
      ipcRenderer.invoke('editTipo_Mantenimiento_By_Id', ...args),
    editCategorias_By_Id: (...args) => ipcRenderer.invoke('editCategorias_By_Id', ...args),
    editEstados_Revision_By_Id: (...args) =>
      ipcRenderer.invoke('editEstados_Revision_By_Id', ...args),
    editUsuarios_By_Id: (...args) => ipcRenderer.invoke('editUsuarios_By_Id', ...args),
    editOrden_Mantenimiento_By_Id: (...args) =>
      ipcRenderer.invoke('editOrden_Mantenimiento_By_Id', ...args),

    //Create
    createEquipos: (...args) => ipcRenderer.invoke('createEquipos', ...args),
    createTipo_Mantenimiento: (...args) => ipcRenderer.invoke('createTipo_Mantenimiento', ...args),
    createCategorias: (...args) => ipcRenderer.invoke('createCategorias', ...args),
    createEstados_Revision: (...args) => ipcRenderer.invoke('createEstados_Revision', ...args),
    createUsuarios: (...args) => ipcRenderer.invoke('createUsuarios', ...args),
    createOrden_Mantenimiento: (...args) => ipcRenderer.invoke('createOrden_Mantenimiento', ...args)
  })
} catch (error) {
  console.error(error)
}
