export interface EquiposAttributes {
  ID_Equipo?: number
  Nombre: string
  Identificacion: string
  Origen: string
  Comentarios: string
  TipoMantenimiento: number
  CategoriasID: number
  Estado: number
}

export interface Tipo_MantenimientoAttributes {
  ID_Tipo_Mantenimiento?: number
  Tipo: string
}

export interface CategoriasAttributes {
  ID_Categoria?: number
  Nombre_Categoria: string
}

export interface Estados_RevisionAttributes {
  ID_Estado?: number
  Nombre_Estado: string
}

export interface UsuariosAttributes {
  ID_Usuario?: number
  identificacion: string
  Rol: string
  contrasena: string
}

export interface Orden_MantenimientoAttributes {
  ID_Orden?: number
  Descripcion: string
  Recursos_Humanos: string
  Materiales: string
  Observaciones: string
  Presupuesto: number
  ID_Equipo: number
  ID_Usuario: number
}
