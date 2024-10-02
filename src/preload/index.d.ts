import { IpcRendererEvent } from 'electron'
import {
  CategoriasAttributes,
  EquiposAttributes,
  Estados_RevisionAttributes,
  Orden_MantenimientoAttributes,
  PresupuestoAttributes,
  Tipo_MantenimientoAttributes,
  UsuariosAttributes
} from '../shared/types'

declare global {
  interface Window {
    bridge: {
      updateMessage: (
        callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
      ) => Electron.IpcRenderer
    }
    context: {
      getEquipos_All: () => Promise<EquiposAttributes[]>
      getEquipos_By_Id: (id) => Promise<EquiposAttributes | null>
      getEquipos_By_Categoria: (categoriasid) => Promise<EquiposAttributes[] | null>
      getTipo_Mantenimiento_All: () => Promise<Tipo_MantenimientoAttributes[]>
      getTipo_Mantenimiento_By_Tipo: (tipo) => Promise<Tipo_MantenimientoAttributes | null>
      getCategorias_All: () => Promise<CategoriasAttributes[]>
      getCategorias_By_Nombre: (nombre: string) => Promise<CategoriasAttributes | null>
      getCategorias_By_ID: (id: number) => Promise<CategoriasAttributes | null>
      getEstados_Revision_All: () => Promise<Estados_RevisionAttributes[]>
      getEstados_Revision_By_Nombre: (nombre: string) => Promise<Estados_RevisionAttributes | null>
      getUsuarios_All: () => Promise<UsuariosAttributes[]>
      getUsuarios_By_Rol: (rol: string) => Promise<UsuariosAttributes[]>
      getOrden_Mantenimiento_All: () => Promise<Orden_MantenimientoAttributes[]>
      getPresupuestos_All: () => Promise<PresupuestoAttributes[]>
      getPresupuestos_By_Id: (id: number) => Promise<PresupuestoAttributes>
      getTipo_Mantenimiento_By_Id: (id: number) => Promise<Tipo_MantenimientoAttributes>
      getEstados_Revision_By_Id: (id: number) => Promise<Estados_RevisionAttributes>

      editEquipos_By_Id: (
        id: number,
        updatedEquipoData: EquiposAttributes
      ) => Promise<EquiposAttributes>
      editTipo_Mantenimiento_By_Id: (
        id: number,
        updatedTipoMantenimientoData: Tipo_MantenimientoAttributes
      ) => Promise<Tipo_MantenimientoAttributes>
      editCategorias_By_Id: (
        id: number,
        updatedCategoriaData: CategoriasAttributes
      ) => Promise<CategoriasAttributes>
      editEstados_Revision_By_Id: (
        id: number,
        updatedEstadoRevisionData: Estados_RevisionAttributes
      ) => Promise<Estados_RevisionAttributes>
      editUsuarios_By_Id: (
        id: number,
        updatedUsuarioData: UsuariosAttributes
      ) => Promise<UsuariosAttributes>
      editOrden_Mantenimiento_By_Id: (
        id: number,
        updatedOrdenMantenimientoData: Orden_MantenimientoAttributes
      ) => Promise<Orden_MantenimientoAttributes>
      editPresupuesto_By_Id: (
        id: number,
        updatedPresupuesto: PresupuestoAttributes
      ) => Promise<PresupuestoAttributes>

      deleteEquipos_By_Id: (id: number) => Promise<void>
      deleteTipo_Mantenimiento_By_Id: (id: number) => Promise<void>
      deleteCategorias_By_Id: (id: number) => Promise<void>
      deleteEstados_Revision_By_Id: (id: number) => Promise<void>
      deleteUsuarios_By_Id: (id: number) => Promise<void>
      deleteOrden_Mantenimiento_By_Id: (id: number) => Promise<void>

      createEquipos: (equipoData: EquiposAttributes) => Promise<EquiposAttributes>
      createTipo_Mantenimiento: (
        Tipo_Mantenimiento: Tipo_MantenimientoAttributes
      ) => Promise<Tipo_MantenimientoAttributtes>
      createCategorias: (Categorias: CategoriasAttributes) => Promise<CategoriasAttributes>
      createEstados_Revision: (
        Estados_Revision: Estados_RevisionAttributes
      ) => Promise<Estados_RevisionAttributes>
      createUsuarios: (Usuario: UsuariosAttributes) => Promise<UsuariosAttributes>
      createOrden_Mantenimiento: (
        Orden_Mantenimiento: Orden_MantenimientoAttributes
      ) => Promise<Orden_MantenimientoAttributes>
    }
  }
}
