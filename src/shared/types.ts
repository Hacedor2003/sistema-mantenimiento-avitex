/* eslint-disable prettier/prettier */
import { Optional } from 'sequelize'

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
  estado: string
  fecha_inicio: Date
  fecha_fin: Date
}

export interface EquiposCreationAttributes extends Optional<EquiposAttributes, 'ID_Equipo'> {}

export interface Tipo_MantenimientoCreationAttributes
  extends Optional<Tipo_MantenimientoAttributes, 'ID_Tipo_Mantenimiento'> {}

export interface CategoriasCreationAttributes
  extends Optional<CategoriasAttributes, 'ID_Categoria'> {}

export interface Estados_RevisionCreationAttributes
  extends Optional<Estados_RevisionAttributes, 'ID_Estado'> {}

export interface UsuariosCreationAttributes extends Optional<UsuariosAttributes, 'ID_Usuario'> {}

export interface Orden_MantenimientoCreationAttributes
  extends Optional<Orden_MantenimientoAttributes, 'ID_Orden'> {}
