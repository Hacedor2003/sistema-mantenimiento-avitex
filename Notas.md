

 Base de datos

### Equipos
* Caracteristicas
---Nombre,Identificación,Origen,Comentarios

* Tipo de Mantenimiento 
----- Predeterminado
----- Personaliado

* Categorias
--- Maquina de Herramientas
--- Equipos Tecnologicos
--- Transporte
--- Informatica
--- Equipos Climaticos 

* Estados de Revisicion 
--- Revision ( Intervencion pequena o mediana , reparacion general )
--- Conservacion ( Por error , Materia Prima )
--- No disponibilidad tecnica ( reparable , baja)

### Usuarios

* Tecnico 

-- Revisa ,imprime orden , no modifica

* Administrador 

-- Revisa ,imprime orden , modifica

### Orden de Mantenimiento
---- Descripcion , recursos humanos , materiales (vale) , observaciones , presupuesto


######################################################################

Base de datos: Sistema de Mantenimiento
llaves foráneas (FK)

Tabla: Equipos
- ID_Equipo (PK)
- Nombre
- Identificación
- Origen
- Comentarios
- mantenimiento_lubricante
- mantenimiento
- Tipo_Mantenimiento (FK, Tabla Tipo_Mantenimiento)
- Categoria (FK, Tabla Categorias)
- Estado (FK, Tabla Estados_Revision)

Tabla: Tipo_Mantenimiento
- ID_Tipo_Mantenimiento (PK)
- Tipo (Predeterminado, Personalizado)

Tabla: Categorias
- ID_Categoria (PK)
- Nombre_Categoria

Tabla: Estados_Revision
- ID_Estado (PK)
- Nombre_Estado

Tabla: Usuarios
- ID_Usuario (PK)
- Nombre
- Rol (Tecnico, Administrador)

Tabla: Orden_Mantenimiento
- ID_Orden (PK)
- Descripcion
- tecnico
- repuestos
- duranteMantenimiento
- equiposUsar
- herramientas
- fecha_inicio
- fecha_fin
- ID_Equipo (FK, Tabla Equipos)
- ID_Usuario (FK, Tabla Usuarios)





