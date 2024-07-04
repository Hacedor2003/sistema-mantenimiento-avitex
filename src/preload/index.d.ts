import {
  Categorias,
  Equipos,
  Estados_Revision,
  Orden_Mantenimiento,
  Tipo_Mantenimiento,
  Usuarios
} from 'src/main/db/Models'
import {
  CategoriasAttributes,
  UsuariosAttributes,
  Tipo_MantenimientoAttributes,
  Orden_MantenimientoAttributes,
  Estados_RevisionAttributes,
  EquiposAttributes
} from '../shared/types'

declare global {
  interface Window {
    context: {
      getEquipos_All: () => Promise<Equipos[]>
      getEquipos_By_Id: (id) => Promise<Equipos | null>
      getEquipos_By_Categoria: (categoriasid) => Promise<Equipos[] | null>
      getTipo_Mantenimiento_All: () => Promise<Tipo_Mantenimiento[]>
      getTipo_Mantenimiento_By_Tipo: (tipo) => Promise<Tipo_Mantenimiento | null>
      getCategorias_All: () => Promise<Categorias[]>
      getCategorias_By_Nombre: (nombre: string) => Promise<Categorias | null>
      getCategorias_By_ID: (id: number) => Promise<Categorias | null>
      getEstados_Revision_All: () => Promise<Estados_Revision[]>
      getEstados_Revision_By_Nombre: (nombre: string) => Promise<Estados_Revision | null>
      getUsuarios_All: () => Promise<Usuarios[]>
      getUsuarios_By_Rol: (rol: string) => Promise<Usuarios[]>
      getOrden_Mantenimiento_All: () => Promise<Orden_Mantenimiento[]>

      editEquipos_By_Id: (id: number, updatedEquipoData: Equipos) => Promise<Equipos>
      editTipo_Mantenimiento_By_Id: (
        id: number,
        updatedTipoMantenimientoData: Tipo_Mantenimiento
      ) => Promise<Tipo_Mantenimiento>
      editCategorias_By_Id: (id: number, updatedCategoriaData: Categorias) => Promise<Categorias>
      editEstados_Revision_By_Id: (
        id: number,
        updatedEstadoRevisionData: Estados_Revision
      ) => Promise<Estados_Revision>
      editUsuarios_By_Id: (id: number, updatedUsuarioData: Usuarios) => Promise<Usuarios>
      editOrden_Mantenimiento_By_Id: (
        id: number,
        updatedOrdenMantenimientoData: Orden_Mantenimiento
      ) => Promise<Orden_Mantenimiento>

      deleteEquipos_By_Id: (id: number) => Promise<void>
      deleteTipo_Mantenimiento_By_Id: (id: number) => Promise<void>
      deleteCategorias_By_Id: (id: number) => Promise<void>
      deleteEstados_Revision_By_Id: (id: number) => Promise<void>
      deleteUsuarios_By_Id: (id: number) => Promise<void>
      deleteOrden_Mantenimiento_By_Id: (id: number) => Promise<void>

      createEquipos: (equipoData: EquiposAttributes) => Promise<Equipos>
      createTipo_Mantenimiento: (
        Tipo_Mantenimiento: Tipo_MantenimientoAttributes
      ) => Promise<Tipo_Mantenimiento>
      createCategorias: (Categorias: CategoriasAttributes) => Promise<Categorias>
      createEstados_Revision: (
        Estados_Revision: Estados_RevisionAttributes
      ) => Promise<Estados_Revision>
      createUsuarios: (Usuario: UsuariosAttributes) => Promise<Usuarios>
      createOrden_Mantenimiento: (
        Orden_Mantenimiento: Orden_MantenimientoAttributes
      ) => Promise<Orden_Mantenimiento>
    }
  }
}
