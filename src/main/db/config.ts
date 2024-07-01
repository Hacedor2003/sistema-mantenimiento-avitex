import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('sistema-mantenimiento', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})
