/* eslint-disable prettier/prettier */

import {
  Equipos,
  Tipo_Mantenimiento,
  Categorias,
  Estados_Revision,
  Usuarios,
  Orden_Mantenimiento,
  Ciclos_Mantenimiento
} from '../db/Models'

export const createEquipos = async (equipoData) => {
  try {
    const newEquipo = await Equipos.create(equipoData)
    console.log('Equipo creado:', newEquipo.toJSON())
    return newEquipo
  } catch (error) {
    console.error('Error al crear el equipo:', error)
    throw error
  }
}

export const createTipo_Mantenimiento = async (tipoMantenimientoData) => {
  try {
    const newTipoMantenimiento = await Tipo_Mantenimiento.create(tipoMantenimientoData)
    console.log('Tipo de mantenimiento creado:', newTipoMantenimiento.toJSON())
    return newTipoMantenimiento
  } catch (error) {
    console.error('Error al crear el tipo de mantenimiento:', error)
    throw error
  }
}

export const createCategorias = async (categoriaData) => {
  try {
    const newCategoria = await Categorias.create(categoriaData)
    console.log('Categoría creada:', newCategoria.toJSON())
    return newCategoria
  } catch (error) {
    console.error('Error al crear la categoría:', error)
    throw error
  }
}

export const createEstados_Revision = async (estadoRevisionData) => {
  try {
    const newEstadoRevision = await Estados_Revision.create(estadoRevisionData)
    console.log('Estado de revisión creado:', newEstadoRevision.toJSON())
    return newEstadoRevision
  } catch (error) {
    console.error('Error al crear el estado de revisión:', error)
    throw error
  }
}

export const createUsuarios = async (usuarioData) => {
  try {
    const newUsuario = await Usuarios.create(usuarioData)
    console.log('Usuario creado:', newUsuario.toJSON())
    return newUsuario
  } catch (error) {
    console.error('Error al crear el usuario:', error)
    throw error
  }
}

export const createOrden_Mantenimiento = async (ordenMantenimientoData) => {
  try {
    const newOrdenMantenimiento = await Orden_Mantenimiento.create(ordenMantenimientoData)
    console.log('Orden de mantenimiento creada:', newOrdenMantenimiento.toJSON())
    return newOrdenMantenimiento
  } catch (error) {
    console.error('Error al crear la orden de mantenimiento:', error)
    throw error
  }
}
