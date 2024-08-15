/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component'
import { useCallback, useEffect, useState } from 'react'
import {
  Categorias,
  Equipos,
  Estados_Revision,
  Orden_Mantenimiento,
  Presupuesto,
  Tipo_Mantenimiento,
  Usuarios
} from 'src/main/db/Models'
import { addDays } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { SelectComponent } from '@renderer/components/UI_Component'
import { Orden_MantenimientoAttributes, PresupuestoAttributes } from 'src/shared/types'

export interface fechaType {
  startDate: Date
  endDate: Date
  key: string
  tipoMantenimiento: string
}

const Anadir = (): JSX.Element => {
  const [fechaMantenimiento, setFechaMantenimiento] = useState<fechaType[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
      tipoMantenimiento: ''
    }
  ])
  const [fecha_mantenimiento, setFecha_mantenimiento] = useState<fechaType[]>([])
  const [fechaLubricamiento, setFechaLubricamiento] = useState<fechaType[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
      tipoMantenimiento: ''
    }
  ])
  const [fecha_lubricamiento, setFecha_lubricamiento] = useState<fechaType[]>([])
  const [ver, setVer] = useState<  "editar-orden"    | 'area'    | 'maquinaria'    | 'usuario'    | 'mantenimiento'    | 'estado'    | 'editar-presupuesto'    | 'editar-area'    | 'editar-maquinaria'    | 'editar-usuario'    | 'editar-mantenimiento'    | 'editar-estado'    | ''>('')

  const [estadoData, setEstadoData] = useState<Estados_Revision[]>([])
  const [tipoMantenimientoData, setTipoMantenimientoData] = useState<Tipo_Mantenimiento[]>([])
  const [categoriaData, setcategoriaData] = useState<Categorias[]>([])
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([])
  const [maquinarias, setMaquinarias] = useState<Equipos[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([])

  /* Para filtras las maquinas */
  const [maquinariasFilter, setMaquinariasFilter] = useState(maquinarias)
  const [filterMaquinas, setFilterMaquinas] = useState<string>('Todo')
  const [filterMaquinaText, setFilterMaquinaText] = useState<string>('Todo')
  const [selectedMaquinaria, setSelectedMaquinaria] = useState<Equipos | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const idBorrar = parseInt(formData.get('borrar') as string)
    const idEditar = parseInt(formData.get('editar') as string)

    try {
      switch (ver) {
        case 'area':
          {
            const newCategoria = await window.context.createCategorias({
              Nombre_Categoria: formData.get('nombre') as string
            })
            if (newCategoria) {
              window.alert('Categoría creada exitosamente')
            }
          }
          break
        case 'maquinaria':
          {
            const newEquipo = await window.context.createEquipos({
              TipoMantenimiento: 1,
              Origen: formData.get('origen') as string,
              Nombre: formData.get('nombre') as string,
              Identificacion: formData.get('iden') as string,
              Estado: parseInt(formData.get('estado') as string),
              Comentarios: formData.get('comentarios') as string,
              CategoriasID: parseInt(formData.get('categoria') as string),
              fecha_mantenimiento: fecha_mantenimiento.map((item) => ({
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                key: item.key,
                tipoMantenimiento: item.tipoMantenimiento
              })),
              fecha_lubricamiento: fecha_lubricamiento.map((item) => ({
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                key: item.key
              }))
            })
            if (newEquipo) {
              window.alert('Equipo creado exitosamente')
            }
          }
          break
        case 'usuario':
          {
            const equipo = await window.context.createUsuarios({
              Rol: 'user',
              identificacion: formData.get('nombre') as string,
              contrasena: formData.get('contrasena') as string
            })
            if (equipo) {
              window.alert('Usuario creado exitosamente')
            }
          }
          break
        case 'estado':
          {
            const newEstado = await window.context.createEstados_Revision({
              Nombre_Estado: formData.get('nombre') as string
            })
            if (newEstado) {
              window.alert('Estado creado exitosamente')
            }
          }
          break
        case 'mantenimiento':
          {
            const newMantenimiento = await window.context.createTipo_Mantenimiento({
              Tipo: formData.get('nombre') as string
            })
            if (newMantenimiento) {
              window.alert('Tipo de Mantenimiento creado exitosamente')
            }
          }
          break
        case 'editar-presupuesto':
          {
            const idPresupuesto = parseInt(formData.get('idpresupuesto') as string)
            const prevPresupuesto = await window.context.getPresupuestos_By_Id(idPresupuesto)
            const newPresupuestoEdited:PresupuestoAttributes = { ...prevPresupuesto.dataValues}
            newPresupuestoEdited.monto = parseInt(formData.get('presupuesto') as string)
            newPresupuestoEdited.Fecha = new Date()
            const newPresupuesto = await window.context.editPresupuesto_By_Id( idPresupuesto, newPresupuestoEdited)
            if (newPresupuesto) {
              alert('Presupuesto Editado Correctamente')
            }
          }
          break
        case 'editar-area':
          {
            if (idBorrar) {
              await window.context.deleteCategorias_By_Id(idBorrar)
              window.alert('Categoría eliminada exitosamente')
            } else if (idEditar) {
              const nombre = formData.get('nombre') as string
              const updatedCategoria = await window.context.editCategorias_By_Id(idEditar, {
                Nombre_Categoria: nombre
              })
              if (updatedCategoria) {
                window.alert('Categoría actualizada exitosamente')
              }
            }
          }
          break
        case 'editar-estado':
          {
            if (idBorrar) {
              await window.context.deleteEstados_Revision_By_Id(idBorrar)
              window.alert('Estado eliminado exitosamente')
            } else if (idEditar) {
              const nombre = formData.get('nombre') as string
              const updatedEstado = await window.context.editEstados_Revision_By_Id(idEditar, {
                Nombre_Estado: nombre
              })
              if (updatedEstado) {
                window.alert('Estado actualizado exitosamente')
              }
            }
          }
          break
        case 'editar-mantenimiento':
          {
            if (idBorrar) {
              await window.context.deleteTipo_Mantenimiento_By_Id(idBorrar)
              window.alert('Tipo de Mantenimiento eliminado exitosamente')
            } else if (idEditar) {
              const nombre = formData.get('nombre') as string
              const updatedTipoMantenimiento = await window.context.editTipo_Mantenimiento_By_Id(
                idEditar,
                { Tipo: nombre }
              )
              if (updatedTipoMantenimiento) {
                window.alert('Tipo de Mantenimiento actualizado exitosamente')
              }
            }
          }
          break
        case 'editar-maquinaria':
          {
            if (idBorrar) {
              await window.context.deleteEquipos_By_Id(idBorrar)
              window.alert('Equipo eliminado exitosamente')
            } else if (idEditar) {
              const nombre = formData.get('nombre') as string
              const identificacion = formData.get('identificacion') as string
              const categoria = formData.get('categoria') as string
              const comentarios = formData.get('comentarios') as string
              const estado = formData.get('estado') as string
              const origen = formData.get('origen') as string
              const mantenimiento = formData.get('mantenimiento') as string
              const fechamantenimiento = fecha_mantenimiento.map((item) => ({
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                key: item.key,
                tipoMantenimiento: item.tipoMantenimiento
              }))
              const fechalubricamiento = fecha_lubricamiento.map((item) => ({
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                key: item.key
              }))
              const updatedEquipo = await window.context.editEquipos_By_Id(idEditar, {
                Nombre: nombre,
                Identificacion: identificacion,
                Origen: origen,
                Comentarios: comentarios,
                TipoMantenimiento: parseInt(mantenimiento),
                CategoriasID: parseInt(categoria),
                Estado: parseInt(estado),
                fecha_lubricamiento: fechalubricamiento,
                fecha_mantenimiento: fechamantenimiento
              })
              if (updatedEquipo) {
                window.alert('Equipo actualizado exitosamente')
              }
            }
          }
          break
        case 'editar-usuario':
          {
            if (idBorrar) {
              await window.context.deleteUsuarios_By_Id(idBorrar)
              window.alert('Usuario eliminado exitosamente')
            } else if (idEditar) {
              const identificacion = formData.get('identificacion') as string
              const rol = formData.get('rol') as string
              const contrasena = formData.get('contrasena') as string

              const updatedUsuario = await window.context.editUsuarios_By_Id(idEditar, {
                identificacion: identificacion,
                Rol: rol,
                contrasena: contrasena
              })
              if (updatedUsuario) {
                window.alert('Usuario actualizado exitosamente')
              }
            }
          }
          break
        case 'editar-orden':{
          if (idBorrar) {
            await window.context.deleteOrden_Mantenimiento_By_Id(idBorrar)
            window.alert('Orden eliminada exitosamente')
          } else if (idEditar) {            
            const prevOrden:Orden_MantenimientoAttributes = {
              ID_Equipo:parseInt(formData.get('ID_Equipo') as string),
              ID_Usuario:parseInt(formData.get('ID_Usuario') as string),
              ID_Estado:parseInt(formData.get('ID_Estado') as string),
              ID_Area:parseInt(formData.get('ID_Area') as string),
              ID_Presupuesto:parseInt(formData.get('ID_Presupuesto') as string),
              horarioParada:formData.get('horarioParada') as string,
              horarioComienzo:formData.get('horarioComienzo') as string,
              horarioPuestaMarcha:formData.get('horarioPuestaMarcha') as string,
              horarioCulminacion:formData.get('horarioCulminacion') as string,
              materialesUsados:formData.get('materialesUsados') as string,
              observaciones:formData.get('observaciones') as string,
              solicitadoPor:formData.get('solicitadoPor') as string,
              aprobadoPor:formData.get('aprobadoPor') as string,
              terminadoPor:formData.get('terminadoPor') as string,
              revisadoPor:formData.get('revisadoPor') as string,
              valeSalida:formData.get('valeSalida') as string,
              objetivos:formData.get('objetivos') as string,
              tipo_trabajo:formData.get('tipo_trabajo') as string,
              tipo_mantenimiento:parseInt(formData.get('tipo_mantenimiento') as string),
              fecha:new Date(formData.get('fecha') as string),
              presupuesto:parseInt(formData.get('presupuesto') as string),
          }

            const updatedUsuario = await window.context.editOrden_Mantenimiento_By_Id(idEditar, prevOrden)
            if (updatedUsuario) {
              window.alert('Orden actualizada exitosamente')
            }
          }
        }
          break
        default:
          break
      }
    } catch (error) {
      console.error(error)
      alert('Existio un Error: ' + error)
    }
  }
  const fetchAllData = useCallback(() => {
    Promise.all([
      window.context.getCategorias_All(),
      window.context.getTipo_Mantenimiento_All(),
      window.context.getEstados_Revision_All(),
      window.context.getPresupuestos_All(),
      window.context.getEquipos_All(),
      window.context.getUsuarios_All(),
      window.context.getOrden_Mantenimiento_All()
    ])
      .then(
        ([
          categoriaData,
          tipoMantenimientoData,
          estadoData,
          presupuestos,
          maquinarias,
          usuarios,
          ordenes
        ]) => {
          setcategoriaData(categoriaData)
          setTipoMantenimientoData(tipoMantenimientoData)
          setEstadoData(estadoData)
          setPresupuestos(presupuestos)
          setMaquinarias(maquinarias)
          setUsuarios(usuarios)
          setOrdenes(ordenes)
        }
      )
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  useEffect(() => {
    setFecha_mantenimiento((prevFecha) => {
      if (
        !prevFecha.some((item) => {
          if (fechaMantenimiento.length > 0) {
            const startDate = new Date(fechaMantenimiento[0].startDate)
            const endDate = new Date(fechaMantenimiento[0].endDate)
            const itemStartDate = new Date(item.startDate)
            const itemEndDate = new Date(item.endDate)

            return (
              itemStartDate.toISOString() === startDate.toISOString() &&
              itemEndDate.toISOString() === endDate.toISOString()
            )
          } else return false
        })
      ) {
        return [...prevFecha, fechaMantenimiento[0]]
      }
      return prevFecha
    })
  }, [fechaMantenimiento])

  useEffect(() => {
    setFecha_lubricamiento((prevFecha) => {
      if (
        !prevFecha.some((item) => {
          if (fechaLubricamiento.length > 0) {
            const startDate = new Date(fechaLubricamiento[0].startDate)
            const endDate = new Date(fechaLubricamiento[0].endDate)
            const itemStartDate = new Date(item.startDate)
            const itemEndDate = new Date(item.endDate)

            return (
              itemStartDate.toISOString() === startDate.toISOString() &&
              itemEndDate.toISOString() === endDate.toISOString()
            )
          } else return false
        })
      ) {
        return [...prevFecha, fechaLubricamiento[0]]
      }
      return prevFecha
    })
  }, [fechaLubricamiento])

  useEffect(() => {
    const lowerCaseFilterText = filterMaquinaText.toLocaleLowerCase();
    const filterMachines = filterMaquinas !== 'Todo';
    const filterText = filterMaquinaText !== 'Todo';
  
    const filteredMaquinarias = (maquinariasFilter.length > 0 ? maquinariasFilter : maquinarias).filter(item => {
      const matchesCategory = !filterMachines || item.dataValues.CategoriasID === parseInt(filterMaquinas);
      const matchesText = !filterText || item.dataValues.Nombre.toLocaleLowerCase().includes(lowerCaseFilterText);
      return matchesCategory && matchesText;
    });
  
    setMaquinariasFilter(filteredMaquinarias.length === 0 ? maquinarias : filteredMaquinarias);
  }, [maquinarias, filterMaquinaText, filterMaquinas]);
  

  const handleDelete = (
    item: fechaType,
    setFunction: React.Dispatch<React.SetStateAction<fechaType[]>>
  ) => {
    setFunction((prevFecha) => {
      return prevFecha.filter((fecha) => {
        const fechaStartDate = new Date(fecha.startDate)
        const fechaEndDate = new Date(fecha.endDate)
        const itemStartDate = new Date(item.startDate)
        const itemEndDate = new Date(item.endDate)

        return (
          fechaStartDate.toISOString() !== itemStartDate.toISOString() ||
          fechaEndDate.toISOString() !== itemEndDate.toISOString()
        )
      })
    })
  }

  const handleTipoMantenimientoChange = (e, index, setFecha_mantenimiento) => {
    const selectedTipoMantenimiento = parseInt(e.target.value)
    setFecha_mantenimiento((prevFecha_mantenimiento) => {
      const updatedFecha_mantenimiento = [...prevFecha_mantenimiento]
      updatedFecha_mantenimiento[index] = {
        ...updatedFecha_mantenimiento[index],
        tipoMantenimiento: selectedTipoMantenimiento
      }
      return updatedFecha_mantenimiento
    })
  }

  return (
    <RootLayout>
      <main className="w-full flex flex-col items-center px-2 text-lg">
        {/* Nav Bar */}
        <div className="w-full flex items-center justify-around">
          <div>
            <h4 className="text-4xl font-serif font-bold my-2">Desea añadir?</h4>
            <div className="p-1 flex items-center gap-x-4">
              <Button_UI funcion={() => setVer('area')} type="button" texto="Area" />
              <Button_UI funcion={() => setVer('maquinaria')} type="button" texto="Equipo" />
              <Button_UI funcion={() => setVer('usuario')} type="button" texto="Usuario" />
              <Button_UI
                funcion={() => setVer('mantenimiento')}
                type="button"
                texto="Tipo de Mantenimiento"
              />
              <Button_UI funcion={() => setVer('estado')} type="button" texto="Estado" />
            </div>
          </div>
          <div>
            <h4 className="text-4xl font-serif font-bold my-2">Desea Editar?</h4>
            <div className="p-1 flex items-center gap-x-4">
              <Button_UI
                funcion={() => setVer('editar-presupuesto')}
                type="button"
                texto="Presupuesto"
              />
              <Button_UI funcion={() => setVer('editar-area')} type="button" texto="Area" />
              <Button_UI funcion={() => setVer('editar-maquinaria')} type="button" texto="Equipo" />
              <Button_UI funcion={() => setVer('editar-usuario')} type="button" texto="Usuario" />
              <Button_UI
                funcion={() => setVer('editar-mantenimiento')}
                type="button"
                texto="Tipo de Mantenimiento"
              />
              <Button_UI funcion={() => setVer('editar-estado')} type="button" texto="Estado" />
              <Button_UI funcion={() => setVer('editar-orden')} type="button" texto="Ordenes" />
            </div>
          </div>
        </div>

        {ver === 'area' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={() => {}}
              name="nombre"
              required
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'maquinaria' && (
          <form
            className="w-full flex flex-col items-center justify-around m-2 gap-y-4"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={() => {}}
              name="nombre"
              required
            />
            <Input_UI
              value={undefined}
              type="text"
              texto="Identificación:"
              funcion={() => {}}
              name="iden"
              required
            />
            <Input_UI
              value={undefined}
              type="text"
              texto="Origen:"
              funcion={() => {}}
              name="origen"
              required
            />
            <Input_UI
              value={undefined}
              type="text"
              texto="Comentarios:"
              funcion={() => {}}
              name="comentarios"
              required
            />
            <label htmlFor="inputEstado">Estado</label>
            <select
              name="estado"
              id="inputEstado"
              className="w-fit border border-black p-2 rounded-md cursor-pointer"
            >
              <option value={-1}> Tipo de Estado </option>
              {estadoData.map((estadoItem, index) => (
                <option key={index} value={estadoItem.dataValues.ID_Estado}>
                  {estadoItem.dataValues.Nombre_Estado}
                </option>
              ))}
            </select>
            <label htmlFor="inputCategoria">Categoria</label>
            <select
              name="categoria"
              id="inputCategoria"
              className="w-fit border border-black p-2 rounded-md cursor-pointer"
            >
              <option value={-1}> Tipo de Area </option>
              {categoriaData.map((categoriaItem, index) => (
                <option key={index} value={categoriaItem.dataValues.ID_Categoria}>
                  {categoriaItem.dataValues.Nombre_Categoria}
                </option>
              ))}
            </select>
            <div className="self-center p-5 flex flex-row items-start justify-center gap-x-10">
              <div>
                <h4>Escoga la fecha del Mantenimiento:</h4>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setFechaMantenimiento([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={fechaMantenimiento}
                />
              </div>
              <div>
                <h3>Mantenimiento</h3>
                <ul>
                  {fecha_mantenimiento.map((item, index) => (
                    <li key={index} className="p-1 flex flex-row items-center">
                      <div className="flex flex-col items-center mx-2">
                        <h6>Fecha Inicial</h6>
                        <p>
                          {new Date(item.startDate).toLocaleDateString() ??
                            item.startDate.toLocaleDateString() ??
                            ''}
                        </p>
                      </div>
                      <div className="flex flex-col items-center mx-2">
                        <h6>Fecha Final</h6>
                        <p>
                          {new Date(item.endDate).toLocaleDateString() ??
                            item.endDate.toLocaleDateString() ??
                            ''}
                        </p>
                      </div>
                      <div>
                        <h6>Tipo de Mantenimiento</h6>
                        <select
                          id="inputMantenimiento"
                          className="w-fit border border-black p-2 rounded-md cursor-pointer"
                          name="tipoMantenimientoFecha"
                          onChange={(e) =>
                            handleTipoMantenimientoChange(e, index, setFecha_mantenimiento)
                          }
                        >
                          <option value={-1}> Tipo de Mantenimiento </option>
                          {tipoMantenimientoData.map((mantenimientoItem, index) => (
                            <option
                              key={index}
                              value={mantenimientoItem.dataValues.ID_Tipo_Mantenimiento}
                            >
                              {mantenimientoItem.dataValues.Tipo}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Button_UI
                        type="button"
                        texto="Borrar"
                        funcion={() => handleDelete(item, setFecha_mantenimiento)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="self-center p-5 flex flex-row items-start justify-center gap-x-10">
              <div>
                <h4>Escoga la fecha del Lubricación:</h4>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setFechaLubricamiento([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={fechaLubricamiento}
                />
              </div>
              <div>
                <h3>Lubricación</h3>
                <ul>
                  {fecha_lubricamiento.map((item, index) => (
                    <li key={index} className="p-1 flex flex-row items-center">
                      <div className="flex flex-col items-center mx-2">
                        <h6>Fecha Inicial</h6>
                        <p>
                          {new Date(item.startDate).toLocaleDateString() ??
                            item.startDate.toLocaleDateString() ??
                            ''}
                        </p>
                      </div>
                      <div className="flex flex-col items-center mx-2">
                        <h6>Fecha Final</h6>
                        <p>
                          {new Date(item.endDate).toLocaleDateString() ??
                            item.endDate.toLocaleDateString() ??
                            ''}
                        </p>
                      </div>
                      <Button_UI
                        type="button"
                        texto="Borrar"
                        funcion={() => handleDelete(item, setFecha_lubricamiento)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'usuario' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={() => {}}
              name="nombre"
              required
            />
            <Input_UI
              value={undefined}
              type="password"
              texto="Contrasena:"
              funcion={() => {}}
              name="contrasena"
              required
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'estado' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={() => {}}
              name="nombre"
              required
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'mantenimiento' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={() => {}}
              name="nombre"
              required
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'editar-presupuesto' && (
          <div className="w-full flex items-center justify-around">
            {presupuestos.map((presupuestoItem, index) => (
              <form
                key={index}
                className="p-2 border-2 border-[#b70909] rounded-xl m-1"
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="idpresupuesto"
                  value={presupuestoItem.dataValues.ID_Presupuesto}
                />
                <Input_UI
                  value={undefined}
                  type="number"
                  texto={`Presupuesto ${presupuestoItem.dataValues.Tipo} ${presupuestoItem.dataValues.monto} CUP`}
                  name="presupuesto"
                  funcion={() => {}}
                  required={false}
                />
                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
            ))}
          </div>
        )}
        {ver === 'editar-area' && (
          <div className="w-full grid grid-cols-3">
            {categoriaData.map((categoriaItem, index) => (
              <section key={index} className="flex gap-x-2 items-end m-1">
                <form
                  onSubmit={handleSubmit}
                  className="p-2 border-2 border-[#b70909] rounded-xl m-1"
                >
                  <input
                    type="hidden"
                    name="editar"
                    value={categoriaItem.dataValues.ID_Categoria}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`${categoriaItem.dataValues.Nombre_Categoria}`}
                    required={false}
                    name="nombre"
                    funcion={() => {}}
                  />
                  <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
                </form>
                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="borrar"
                    value={categoriaItem.dataValues.ID_Categoria}
                  />
                  <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
                </form>
              </section>
            ))}
          </div>
        )}
        {ver === 'editar-estado' && (
          <div className="w-full grid grid-cols-3">
            {estadoData.map((estadoItem, index) => (
              <section key={index} className="flex gap-x-2 items-end m-1">
                <form
                  onSubmit={handleSubmit}
                  className="p-2 border-2 border-[#b70909] rounded-xl m-1"
                >
                  <input type="hidden" name="editar" value={estadoItem.dataValues.ID_Estado} />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`${estadoItem.dataValues.Nombre_Estado}`}
                    required={false}
                    name="nombre"
                    funcion={() => {}}
                  />
                  <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
                </form>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="borrar" value={estadoItem.dataValues.ID_Estado} />
                  <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
                </form>
              </section>
            ))}
          </div>
        )}
        {ver === 'editar-mantenimiento' && (
          <div className="w-full grid grid-cols-3">
            {tipoMantenimientoData.map((tipoMantenimientoItem, index) => (
              <section key={index} className="flex gap-x-2 items-end m-1">
                <form
                  onSubmit={handleSubmit}
                  className="p-2 border-2 border-[#b70909] rounded-xl m-1"
                >
                  <input
                    type="hidden"
                    name="editar"
                    value={tipoMantenimientoItem.dataValues.ID_Tipo_Mantenimiento}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`${tipoMantenimientoItem.dataValues.Tipo}`}
                    required={false}
                    name="nombre"
                    funcion={() => {}}
                  />
                  <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
                </form>
                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="borrar"
                    value={tipoMantenimientoItem.dataValues.ID_Tipo_Mantenimiento}
                  />
                  <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
                </form>
              </section>
            ))}
          </div>
        )}
        {ver === 'editar-maquinaria' && (
          <div className="w-full grid grid-cols-3">
            {/* Buscar Maquinaria */}
            <ul className="col-span-1 flex flex-col items-start">
              <li>
                <SelectComponent
                  options={categoriaData.map((item, index) => (
                    <option key={index} value={item.dataValues.ID_Categoria}>
                      {item.dataValues.Nombre_Categoria}
                    </option>
                  ))}
                  value={parseInt(filterMaquinas)}
                  onChange={setFilterMaquinas}
                  name="filtro"
                  label="Filtro:"
                  id="idFiltro"
                  className=""
                  required={false}
                />
              </li>
              <li>
                <Input_UI
                  value={filterMaquinaText}
                  type="text"
                  texto="Nombre de la maquina"
                  required={false}
                  name="filterMaquina"
                  funcion={setFilterMaquinaText}
                />
              </li>
            </ul>
            <ul className="col-span-1 flex flex-col items-start">
              <li className="text-xl font-bold">Equipos:</li>
              {maquinariasFilter.map((maquinariaItem, index) => {
                const { Nombre, fecha_mantenimiento, fecha_lubricamiento, Identificacion } =
                  maquinariaItem.dataValues

                const handleClick = () => {
                  setSelectedMaquinaria(maquinariaItem)
                  setFechaMantenimiento(fecha_mantenimiento)
                  setFechaLubricamiento(fecha_lubricamiento)
                }

                return (
                  <li key={index} className="flex flex-col">
                    <p onClick={handleClick} className="font-semibold">
                      {Nombre}
                    </p>
                    <p className="text-gray-500">ID: {Identificacion}</p>
                  </li>
                )
              })}
            </ul>

            {selectedMaquinaria && (
              <div className="col-span-1">
                <form
                  onSubmit={handleSubmit}
                  className="p-2 border-2 border-[#b70909] rounded-xl m-1 h-max"
                >
                  <input
                    type="hidden"
                    name="editar"
                    value={selectedMaquinaria?.dataValues.ID_Equipo}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Nombre: ${selectedMaquinaria?.dataValues.Nombre}`}
                    required={false}
                    name="nombre"
                    funcion={() => {}}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Identificacion: ${selectedMaquinaria?.dataValues.Identificacion}`}
                    required={false}
                    name="identificacion"
                    funcion={() => {}}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Categoria ID: ${selectedMaquinaria?.dataValues.CategoriasID}`}
                    required={false}
                    name="categoria"
                    funcion={() => {}}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Comentarios: ${selectedMaquinaria?.dataValues.Comentarios}`}
                    required={false}
                    name="comentarios"
                    funcion={() => {}}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Estado: ${selectedMaquinaria?.dataValues.Estado}`}
                    required={false}
                    name="estado"
                    funcion={() => {}}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Origen: ${selectedMaquinaria?.dataValues.Origen}`}
                    required={false}
                    name="origen"
                    funcion={() => {}}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Tipo Mantenimiento: ${selectedMaquinaria?.dataValues.TipoMantenimiento}`}
                    required={false}
                    name="mantenimiento"
                    funcion={() => {}}
                  />
                  <div className="self-center p-5 flex flex-col items-start justify-center gap-x-10">
                    <div>
                      <h4>Escoga la fecha del Mantenimiento:</h4>
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setFechaMantenimiento([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={selectedMaquinaria.dataValues.fecha_mantenimiento}
                      />
                    </div>
                    <div>
                      <h3>Mantenimiento</h3>
                      <ul>
                        {fecha_mantenimiento.length > 0
                          ? fecha_mantenimiento.map((item, index) => (
                              <li key={index} className="p-1 flex flex-row items-center">
                                <div className="flex flex-col items-center mx-2">
                                  <h6>Fecha Inicial</h6>
                                  <p>
                                    {new Date(item.startDate).toLocaleDateString() ??
                                      item.startDate.toLocaleDateString() ??
                                      ''}
                                  </p>
                                </div>
                                <div className="flex flex-col items-center mx-2">
                                  <h6>Fecha Final</h6>
                                  <p>
                                    {new Date(item.endDate).toLocaleDateString() ??
                                      item.endDate.toLocaleDateString() ??
                                      ''}
                                  </p>
                                </div>
                                <div>
                                  <h6>Tipo de Mantenimiento</h6>
                                  <select
                                    id="inputMantenimiento"
                                    className="w-fit border border-black p-2 rounded-md cursor-pointer"
                                    name="tipoMantenimientoFecha"
                                    onChange={(e) =>
                                      handleTipoMantenimientoChange(
                                        e,
                                        index,
                                        setFecha_mantenimiento
                                      )
                                    }
                                    value={parseInt(item.tipoMantenimiento)}
                                  >
                                    <option value={-1}> Tipo de Mantenimiento </option>
                                    {tipoMantenimientoData.map((mantenimientoItem, index) => (
                                      <option
                                        key={index}
                                        value={mantenimientoItem.dataValues.ID_Tipo_Mantenimiento}
                                      >
                                        {mantenimientoItem.dataValues.Tipo}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <Button_UI
                                  type="button"
                                  texto="Borrar"
                                  funcion={() => handleDelete(item, setFecha_mantenimiento)}
                                />
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                    <div className="self-center p-5 flex flex-col items-start justify-center gap-x-10">
                      <div>
                        <h4>Escoga la fecha del Lubricación:</h4>
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setFechaLubricamiento([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={fechaLubricamiento}
                        />
                      </div>
                      <div>
                        <h3>Lubricación</h3>
                        <ul>
                          {fechaLubricamiento.length > 0
                            ? fecha_lubricamiento.map((item, index) => (
                                <li key={index} className="p-1 flex flex-row items-center">
                                  <div className="flex flex-col items-center mx-2">
                                    <h6>Fecha Inicial</h6>
                                    <p>
                                      {item.startDate
                                        ? new Date(item.startDate).toLocaleDateString() ?? ''
                                        : ''}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-center mx-2">
                                    <h6>Fecha Final</h6>
                                    <p>
                                      {item.endDate
                                        ? new Date(item.endDate).toLocaleDateString() ?? ''
                                        : ''}
                                    </p>
                                  </div>
                                  <Button_UI
                                    type="button"
                                    texto="Borrar"
                                    funcion={() => handleDelete(item, setFecha_lubricamiento)}
                                  />
                                </li>
                              ))
                            : null}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
                </form>
                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="borrar"
                    value={selectedMaquinaria?.dataValues.ID_Equipo}
                  />
                  <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
                </form>
              </div>
            )}
          </div>
        )}
        {ver === 'editar-usuario' && (
          <div className="w-full grid grid-cols-3">
            {usuarios.map((usuarioItem, index) => (
              <section key={index} className="flex gap-x-2 items-end m-1">
                <form
                  onSubmit={handleSubmit}
                  className="p-2 border-2 border-[#b70909] rounded-xl m-1"
                >
                  <input type="hidden" name="editar" value={usuarioItem.dataValues.ID_Usuario} />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`User: ${usuarioItem.dataValues.identificacion}`}
                    required={false}
                    name="identificacion"
                    funcion={() => {}}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Rol: ${usuarioItem.dataValues.Rol}`}
                    required={false}
                    name="rol"
                    funcion={() => {}}
                  />
                  <Input_UI
                    value={undefined}
                    type="text"
                    texto={`Contraseña: ${usuarioItem.dataValues.contrasena}`}
                    required={false}
                    name="contrasena"
                    funcion={() => {}}
                  />
                  <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
                </form>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="borrar" value={usuarioItem.dataValues.ID_Usuario} />
                  <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
                </form>
              </section>
            ))}
          </div>
        )}
        {ver === 'editar-orden' && (
          <div className="w-full grid grid-cols-3">
            {ordenes.map((orden, index) => (
              <section key={index} className="flex gap-x-2 items-end m-1">
                <form
                  onSubmit={handleSubmit}
                  className="p-2 border-2 border-[#b70909] rounded-xl m-1"
                >
                  <input type="hidden" name="editar" value={orden.dataValues.ID_Orden} />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.horarioParada}
                    type="text"
                    texto="horarioParada"
                    name="horarioParada"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.horarioComienzo}
                    type="text"
                    texto="horarioComienzo"
                    name="horarioComienzo"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.horarioPuestaMarcha}
                    type="text"
                    texto="horarioPuestaMarcha"
                    name="horarioPuestaMarcha"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.horarioCulminacion}
                    type="text"
                    texto="horarioCulminacion"
                    name="horarioCulminacion"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.materialesUsados}
                    type="text"
                    texto="materialesUsados"
                    name="materialesUsados"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.observaciones}
                    type="text"
                    texto="observaciones"
                    name="observaciones"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.solicitadoPor}
                    type="text"
                    texto="solicitadoPor"
                    name="solicitadoPor"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.aprobadoPor}
                    type="text"
                    texto="aprobadoPor"
                    name="aprobadoPor"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.terminadoPor}
                    type="text"
                    texto="terminadoPor"
                    name="terminadoPor"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.revisadoPor}
                    type="text"
                    texto="revisadoPor"
                    name="revisadoPor"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.valeSalida}
                    type="text"
                    texto="valeSalida"
                    name="valeSalida"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.objetivos}
                    type="text"
                    texto="objetivos"
                    name="objetivos"
                    funcion={() => {}}
                  />
                  <Input_UI
                    required={false}
                    value={orden.dataValues.presupuesto}
                    type="text"
                    texto="presupuesto"
                    name="fecha"
                    funcion={() => {}}
                  />

                  <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
                </form>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="borrar" value={orden.dataValues.ID_Orden} />
                  <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
                </form>
              </section>
            ))}
          </div>
        )}
      </main>
    </RootLayout>
  )
}

export default Anadir
