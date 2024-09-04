/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
  Categorias,
  Equipos,
  Estados_Revision,
  Orden_Mantenimiento,
  Presupuesto,
  Tipo_Mantenimiento,
  Usuarios
} from '../db/Models'

export const getEquipos_All = async () => {
  try {
    const equipos = await Equipos.findAll()
    return equipos.map(e=>e.dataValues)
  } catch (error) {
    console.error('Error al obtener todos los equipos:', error)
    throw error
  }
}

export const getEquipos_By_Id = async (id) => {
  try {
    const equipo = await Equipos.findByPk(id)
    return equipo?.dataValues
  } catch (error) {
    console.error(`Error al obtener el equipo con ID ${id}:`, error)
    throw error
  }
}

export const getEquipos_By_Categoria = async (categoriasid) => {
  try {
    const equipo = await Equipos.findAll({
      where: {
        CategoriasID: categoriasid
      }
    })
    return equipo.map(e=>e.dataValues)
  } catch (error) {
    console.error(`Error al obtener el equipo con categoria ${categoriasid}:`, error)
    throw error
  }
}

export const getTipo_Mantenimiento_All = async () => {
  try {
    const tiposMantenimiento = await Tipo_Mantenimiento.findAll()
    return tiposMantenimiento.map(e=>e.dataValues)
  } catch (error) {
    console.error('Error al obtener todos los tipos de mantenimiento:', error)
    throw error
  }
}

export const getTipo_Mantenimiento_By_Tipo = async (tipo) => {
  try {
    const tipoMantenimiento = await Tipo_Mantenimiento.findOne({ where: { Tipo: tipo } })
    return tipoMantenimiento?.dataValues
  } catch (error) {
    console.error(`Error al obtener el tipo de mantenimiento "${tipo}":`, error)
    throw error
  }
}

export const getTipo_Mantenimiento_By_Id = async (id) => {
  try {
    const tipoMantenimiento = await Tipo_Mantenimiento.findOne({ where: { ID_Tipo_Mantenimiento: id } })
    return tipoMantenimiento?.dataValues
  } catch (error) {
    console.error(`Error al obtener el tipo de mantenimiento "${id}":`, error)
    throw error
  }
}

export const getCategorias_All = async () => {
  try {
    const equipos = await Categorias.findAll()
    return equipos.map(e=>e.dataValues)
  } catch (error) {
    console.error('Error al obtener todos los equipos:', error)
    throw error
  }
}

export const getCategorias_By_Nombre = async (nombre) => {
  try {
    const categoria = await Categorias.findOne({ where: { Nombre_Categoria: nombre } })
    return categoria?.dataValues
  } catch (error) {
    console.error(`Error al obtener la categoría por nombre "${nombre}":`, error)
    throw error
  }
}

export const getCategorias_By_ID = async (id) => {
  try {
    const categoria = await Categorias.findOne({ where: { ID_Categoria: id } })
    return categoria?.dataValues
  } catch (error) {
    console.error(`Error al obtener la categoría por id "${id}":`, error)
    throw error
  }
}

export const getEstados_Revision_All = async () => {
  try {
    const equipos = await Estados_Revision.findAll()
    return equipos.map(e=>e.dataValues)
  } catch (error) {
    console.error('Error al obtener todos los equipos:', error)
    throw error
  }
}

export const getEstados_Revision_By_Nombre = async (nombre) => {
  try {
    const estadoRevision = await Estados_Revision.findOne({ where: { Nombre_Estado: nombre } })
    return estadoRevision?.dataValues
  } catch (error) {
    console.error(`Error al obtener el estado de revisión por nombre "${nombre}":`, error)
    throw error
  }
}

export const getEstados_Revision_By_Id = async (id) => {
  try {
    const estadoRevision = await Estados_Revision.findOne({ where: { ID_Estado: id } })
    return estadoRevision?.dataValues
  } catch (error) {
    console.error(`Error al obtener el estado de revisión por id "${id}":`, error)
    throw error
  }
}

export const getUsuarios_All = async () => {
  try {
    const equipos = await Usuarios.findAll()
    return equipos.map(e=>e.dataValues)
  } catch (error) {
    console.error('Error al obtener todos los equipos:', error)
    throw error
  }
}

export const getUsuarios_By_Rol = async (rol) => {
  try {
    const usuarios = await Usuarios.findAll({ where: { Rol: rol } })
    return usuarios.map(e=>e.dataValues)
  } catch (error) {
    console.error(`Error al obtener los usuarios por rol "${rol}":`, error)
    throw error
  }
}

export const getOrden_Mantenimiento_All = async () => {
  try {
    const equipos = await Orden_Mantenimiento.findAll()
    return equipos.map(e=>e.dataValues)
  } catch (error) {
    console.error('Error al obtener todos los equipos:', error)
    throw error
  }
}

export const getPresupuestos_All = async () => {
  try {
    return (await Presupuesto.findAll()).map(e=>e.dataValues)
  } catch (error) {
    console.error('Error al obtener todos los presupuestos:', error)
    throw error
  }
}

export const getPresupuestos_By_Id = async (id:number) => {
  try {
    return (await Presupuesto.findOne({ where: { ID_Presupuesto: id } }))?.dataValues
  } catch (error) {
    console.error(`Error al obtener el presupuestos por id "${id}":`, error)
    throw error
  }
}
