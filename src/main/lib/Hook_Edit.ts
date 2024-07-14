/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
  Equipos,
  Tipo_Mantenimiento,
  Categorias,
  Estados_Revision,
  Usuarios,
  Orden_Mantenimiento,
  Presupuesto,
} from '../db/Models'

export const editEquipos_By_Id = async (id, updatedEquipoData) => {
  try {
    const [updatedCount, [updatedEquipo]] = await Equipos.update(updatedEquipoData, {
      where: { ID_Equipo: id },
      returning: true
    })
    if (updatedCount === 0) {
      console.log(`No se encontró un equipo con ID ${id} para actualizar.`)
    } else {
      console.log(`Se actualizó el equipo con ID ${id}:`, updatedEquipo.toJSON())
    }
    return updatedEquipo
  } catch (error) {
    console.error(`Error al actualizar el equipo con ID ${id}:`, error)
    throw error
  }
}

export const editTipo_Mantenimiento_By_Id = async (id, updatedTipoMantenimientoData) => {
  try {
    const [updatedCount, [updatedTipoMantenimiento]] = await Tipo_Mantenimiento.update(
      updatedTipoMantenimientoData,
      {
        where: { ID_Tipo_Mantenimiento: id },
        returning: true
      }
    )
    if (updatedCount === 0) {
      console.log(`No se encontró un tipo de mantenimiento con ID ${id} para actualizar.`)
    } else {
      console.log(
        `Se actualizó el tipo de mantenimiento con ID ${id}:`,
        updatedTipoMantenimiento.toJSON()
      )
    }
    return updatedTipoMantenimiento
  } catch (error) {
    console.error(`Error al actualizar el tipo de mantenimiento con ID ${id}:`, error)
    throw error
  }
}

export const editCategorias_By_Id = async (id, updatedCategoriaData) => {
  try {
    const [updatedCount, [updatedCategoria]] = await Categorias.update(updatedCategoriaData, {
      where: { ID_Categoria: id },
      returning: true
    })
    if (updatedCount === 0) {
      console.log(`No se encontró una categoría con ID ${id} para actualizar.`)
    } else {
      console.log(`Se actualizó la categoría con ID ${id}:`, updatedCategoria.toJSON())
    }
    return updatedCategoria
  } catch (error) {
    console.error(`Error al actualizar la categoría con ID ${id}:`, error)
    throw error
  }
}

export const editEstados_Revision_By_Id = async (id, updatedEstadoRevisionData) => {
  try {
    const [updatedCount, [updatedEstadoRevision]] = await Estados_Revision.update(
      updatedEstadoRevisionData,
      {
        where: { ID_Estado: id },
        returning: true
      }
    )
    if (updatedCount === 0) {
      console.log(`No se encontró un estado de revisión con ID ${id} para actualizar.`)
    } else {
      console.log(
        `Se actualizó el estado de revisión con ID ${id}:`,
        updatedEstadoRevision.toJSON()
      )
    }
    return updatedEstadoRevision
  } catch (error) {
    console.error(`Error al actualizar el estado de revisión con ID ${id}:`, error)
    throw error
  }
}

export const editUsuarios_By_Id = async (id, updatedUsuarioData) => {
  try {
    const [updatedCount, [updatedUsuario]] = await Usuarios.update(updatedUsuarioData, {
      where: { ID_Usuario: id },
      returning: true
    })
    if (updatedCount === 0) {
      console.log(`No se encontró un usuario con ID ${id} para actualizar.`)
    } else {
      console.log(`Se actualizó el usuario con ID ${id}:`, updatedUsuario.toJSON())
    }
    return updatedUsuario
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error)
    throw error
  }
}

export const editOrden_Mantenimiento_By_Id = async (id, updatedOrdenMantenimientoData) => {
  try {
    const [updatedCount, [updatedOrdenMantenimiento]] = await Orden_Mantenimiento.update(
      updatedOrdenMantenimientoData,
      {
        where: { ID_Orden: id },
        returning: true
      }
    )
    if (updatedCount === 0) {
      console.log(`No se encontró una orden de mantenimiento con ID ${id} para actualizar.`)
    } else {
      console.log(
        `Se actualizó la orden de mantenimiento con ID ${id}:`,
        updatedOrdenMantenimiento.toJSON()
      )
    }
    return updatedOrdenMantenimiento
  } catch (error) {
    console.error(`Error al actualizar la orden de mantenimiento con ID ${id}:`, error)
    throw error
  }
}

export const editPresupuesto_By_Id = async (id, updatedPresupuestoData) => {
  try {
    const [updatedCount, [updatedPresupuesto]] = await Presupuesto.update(
      updatedPresupuestoData,
      {
        where: { ID_Presupuesto: id },
        returning: true
      }
    );

    if (updatedCount === 0) {
      console.log(`No se encontró un presupuesto con ID ${id} para actualizar.`);
    } else {
      console.log(
        `Se actualizó el presupuesto con ID ${id}:`,
        updatedPresupuesto.toJSON()
      );
    }

    return updatedPresupuesto;
  } catch (error) {
    console.error(`Error al actualizar el presupuesto con ID ${id}:`, error);
    throw error;
  }
};
