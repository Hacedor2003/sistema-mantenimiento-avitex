/* eslint-disable prettier/prettier */
import { AppContext } from '@renderer/Data/Store'
import { RootLayout } from '@renderer/components/AppLayout'
import {
  Button_UI,
  Input_UI,
  Input_UI_subTexto,
  SelectComponent
} from '@renderer/components/UI_Component'
import { addDays } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { useParams } from 'react-router-dom'
import {
  Categorias,
  Equipos,
  Estados_Revision,
  Orden_Mantenimiento,
  Presupuesto,
  Tipo_Mantenimiento,
  Usuarios
} from 'src/main/db/Models'
import { PresupuestoAttributes } from 'src/shared/types'
import { fechaType } from './Anadir'

const Editar = () => {
  const { opcion: ver } = useParams()
  const context = useContext(AppContext)

  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([])
  const [maquinarias, setMaquinarias] = useState<Equipos[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([])
  const [tipoMantenimientoData, setTipoMantenimientoData] = useState<Tipo_Mantenimiento[]>([])
  const [categoriaData, setcategoriaData] = useState<Categorias[]>([])
  const [estadoData, setEstadoData] = useState<Estados_Revision[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const idBorrar = parseInt(formData.get('borrar') as string)
    const idEditar = parseInt(formData.get('editar') as string)

    try {
      switch (ver) {
        case 'presupuesto':
          {
            const idPresupuesto = parseInt(formData.get('idpresupuesto') as string)
            const prevPresupuesto = await window.context.getPresupuestos_By_Id(idPresupuesto)
            const newPresupuestoEdited: PresupuestoAttributes = { ...prevPresupuesto.dataValues }
            newPresupuestoEdited.monto = parseInt(formData.get('presupuesto') as string)
            newPresupuestoEdited.Fecha = new Date()
            const newPresupuesto = await window.context.editPresupuesto_By_Id(
              idPresupuesto,
              newPresupuestoEdited
            )
            if (newPresupuesto) {
              alert('Presupuesto Editado Correctamente')
            }
          }
          break
        case 'area':
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
        case 'estado':
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
        case 'mantenimiento':
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
        case 'maquinaria':
          {
            if (idBorrar) {
              await window.context.deleteEquipos_By_Id(idBorrar)
              window.alert('Equipo eliminado exitosamente')
            } else if (idEditar) {
              const prevEquipo = maquinarias.find((i) => i.dataValues.ID_Equipo === idEditar)
              const nombre = ((formData.get('nombre') as string) ?? '').length > 0 ? (formData.get('nombre') as string) : prevEquipo!.dataValues.Nombre
              const identificacion = ((formData.get('identificacion') as string) ?? '').length > 0 ? (formData.get('identificacion') as string) : prevEquipo!.dataValues.Identificacion
              const categoria = ((formData.get('categoria') as string) ?? '').length > 0 ? (formData.get('categoria') as string) : prevEquipo!.dataValues.CategoriasID
              const comentarios = ((formData.get('comentarios') as string) ?? '').length > 0 ? (formData.get('comentarios') as string) : prevEquipo!.dataValues.Comentarios
              const estado = ((formData.get('estado') as string) ?? '').length > 0 ? (formData.get('estado') as string) : prevEquipo!.dataValues.Estado
              const origen = ((formData.get('origen') as string) ?? '').length > 0 ? (formData.get('origen') as string) : prevEquipo!.dataValues.Origen
              const mantenimiento = ((formData.get('mantenimiento') as string) ?? '').length > 0 ? (formData.get('mantenimiento') as string) : prevEquipo!.dataValues.TipoMantenimiento
              const fechamantenimiento = fechaMantenimiento.map((item) => ({
                startDate: new Date(item.startDate).toISOString(),
                endDate: new Date(item.endDate).toISOString(),
                key: item.key,
                tipoMantenimiento: item.tipoMantenimiento
              }))
              const fechalubricamiento = fechaLubricamiento.map((item) => ({
                startDate: new Date(item.startDate).toISOString(),
                endDate: new Date(item.endDate).toISOString(),
                key: item.key
              }))
              const updatedEquipo = await window.context.editEquipos_By_Id(idEditar, {
                Nombre: nombre,
                Identificacion: identificacion,
                Origen: origen,
                Comentarios: comentarios,
                TipoMantenimiento: parseInt(mantenimiento + ''),
                CategoriasID: parseInt(categoria + ''),
                Estado: parseInt(estado + ''),
                fecha_lubricamiento: fechalubricamiento,
                fecha_mantenimiento: fechamantenimiento
              })
              if (updatedEquipo) {
                window.alert('Equipo actualizado exitosamente')
              }
            }
          }
          break
        case 'usuario':
          {
            if (idBorrar) {
              await window.context.deleteUsuarios_By_Id(idBorrar)
              window.alert('Usuario eliminado exitosamente')
            } else if (idEditar) {
              const prevUser = usuarios.find((i) => i.dataValues.ID_Usuario === idEditar)
              const identificacion =
                ((formData.get('identificacion') as string) ?? '').length > 0
                  ? (formData.get('identificacion') as string)
                  : prevUser!.dataValues.identificacion
              const rol =
                ((formData.get('rol') as string) ?? '').length > 0
                  ? (formData.get('rol') as string)
                  : prevUser!.dataValues.Rol
              const contrasena =
                ((formData.get('contrasena') as string) ?? '').length > 0
                  ? (formData.get('contrasena') as string)
                  : prevUser!.dataValues.contrasena

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
        case 'orden':
          {
            if (idBorrar) {
              await window.context.deleteOrden_Mantenimiento_By_Id(idBorrar)
              window.alert('Orden eliminada exitosamente')
              setSelectedOrden(null)
            } else if (idEditar) {
              const prevOrdenList = ordenes.find((i) => i.dataValues.ID_Orden === idEditar)

              prevOrdenList!.dataValues.ID_Equipo = parseInt(
                ((formData.get('ID_Equipo') as string) ?? '').length > 0
                  ? (formData.get('ID_Equipo') as string)
                  : prevOrdenList!.dataValues.ID_Equipo + ''
              )
              prevOrdenList!.dataValues.ID_Usuario = parseInt(
                ((formData.get('ID_Usuario') as string) ?? '').length > 0
                  ? (formData.get('ID_Usuario') as string)
                  : prevOrdenList!.dataValues.ID_Usuario + ''
              )
              prevOrdenList!.dataValues.ID_Estado = parseInt(
                ((formData.get('ID_Estado') as string) ?? '').length > 0
                  ? (formData.get('ID_Estado') as string)
                  : prevOrdenList!.dataValues.ID_Estado + ''
              )
              prevOrdenList!.dataValues.ID_Area = parseInt(
                ((formData.get('ID_Area') as string) ?? '').length > 0
                  ? (formData.get('ID_Area') as string)
                  : prevOrdenList!.dataValues.ID_Area + ''
              )
              prevOrdenList!.dataValues.ID_Presupuesto = parseInt(
                ((formData.get('ID_Presupuesto') as string) ?? '').length > 0
                  ? (formData.get('ID_Presupuesto') as string)
                  : prevOrdenList!.dataValues.ID_Presupuesto + ''
              )
              prevOrdenList!.dataValues.horarioParada =
                ((formData.get('horarioParada') as string) ?? '').length > 0
                  ? (formData.get('horarioParada') as string)
                  : prevOrdenList!.dataValues.horarioParada
              prevOrdenList!.dataValues.horarioComienzo =
                ((formData.get('horarioComienzo') as string) ?? '').length > 0
                  ? (formData.get('horarioComienzo') as string)
                  : prevOrdenList!.dataValues.horarioComienzo
              prevOrdenList!.dataValues.horarioPuestaMarcha =
                ((formData.get('horarioPuestaMarcha') as string) ?? '').length > 0
                  ? (formData.get('horarioPuestaMarcha') as string)
                  : prevOrdenList!.dataValues.horarioPuestaMarcha
              prevOrdenList!.dataValues.horarioCulminacion =
                ((formData.get('horarioCulminacion') as string) ?? '').length > 0
                  ? (formData.get('horarioCulminacion') as string)
                  : prevOrdenList!.dataValues.horarioCulminacion
              prevOrdenList!.dataValues.materialesUsados =
                ((formData.get('materialesUsados') as string) ?? '').length > 0
                  ? (formData.get('materialesUsados') as string)
                  : prevOrdenList!.dataValues.materialesUsados
              prevOrdenList!.dataValues.observaciones =
                ((formData.get('observaciones') as string) ?? '').length > 0
                  ? (formData.get('observaciones') as string)
                  : prevOrdenList!.dataValues.observaciones
              prevOrdenList!.dataValues.solicitadoPor =
                ((formData.get('solicitadoPor') as string) ?? '').length > 0
                  ? (formData.get('solicitadoPor') as string)
                  : prevOrdenList!.dataValues.solicitadoPor
              prevOrdenList!.dataValues.aprobadoPor =
                ((formData.get('aprobadoPor') as string) ?? '').length > 0
                  ? (formData.get('aprobadoPor') as string)
                  : prevOrdenList!.dataValues.aprobadoPor
              prevOrdenList!.dataValues.terminadoPor =
                ((formData.get('terminadoPor') as string) ?? '').length > 0
                  ? (formData.get('terminadoPor') as string)
                  : prevOrdenList!.dataValues.terminadoPor
              prevOrdenList!.dataValues.revisadoPor =
                ((formData.get('revisadoPor') as string) ?? '').length > 0
                  ? (formData.get('revisadoPor') as string)
                  : prevOrdenList!.dataValues.revisadoPor
              prevOrdenList!.dataValues.valeSalida =
                ((formData.get('valeSalida') as string) ?? '').length > 0
                  ? (formData.get('valeSalida') as string)
                  : prevOrdenList!.dataValues.valeSalida
              prevOrdenList!.dataValues.objetivos =
                ((formData.get('objetivos') as string) ?? '').length > 0
                  ? (formData.get('objetivos') as string)
                  : prevOrdenList!.dataValues.objetivos
              prevOrdenList!.dataValues.tipo_trabajo =
                ((formData.get('tipo_trabajo') as string) ?? '').length > 0
                  ? (formData.get('tipo_trabajo') as string)
                  : prevOrdenList!.dataValues.tipo_trabajo
              prevOrdenList!.dataValues.tipo_mantenimiento = parseInt(
                ((formData.get('tipo_mantenimiento') as string) ?? '').length > 0
                  ? (formData.get('tipo_mantenimiento') as string)
                  : prevOrdenList!.dataValues.tipo_mantenimiento + ''
              )
              prevOrdenList!.dataValues.fecha = new Date(formData.get('fecha') as string)
              prevOrdenList!.dataValues.presupuesto = parseInt(
                ((formData.get('presupuesto') as string) ?? '').length > 0
                  ? (formData.get('presupuesto') as string)
                  : prevOrdenList!.dataValues.presupuesto + ''
              )

              try {
                const updatedOrden = await window.context.editOrden_Mantenimiento_By_Id(
                  idEditar,
                  prevOrdenList!.dataValues
                )
                if (updatedOrden) {
                  window.alert('Orden actualizada exitosamente')
                }
              } catch (error: any) {
                alert('Error: ' + error.message)
                console.error(error)
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
          fechaStartDate.toISOString() !== itemStartDate.toISOString() || fechaEndDate.toISOString() !== itemEndDate.toISOString()
        )
      })
    })
  }

  /* Para filtras las maquinas */
  const [maquinariasFilter, setMaquinariasFilter] = useState(maquinarias)
  const [filterMaquinas, setFilterMaquinas] = useState<string>('Todo')
  const [filterMaquinaText, setFilterMaquinaText] = useState<string>('Todo')

  /* Ver mas */
  const [selectedMaquinaria, setSelectedMaquinaria] = useState<Equipos | null>(null)
  const [selectedOrden, setSelectedOrden] = useState<Orden_Mantenimiento | null>(null)

  const [fechaMantenimiento, setFechaMantenimiento] = useState<fechaType[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
      tipoMantenimiento: ''
    }
  ])
  const [fechaLubricamiento, setFechaLubricamiento] = useState<fechaType[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
      tipoMantenimiento: ''
    }
  ])

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

  useEffect(() => {
    const lowerCaseFilterText = filterMaquinaText.toLocaleLowerCase()
    const filterMachines = filterMaquinas !== 'Todo'
    const filterText = filterMaquinaText !== 'Todo'

    const filteredMaquinarias = (
      maquinariasFilter.length > 0 ? maquinariasFilter : maquinarias
    ).filter((item) => {
      const matchesCategory =
        !filterMachines || item.dataValues.CategoriasID === parseInt(filterMaquinas)
      const matchesText =
        !filterText || item.dataValues.Nombre.toLocaleLowerCase().includes(lowerCaseFilterText)
      return matchesCategory && matchesText
    })

    setMaquinariasFilter(filteredMaquinarias.length === 0 ? maquinarias : filteredMaquinarias)
  }, [maquinarias, filterMaquinaText, filterMaquinas])

  useEffect(() => {
    const { presupuestos, equipos, usuarios, ordenes, tipo_mantenimiento, categorias, estados } = context.data
    setPresupuestos(presupuestos.data)
    setMaquinarias(equipos.data)
    setUsuarios(usuarios.data)
    setOrdenes(ordenes.data)
    setTipoMantenimientoData(tipo_mantenimiento.data)
    setcategoriaData(categorias.data)
    setEstadoData(estados.data)
  }, [])
  
  useEffect(() => {
    setPresupuestos(context.data.presupuestos.data)
  }, [presupuestos])
  useEffect(() => {
    setMaquinarias(context.data.equipos.data)
  }, [maquinarias])
  useEffect(() => {
    setUsuarios(context.data.usuarios.data)
  }, [usuarios])
  useEffect(() => {
    setOrdenes(context.data.ordenes.data)
  }, [ordenes])
  useEffect(() => {
    setTipoMantenimientoData(context.data.tipo_mantenimiento.data)
  }, [tipoMantenimientoData])
  useEffect(() => {
    setcategoriaData(context.data.categorias.data)
  }, [categoriaData])
  useEffect(() => {
    setEstadoData(context.data.estados.data)
  }, [estadoData])
  
  
  

  return (
    <RootLayout>
      <h1 className="first-letter:uppercase w-full text-center text-4xl font-serif font-bold border-b-2 border-black">
        {ver}
      </h1>
      {ver === 'presupuesto' && (
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
      {ver === 'area' && (
        <div className="w-full grid grid-cols-3">
          {categoriaData.map((categoriaItem, index) => (
            <section key={index} className="flex gap-x-2 items-end m-1">
              <form
                onSubmit={handleSubmit}
                className="p-2 border-2 border-[#b70909] rounded-xl m-1"
              >
                <input type="hidden" name="editar" value={categoriaItem.dataValues.ID_Categoria} />
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
                <input type="hidden" name="borrar" value={categoriaItem.dataValues.ID_Categoria} />
                <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
              </form>
            </section>
          ))}
        </div>
      )}
      {ver === 'estado' && (
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
      {ver === 'mantenimiento' && (
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
      {ver === 'maquinaria' && (
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
                  texto={`Comentarios: ${selectedMaquinaria?.dataValues.Comentarios}`}
                  required={false}
                  name="comentarios"
                  funcion={() => {}}
                />
                <SelectComponent
                  className=''
                  id='selectEstate'
                  name='estado'
                  onChange={() => { }}
                  required={false}
                  value={undefined}
                  label={`Estado: ${selectedMaquinaria.dataValues.Estado}`}
                  options={estadoData.map((estado) => (
                    <option key={estado.dataValues.ID_Estado} value={estado.dataValues.ID_Estado}>
                      {estado.dataValues.Nombre_Estado}
                    </option>
                  ))}
                />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`Origen: ${selectedMaquinaria?.dataValues.Origen}`}
                  required={false}
                  name="origen"
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
                      {fechaMantenimiento.length > 0
                        ? fechaMantenimiento.map((item, index) => (
                            <li key={new Date(item.startDate).getMilliseconds()} className="p-1 flex flex-row items-center">
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
                                    handleTipoMantenimientoChange(e, index, setFechaMantenimiento)
                                  }
                                  value={parseInt(item.tipoMantenimiento)}
                                >
                                  <option value={-1}> Tipo de Mantenimiento </option>
                                  {tipoMantenimientoData.map((mantenimientoItem) => (
                                    <option
                                      key={mantenimientoItem.dataValues.ID_Tipo_Mantenimiento}
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
                                funcion={() => handleDelete(item, setFechaMantenimiento)}
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
                          ? fechaLubricamiento.map((item) => (
                              <li key={new Date(item.startDate).getMilliseconds()} className="p-1 flex flex-row items-center">
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
                                  funcion={() => handleDelete(item, setFechaLubricamiento)}
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
      {ver === 'usuario' && (
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
      {ver === 'orden' && (
        <div className="w-full grid grid-cols-3">
          <ul className="col-span-2">
            {ordenes.map((orden, index) => (
              <li
                key={index}
                className="grid grid-cols-4 my-2 px-2"
                onClick={() => setSelectedOrden(orden)}
              >
                <p>
                  Area:{' '}
                  {
                    categoriaData.find(
                      (i) => i.dataValues.ID_Categoria === orden.dataValues.ID_Area
                    )?.dataValues.Nombre_Categoria
                  }
                </p>
                <p>
                  Equipo:{' '}
                  {
                    maquinarias.find((i) => i.dataValues.ID_Equipo === orden.dataValues.ID_Equipo)
                      ?.dataValues.Nombre
                  }
                </p>
                <p>
                  Identificacion:{' '}
                  {
                    maquinarias.find((i) => i.dataValues.ID_Equipo === orden.dataValues.ID_Equipo)
                      ?.dataValues.Identificacion
                  }
                </p>
                <p>Fecha: {orden.dataValues.fecha.toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
          {selectedOrden && (
            <div className="col-span-1 flex flex-col items-center">
              <form
                onSubmit={handleSubmit}
                className="p-2 border-2 border-[#b70909] rounded-xl m-1 flex flex-wrap"
              >
                <label className="w-full text-center text-xl font-bold">
                  Identificación{' '}
                  {
                    maquinarias.find(
                      (i) => i.dataValues.ID_Equipo === selectedOrden.dataValues.ID_Equipo
                    )?.dataValues.Identificacion
                  }
                </label>
                <input type="hidden" name="editar" value={selectedOrden.dataValues.ID_Orden} />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.horarioParada}
                  value={undefined}
                  type="text"
                  texto="Horario de Parada"
                  name="horarioParada"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.horarioComienzo}
                  value={undefined}
                  type="text"
                  texto="Horario de Comienzo"
                  name="horarioComienzo"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.horarioPuestaMarcha}
                  value={undefined}
                  type="text"
                  texto="Horario de Puesta en Marcha"
                  name="horarioPuestaMarcha"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.horarioCulminacion}
                  value={undefined}
                  type="text"
                  texto="Horario de Culminacion"
                  name="horarioCulminacion"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.materialesUsados}
                  value={undefined}
                  type="text"
                  texto="Materiales Usados"
                  name="materialesUsados"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.observaciones}
                  value={undefined}
                  type="text"
                  texto="Observaciones"
                  name="observaciones"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.solicitadoPor}
                  value={undefined}
                  type="text"
                  texto="Solicitiado Por"
                  name="solicitadoPor"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.aprobadoPor}
                  value={undefined}
                  type="text"
                  texto="Aprobado Por"
                  name="aprobadoPor"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.terminadoPor}
                  value={undefined}
                  type="text"
                  texto="Terminado Por"
                  name="terminadoPor"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.revisadoPor}
                  value={undefined}
                  type="text"
                  texto="Revisado Por"
                  name="revisadoPor"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.valeSalida}
                  value={undefined}
                  type="text"
                  texto="Vale de Salida"
                  name="valeSalida"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.objetivos}
                  value={undefined}
                  type="text"
                  texto="Objetivos"
                  name="objetivos"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.dataValues.presupuesto + ''}
                  value={undefined}
                  type="text"
                  texto="Presupuesto"
                  name="presupuesto"
                  funcion={() => {}}
                />

                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={selectedOrden.dataValues.ID_Orden} />
                <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
              </form>
            </div>
          )}
        </div>
      )}
    </RootLayout>
  )
}

export default Editar
