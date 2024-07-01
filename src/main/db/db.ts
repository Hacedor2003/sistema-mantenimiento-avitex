/* eslint-disable prettier/prettier */

import { sequelize } from './config'
import {
  Categorias,
  Equipos,
  Estados_Revision,
  Orden_Mantenimiento,
  Tipo_Mantenimiento,
  Usuarios
} from './Models'

export default async function connectDB(): Promise<void> {
  try {
    await sequelize.authenticate()

    // Sincroniza los modelos con la base de datos
    await Usuarios.sync()
    await Tipo_Mantenimiento.sync()
    await Categorias.sync()
    await Estados_Revision.sync()
    await Equipos.sync()
    await Orden_Mantenimiento.sync()

    console.log('Conexion a la base de datos establecida correctamente.')
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
  }
}
