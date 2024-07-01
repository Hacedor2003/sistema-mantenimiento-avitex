/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Equipos, Tipo_Mantenimiento, Categorias, Estados_Revision, Usuarios, Orden_Mantenimiento } from "../db/Models";

export const deleteEquipos_By_Id = async (id) => {
  try {
    const deletedEquipo = await Equipos.destroy({ where: { ID_Equipo: id } });
    if (deletedEquipo === 0) {
      console.log(`No se encontró un equipo con ID ${id} para eliminar.`);
    } else {
      console.log(`Se eliminó el equipo con ID ${id}.`);
    }
  } catch (error) {
    console.error(`Error al eliminar el equipo con ID ${id}:`, error);
    throw error;
  }
};

export const deleteTipo_Mantenimiento_By_Id = async (id) => {
  try {
    const deletedTipoMantenimiento = await Tipo_Mantenimiento.destroy({ where: { ID_Tipo_Mantenimiento: id } });
    if (deletedTipoMantenimiento === 0) {
      console.log(`No se encontró un tipo de mantenimiento con ID ${id} para eliminar.`);
    } else {
      console.log(`Se eliminó el tipo de mantenimiento con ID ${id}.`);
    }
  } catch (error) {
    console.error(`Error al eliminar el tipo de mantenimiento con ID ${id}:`, error);
    throw error;
  }
};

export const deleteCategorias_By_Id = async (id) => {
  try {
    const deletedCategoria = await Categorias.destroy({ where: { ID_Categoria: id } });
    if (deletedCategoria === 0) {
      console.log(`No se encontró una categoría con ID ${id} para eliminar.`);
    } else {
      console.log(`Se eliminó la categoría con ID ${id}.`);
    }
  } catch (error) {
    console.error(`Error al eliminar la categoría con ID ${id}:`, error);
    throw error;
  }
};

export const deleteEstados_Revision_By_Id = async (id) => {
  try {
    const deletedEstadoRevision = await Estados_Revision.destroy({ where: { ID_Estado: id } });
    if (deletedEstadoRevision === 0) {
      console.log(`No se encontró un estado de revisión con ID ${id} para eliminar.`);
    } else {
      console.log(`Se eliminó el estado de revisión con ID ${id}.`);
    }
  } catch (error) {
    console.error(`Error al eliminar el estado de revisión con ID ${id}:`, error);
    throw error;
  }
};

export const deleteUsuarios_By_Id = async (id) => {
  try {
    const deletedUsuario = await Usuarios.destroy({ where: { ID_Usuario: id } });
    if (deletedUsuario === 0) {
      console.log(`No se encontró un usuario con ID ${id} para eliminar.`);
    } else {
      console.log(`Se eliminó el usuario con ID ${id}.`);
    }
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};

export const deleteOrden_Mantenimiento_By_Id = async (id) => {
  try {
    const deletedOrdenMantenimiento = await Orden_Mantenimiento.destroy({ where: { ID_Orden: id } });
    if (deletedOrdenMantenimiento === 0) {
      console.log(`No se encontró una orden de mantenimiento con ID ${id} para eliminar.`);
    } else {
      console.log(`Se eliminó la orden de mantenimiento con ID ${id}.`);
    }
  } catch (error) {
    console.error(`Error al eliminar la orden de mantenimiento con ID ${id}:`, error);
    throw error;
  }
};
