/* eslint-disable prettier/prettier */

import { DataTypes, Model, Association } from 'sequelize'
import {
  CategoriasAttributes,
  CategoriasCreationAttributes,
  EquiposAttributes,
  EquiposCreationAttributes,
  Estados_RevisionAttributes,
  Estados_RevisionCreationAttributes,
  Orden_MantenimientoAttributes,
  Orden_MantenimientoCreationAttributes,
  PresupuestoAttributes,
  PresupuestoCreationAttributes,
  Tipo_MantenimientoAttributes,
  Tipo_MantenimientoCreationAttributes,
  UsuariosAttributes,
  UsuariosCreationAttributes
} from '../../shared/types'
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
  public fecha_lubricamiento!: string
  public fecha_mantenimiento!: string

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
  public ID_Equipo!: number
  public ID_Usuario!: number
  public ID_Estado!: number
  public ID_Area!: number
  public ID_Presupuesto!: number
  public organismo!: string
  public horarioParada!: string
  public horarioComienzo!: string
  public horarioPuestaMarcha!: string
  public horarioCulminacion!: string
  public materialesUsados!: string
  public observaciones!: string
  public solicitadoPor!: string
  public aprobadoPor!: string
  public terminadoPor!: string
  public revisadoPor!: string
  public valeSalida!: string
  public objetivos!: string
  public tipo_trabajo!: string
  public empresa!: string
  public unidad!: string
  public fecha!: Date
  public presupuesto!: number

  public static associations: {
    Equipos: Association<Orden_Mantenimiento, Equipos>
    Usuarios: Association<Orden_Mantenimiento, Usuarios>
    Presupuesto: Association<Orden_Mantenimiento, Presupuesto>
  }
}
export class Presupuesto extends Model<PresupuestoAttributes, PresupuestoCreationAttributes> {
  public ID_Presupuesto!: number
  public Tipo!: string
  public monto!: number
  public Fecha!: Date

  public static associations: {
    Orden_Mantenimiento: Association<Presupuesto, Orden_Mantenimiento>
  }
}

Presupuesto.init(
  {
    ID_Presupuesto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'Presupuesto',
    sequelize: sequelize,
    timestamps: false
  }
)

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
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario: Usuarios) => {
        usuario.identificacion = 'admin'
        usuario.Rol = 'admin'
        usuario.contrasena = 'admin'
      }
    }
  }
)

Orden_Mantenimiento.init(
  {
    ID_Orden: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
    ID_Estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_Area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_Presupuesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Presupuesto',
        key: 'ID_Presupuesto'
      }
    },
    organismo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    horarioParada: {
      type: DataTypes.STRING,
      allowNull: true
    },
    horarioComienzo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    horarioPuestaMarcha: {
      type: DataTypes.STRING,
      allowNull: true
    },
    horarioCulminacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    materialesUsados: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true
    },
    solicitadoPor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aprobadoPor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    terminadoPor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    revisadoPor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valeSalida: {
      type: DataTypes.STRING,
      allowNull: true
    },
    objetivos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_trabajo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    presupuesto: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
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
    },
    fecha_mantenimiento: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    fecha_lubricamiento: {
      type: DataTypes.JSONB,
      allowNull: false
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
Orden_Mantenimiento.belongsTo(Presupuesto, { foreignKey: 'ID_Presupuesto', as: 'Presupuesto' })

Presupuesto.hasMany(Orden_Mantenimiento, {
  foreignKey: 'ID_Presupuesto',
  as: 'Ordenes_Mantenimiento'
})
