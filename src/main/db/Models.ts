/* eslint-disable prettier/prettier */

import { DataTypes, Model, Association } from 'sequelize'
import {
  CategoriasAttributes,
  CategoriasCreationAttributes,
  Ciclos_MantenimientoAttributes,
  Ciclos_MantenimientoAttributesCreation,
  EquiposAttributes,
  EquiposCreationAttributes,
  Estados_RevisionAttributes,
  Estados_RevisionCreationAttributes,
  Orden_MantenimientoAttributes,
  Orden_MantenimientoCreationAttributes,
  Tipo_MantenimientoAttributes,
  Tipo_MantenimientoCreationAttributes,
  UsuariosAttributes,
  UsuariosCreationAttributes
} from 'src/shared/types'
import { sequelize } from './config'

export class Equipos
  extends Model<EquiposAttributes, EquiposCreationAttributes>
  implements EquiposAttributes
{
  public ID_Equipo!: number
  public Nombre!: string
  public Identificacion!: string
  public Origen!: string
  public Comentarios!: string
  public TipoMantenimiento!: number
  public CategoriasID!: number
  public Estado!: number

  public static associations: {
    TipoMantenimiento: Association<Equipos, Tipo_Mantenimiento>
    Categorias: Association<Equipos, Categorias>
    Estados_Revision: Association<Equipos, Estados_Revision>
  }
}

export class Tipo_Mantenimiento
  extends Model<Tipo_MantenimientoAttributes, Tipo_MantenimientoCreationAttributes>
  implements Tipo_MantenimientoAttributes
{
  public ID_Tipo_Mantenimiento!: number
  public Tipo!: string
}

export class Categorias
  extends Model<CategoriasAttributes, CategoriasCreationAttributes>
  implements CategoriasAttributes
{
  public ID_Categoria!: number
  public Nombre_Categoria!: string
}

export class Estados_Revision
  extends Model<Estados_RevisionAttributes, Estados_RevisionCreationAttributes>
  implements Estados_RevisionAttributes
{
  public ID_Estado!: number
  public Nombre_Estado!: string
}

export class Usuarios
  extends Model<UsuariosAttributes, UsuariosCreationAttributes>
  implements UsuariosAttributes
{
  public ID_Usuario!: number
  public identificacion!: string
  public Rol!: string
  public contrasena!: string
}

export class Orden_Mantenimiento
  extends Model<Orden_MantenimientoAttributes, Orden_MantenimientoCreationAttributes>
  implements Orden_MantenimientoAttributes
{
  public ID_Orden!: number
  public Descripcion!: string
  public Recursos_Humanos!: string
  public Materiales!: string
  public Observaciones!: string
  public Presupuesto!: number
  public ID_Equipo!: number
  public ID_Usuario!: number
  public estado!: string
  public fecha_inicio!: Date
  public fecha_fin!: Date
  
  

  public static associations: {
    Equipos: Association<Orden_Mantenimiento, Equipos>
    Usuarios: Association<Orden_Mantenimiento, Usuarios>
  }

  set setEquipo(id) {
    this.ID_Equipo = id
  }

  set setUsuario(id) {
    this.ID_Usuario = id
  }
}

Categorias.init(
  {
    ID_Categoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre_Categoria: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Categorias',
    sequelize: sequelize,
    timestamps: false
  }
)

Estados_Revision.init(
  {
    ID_Estado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre_Estado: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Estados_Revision',
    sequelize: sequelize,
    timestamps: false
  }
)

Usuarios.init(
  {
    ID_Usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    identificacion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Rol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Usuarios',
    sequelize: sequelize,
    timestamps: false
  }
)

Orden_Mantenimiento.init(
  {
    ID_Orden: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Recursos_Humanos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Materiales: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Observaciones: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Presupuesto: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ID_Equipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Equipos',
        key: 'ID_Equipo'
      }
    },
    ID_Usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'ID_Usuario'
      }
    },
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    estado:DataTypes.STRING
  },
  {
    tableName: 'Orden_Mantenimiento',
    sequelize: sequelize,
    timestamps: false
  }
)

Tipo_Mantenimiento.init(
  {
    ID_Tipo_Mantenimiento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Tipo_Mantenimiento',
    sequelize: sequelize,
    timestamps: false
  }
)

Equipos.init(
  {
    ID_Equipo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Identificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Origen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Comentarios: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TipoMantenimiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tipo_Mantenimiento',
        key: 'ID_Tipo_Mantenimiento'
      }
    },
    CategoriasID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categorias',
        key: 'ID_Categoria'
      }
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Estados_Revision',
        key: 'ID_Estado'
      }
    }
  },
  {
    tableName: 'Equipos',
    sequelize: sequelize,
    timestamps: false
  }
)

// Associations
Equipos.belongsTo(Tipo_Mantenimiento, { foreignKey: 'TipoMantenimiento' })
Equipos.belongsTo(Categorias, { foreignKey: 'CategoriasID' })
Equipos.belongsTo(Estados_Revision, { foreignKey: 'Estado' })

Orden_Mantenimiento.belongsTo(Equipos, { foreignKey: 'ID_Equipo' })
Orden_Mantenimiento.belongsTo(Usuarios, { foreignKey: 'ID_Usuario' })

