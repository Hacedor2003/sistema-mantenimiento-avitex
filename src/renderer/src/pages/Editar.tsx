/* eslint-disable prettier/prettier */
import { AppContext } from '@renderer/Data/Store'
import { RootLayout } from '@renderer/components/AppLayout'
import {
  Button_UI,
  Input_UI,
  Input_UI_subTexto,
  SelectComponent
} from '@renderer/components/UI_Component'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EquiposAttributes, Orden_MantenimientoAttributes, PresupuestoAttributes } from 'src/shared/types'

const Editar = () => {
  const { opcion: ver } = useParams()
  const context = useContext(AppContext)
  const {
    presupuestos,
    equipos: maquinarias,
    usuarios,
    ordenes,
    tipo_mantenimiento,
    categorias,
    estados
  } = context.data

  /* Para filtras las maquinas */
  const [maquinariasFilter, setMaquinariasFilter] = useState(maquinarias.data)
  const [filterMaquinas, setFilterMaquinas] = useState<string>('Todo')
  const [filterMaquinaText, setFilterMaquinaText] = useState<string>('Todo')

  /* Ver mas */
  const [selectedMaquinaria, setSelectedMaquinaria] = useState<EquiposAttributes | null>(null)
  const [selectedOrden, setSelectedOrden] = useState<Orden_MantenimientoAttributes | null>(null)
  /** las fechas de Mantenimiento de la maquina seleccionada */
  const [fechaMantenimiento, setFechaMantenimiento] = useState<any[]>([])
  /** las fechas de lubricacion de la maquina seleccionada */
  const [fechaLubricacion, setFechaLubricacion] = useState<any[]>([])
  const [newFechaMantenimiento, setNewFechaMantenimiento] = useState({ date: '', tipo_mantenimiento: -1 })
  const [newFechaLubricacion, setNewFechaLubricacion] = useState('')

  /* Actualizar las maquinas buscadas por los filtros */
  useEffect(() => {
    const lowerCaseFilterText = filterMaquinaText.toLocaleLowerCase()
    const filterMachines = filterMaquinas !== 'Todo'
    const filterText = filterMaquinaText !== 'Todo'

    const filteredMaquinarias = (
      maquinariasFilter.length > 0 ? maquinariasFilter : maquinarias.data
    ).filter((item) => {
      const matchesCategory = !filterMachines || item.CategoriasID === parseInt(filterMaquinas)
      const matchesText =
        !filterText || item.Nombre.toLocaleLowerCase().includes(lowerCaseFilterText)
      return matchesCategory && matchesText
    })

    setMaquinariasFilter(filteredMaquinarias.length === 0 ? maquinarias.data : filteredMaquinarias)
  }, [maquinarias, filterMaquinaText, filterMaquinas])

  const handleDelete = (index: number, type: 'mantenimiento' | 'lubricacion') => {
    if (type === 'mantenimiento') {
      const updatedMantenimiento = fechaMantenimiento.filter((_, i) => i !== index)
      setFechaMantenimiento(updatedMantenimiento)
    } else {
      const updatedLubricacion = fechaLubricacion.filter((_, i) => i !== index)
      setFechaLubricacion(updatedLubricacion)
    }
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
            const newPresupuestoEdited: PresupuestoAttributes = { ...prevPresupuesto }
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
              const prevEquipo = maquinarias.data.find((i) => i.ID_Equipo === idEditar)
              const nombre =
                ((formData.get('nombre') as string) ?? '').length > 0
                  ? (formData.get('nombre') as string)
                  : prevEquipo!.Nombre
              const identificacion =
                ((formData.get('identificacion') as string) ?? '').length > 0
                  ? (formData.get('identificacion') as string)
                  : prevEquipo!.Identificacion
              const categoria =
                ((formData.get('categoria') as string) ?? '').length > 0
                  ? (formData.get('categoria') as string)
                  : prevEquipo!.CategoriasID
              const comentarios =
                ((formData.get('comentarios') as string) ?? '').length > 0
                  ? (formData.get('comentarios') as string)
                  : prevEquipo!.Comentarios
              const estado =
                ((formData.get('estado') as string) ?? '').length > 0
                  ? (formData.get('estado') as string)
                  : prevEquipo!.Estado
              const origen =
                ((formData.get('origen') as string) ?? '').length > 0
                  ? (formData.get('origen') as string)
                  : prevEquipo!.Origen
              const mantenimiento =
                ((formData.get('mantenimiento') as string) ?? '').length > 0
                  ? (formData.get('mantenimiento') as string)
                  : prevEquipo!.TipoMantenimiento
              const fechamantenimiento = fechaMantenimiento
              const fechalubricamiento = fechaLubricacion
              await window.context.editEquipos_By_Id(idEditar, {
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
            }
          }
          break
        case 'usuario':
          {
            if (idBorrar) {
              await window.context.deleteUsuarios_By_Id(idBorrar)
              window.alert('Usuario eliminado exitosamente')
            } else if (idEditar) {
              const prevUser = usuarios.data.find((i) => i.ID_Usuario === idEditar)
              const identificacion =
                ((formData.get('identificacion') as string) ?? '').length > 0
                  ? (formData.get('identificacion') as string)
                  : prevUser!.identificacion
              const rol =
                ((formData.get('rol') as string) ?? '').length > 0
                  ? (formData.get('rol') as string)
                  : prevUser!.Rol
              const contrasena =
                ((formData.get('contrasena') as string) ?? '').length > 0
                  ? (formData.get('contrasena') as string)
                  : prevUser!.contrasena

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
              const prevOrdenList = ordenes.data.find((i) => i.ID_Orden === idEditar)

              prevOrdenList!.ID_Equipo = parseInt(
                ((formData.get('ID_Equipo') as string) ?? '').length > 0
                  ? (formData.get('ID_Equipo') as string)
                  : prevOrdenList!.ID_Equipo + ''
              )
              prevOrdenList!.ID_Usuario = parseInt(
                ((formData.get('ID_Usuario') as string) ?? '').length > 0
                  ? (formData.get('ID_Usuario') as string)
                  : prevOrdenList!.ID_Usuario + ''
              )
              prevOrdenList!.ID_Estado = parseInt(
                ((formData.get('ID_Estado') as string) ?? '').length > 0
                  ? (formData.get('ID_Estado') as string)
                  : prevOrdenList!.ID_Estado + ''
              )
              prevOrdenList!.ID_Area = parseInt(
                ((formData.get('ID_Area') as string) ?? '').length > 0
                  ? (formData.get('ID_Area') as string)
                  : prevOrdenList!.ID_Area + ''
              )
              prevOrdenList!.ID_Presupuesto = parseInt(
                ((formData.get('ID_Presupuesto') as string) ?? '').length > 0
                  ? (formData.get('ID_Presupuesto') as string)
                  : prevOrdenList!.ID_Presupuesto + ''
              )
              prevOrdenList!.horarioParada =
                ((formData.get('horarioParada') as string) ?? '').length > 0
                  ? (formData.get('horarioParada') as string)
                  : prevOrdenList!.horarioParada
              prevOrdenList!.horarioComienzo =
                ((formData.get('horarioComienzo') as string) ?? '').length > 0
                  ? (formData.get('horarioComienzo') as string)
                  : prevOrdenList!.horarioComienzo
              prevOrdenList!.horarioPuestaMarcha =
                ((formData.get('horarioPuestaMarcha') as string) ?? '').length > 0
                  ? (formData.get('horarioPuestaMarcha') as string)
                  : prevOrdenList!.horarioPuestaMarcha
              prevOrdenList!.horarioCulminacion =
                ((formData.get('horarioCulminacion') as string) ?? '').length > 0
                  ? (formData.get('horarioCulminacion') as string)
                  : prevOrdenList!.horarioCulminacion
              prevOrdenList!.materialesUsados =
                ((formData.get('materialesUsados') as string) ?? '').length > 0
                  ? (formData.get('materialesUsados') as string)
                  : prevOrdenList!.materialesUsados
              prevOrdenList!.observaciones =
                ((formData.get('observaciones') as string) ?? '').length > 0
                  ? (formData.get('observaciones') as string)
                  : prevOrdenList!.observaciones
              prevOrdenList!.solicitadoPor =
                ((formData.get('solicitadoPor') as string) ?? '').length > 0
                  ? (formData.get('solicitadoPor') as string)
                  : prevOrdenList!.solicitadoPor
              prevOrdenList!.aprobadoPor =
                ((formData.get('aprobadoPor') as string) ?? '').length > 0
                  ? (formData.get('aprobadoPor') as string)
                  : prevOrdenList!.aprobadoPor
              prevOrdenList!.terminadoPor =
                ((formData.get('terminadoPor') as string) ?? '').length > 0
                  ? (formData.get('terminadoPor') as string)
                  : prevOrdenList!.terminadoPor
              prevOrdenList!.revisadoPor =
                ((formData.get('revisadoPor') as string) ?? '').length > 0
                  ? (formData.get('revisadoPor') as string)
                  : prevOrdenList!.revisadoPor
              prevOrdenList!.valeSalida =
                ((formData.get('valeSalida') as string) ?? '').length > 0
                  ? (formData.get('valeSalida') as string)
                  : prevOrdenList!.valeSalida
              prevOrdenList!.objetivos =
                ((formData.get('objetivos') as string) ?? '').length > 0
                  ? (formData.get('objetivos') as string)
                  : prevOrdenList!.objetivos
              prevOrdenList!.tipo_trabajo =
                ((formData.get('tipo_trabajo') as string) ?? '').length > 0
                  ? (formData.get('tipo_trabajo') as string)
                  : prevOrdenList!.tipo_trabajo
              prevOrdenList!.tipo_mantenimiento = parseInt(
                ((formData.get('tipo_mantenimiento') as string) ?? '').length > 0
                  ? (formData.get('tipo_mantenimiento') as string)
                  : prevOrdenList!.tipo_mantenimiento + ''
              )
              prevOrdenList!.fecha = new Date(formData.get('fecha') as string)
              prevOrdenList!.presupuesto = parseInt(
                ((formData.get('presupuesto') as string) ?? '').length > 0
                  ? (formData.get('presupuesto') as string)
                  : prevOrdenList!.presupuesto + ''
              )

              try {
                const updatedOrden = await window.context.editOrden_Mantenimiento_By_Id(
                  idEditar,
                  prevOrdenList!
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

  const handleNewMantenimiento = () => {
    if (newFechaMantenimiento) {
    const newMantenimiento = [...fechaMantenimiento, newFechaMantenimiento]
      setFechaMantenimiento(newMantenimiento)
      setNewFechaMantenimiento({date:'',tipo_mantenimiento:-1})
    } else {
      alert('Por favor, seleccione una fecha válida.');
    }
  }
  const handleNewLubricacion = () => {
    if (newFechaLubricacion) {
      const newLubricacion = [...fechaLubricacion, newFechaLubricacion];
      setFechaLubricacion(newLubricacion);
      setNewFechaLubricacion('');
    } else {
      alert('Por favor, seleccione una fecha válida.');
    }
  }
  const handleSaveMantenimiento = () => {
    selectedMaquinaria!.fecha_mantenimiento = fechaMantenimiento
    setSelectedMaquinaria(selectedMaquinaria)
  }
  const handleSaveLubricamiento = () => {
    selectedMaquinaria!.fecha_lubricamiento = fechaLubricacion
    setSelectedMaquinaria(selectedMaquinaria)
  }
  

  return (
    <RootLayout>
      <h1 className="first-letter:uppercase w-full text-center text-4xl font-serif font-bold border-b-2 border-black">
        {ver}
      </h1>
      {ver === 'presupuesto' && (
        <div className="w-full flex items-center justify-around">
          {presupuestos.data.map((presupuestoItem, index) => (
            <form
              key={index}
              className="p-2 border-2 border-[#b70909] rounded-xl m-1"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="idpresupuesto" value={presupuestoItem.ID_Presupuesto} />
              <Input_UI
                value={undefined}
                type="number"
                texto={`Presupuesto ${presupuestoItem.Tipo} ${presupuestoItem.monto} CUP`}
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
          {categorias.data.map((categoriaItem, index) => (
            <section key={index} className="flex gap-x-2 items-end m-1">
              <form
                onSubmit={handleSubmit}
                className="p-2 border-2 border-[#b70909] rounded-xl m-1"
              >
                <input type="hidden" name="editar" value={categoriaItem.ID_Categoria} />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`${categoriaItem.Nombre_Categoria}`}
                  required={false}
                  name="nombre"
                  funcion={() => {}}
                />
                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={categoriaItem.ID_Categoria} />
                <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
              </form>
            </section>
          ))}
        </div>
      )}
      {ver === 'estado' && (
        <div className="w-full grid grid-cols-3">
          {estados.data.map((estadoItem, index) => (
            <section key={index} className="flex gap-x-2 items-end m-1">
              <form
                onSubmit={handleSubmit}
                className="p-2 border-2 border-[#b70909] rounded-xl m-1"
              >
                <input type="hidden" name="editar" value={estadoItem.ID_Estado} />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`${estadoItem.Nombre_Estado}`}
                  required={false}
                  name="nombre"
                  funcion={() => {}}
                />
                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={estadoItem.ID_Estado} />
                <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
              </form>
            </section>
          ))}
        </div>
      )}
      {ver === 'mantenimiento' && (
        <div className="w-full grid grid-cols-3">
          {tipo_mantenimiento.data.map((tipoMantenimientoItem, index) => (
            <section key={index} className="flex gap-x-2 items-end m-1">
              <form
                onSubmit={handleSubmit}
                className="p-2 border-2 border-[#b70909] rounded-xl m-1"
              >
                <input
                  type="hidden"
                  name="editar"
                  value={tipoMantenimientoItem.ID_Tipo_Mantenimiento}
                />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`${tipoMantenimientoItem.Tipo}`}
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
                  value={tipoMantenimientoItem.ID_Tipo_Mantenimiento}
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
                options={categorias.data.map((item, index) => (
                  <option key={index} value={item.ID_Categoria}>
                    {item.Nombre_Categoria}
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
            {maquinariasFilter.map((maquinariaItem, index) => (
              <li
                key={index}
                className="flex flex-col"
                onClick={() => {
                  setSelectedMaquinaria(maquinariaItem)
                  setFechaMantenimiento(maquinariaItem.fecha_mantenimiento)
                  setFechaLubricacion(maquinariaItem.fecha_lubricamiento)
                }}
              >
                <p className="font-semibold">{maquinariaItem.Nombre}</p>
                <p className="text-gray-500">ID: {maquinariaItem.Identificacion}</p>
              </li>
            ))}
          </ul>

          {selectedMaquinaria && (
            <div className="col-span-1">
              <form
                onSubmit={handleSubmit}
                className="p-2 border-2 border-[#b70909] rounded-xl m-1 h-max"
              >
                <input type="hidden" name="editar" value={selectedMaquinaria.ID_Equipo} />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`Nombre: ${selectedMaquinaria.Nombre}`}
                  required={false}
                  name="nombre"
                  funcion={() => {}}
                />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`Identificacion: ${selectedMaquinaria.Identificacion}`}
                  required={false}
                  name="identificacion"
                  funcion={() => {}}
                />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`Comentarios: ${selectedMaquinaria.Comentarios}`}
                  required={false}
                  name="comentarios"
                  funcion={() => {}}
                />
                <SelectComponent
                  className=""
                  id="selectEstate"
                  name="estado"
                  onChange={() => {}}
                  required={false}
                  value={undefined}
                  label={`Estado: ${selectedMaquinaria.Estado}`}
                  options={estados.data.map((estado) => (
                    <option key={estado.ID_Estado} value={estado.ID_Estado}>
                      {estado.Nombre_Estado}
                    </option>
                  ))}
                />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`Origen: ${selectedMaquinaria.Origen}`}
                  required={false}
                  name="origen"
                  funcion={() => {}}
                />
                {/* Fechas */}
                <section className="w-full flex flex-col items-start gap-2">
                  {/* Mantenimiento */}
                  <div className="px-5 flex flex-col items-start justify-center gap-x-10">
                    <div>
                      <h4 className="text-xl">Escoga la fecha del Mantenimiento:</h4>
                      <input
                        className="border border-black p-2 my-1 rounded-lg"
                        type="date"
                        name="newFechaMantenimiento"
                        onChange={(event) => setNewFechaMantenimiento(e => { return { ...e, date: event.target.value } })}
                        value={newFechaMantenimiento.date}
                      />
                      <select
                        id="inputMantenimientoFecha"
                        className="w-fit border border-black p-2 rounded-md cursor-pointer"
                        name="newTipoMantenimientoFecha"
                        onChange={(event) => setNewFechaMantenimiento(e => { return { ...e, tipo_mantenimiento: +event.target.value } })}
                        value={newFechaMantenimiento.tipo_mantenimiento}
                      >
                        <option key={123} value={-1}>
                          Seleccione:
                        </option>
                        {tipo_mantenimiento.data.map((mantenimientoItem) => (
                          <option
                            key={mantenimientoItem.ID_Tipo_Mantenimiento}
                            value={mantenimientoItem.ID_Tipo_Mantenimiento}
                          >
                            {mantenimientoItem.Tipo}
                          </option>
                        ))}
                      </select>
                      <Button_UI type="button" texto="Añadir" funcion={handleNewMantenimiento} />
                    </div>
                    {/* Ver Lista de las fechas del mantenimiento */}
                    {fechaMantenimiento.length > 0 && (
                      <div className="border-2 border-[#b70909] rounded-xl p-2 m-1">
                        <h3 className="text-xl font-bold">Mantenimientos</h3>
                        <ul>
                          {fechaMantenimiento.map((item, index) => {
                            const fecha = new Date(item.date ?? item.startDate)
                            const mant = item.tipo_mantenimiento ?? item.tipoMantenimiento ?? 0

                            return (
                              <li
                                key={fecha.getMilliseconds()}
                                className="p-1 flex flex-row items-center"
                              >
                                <div className="mr-2">
                                  <p>Fecha:</p>
                                  <p>{fecha.toLocaleDateString()}</p>
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
                                    value={mant}
                                  >
                                    <option key={123} value={-1}>
                                      Seleccione:
                                    </option>
                                    {tipo_mantenimiento.data.map((mantenimientoItem) => (
                                      <option
                                        key={mantenimientoItem.ID_Tipo_Mantenimiento}
                                        value={mantenimientoItem.ID_Tipo_Mantenimiento}
                                      >
                                        {mantenimientoItem.Tipo}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <Button_UI
                                  type="button"
                                  texto="Borrar"
                                  funcion={() => handleDelete(index, 'mantenimiento')}
                                  className="mx-1"
                                />
                              </li>
                            )
                          })}
                          <Button_UI
                            type="button"
                            texto="Guardar"
                            funcion={handleSaveMantenimiento}
                            className="mx-1"
                          />
                        </ul>
                      </div>
                    )}
                  </div>
                  {/* Lubricamiento */}
                  <div className="px-5 flex flex-col items-start justify-center gap-x-10">
                    <div className="mr-2">
                      <h4 className="text-xl">Escoga la fecha del Lubricación:</h4>
                      <input
                        className="border border-black p-2 my-1 rounded-lg"
                        type="date"
                        name=""
                        id=""
                        onChange={(e) => setNewFechaLubricacion(e.target.value)}
                        value={newFechaLubricacion}
                      />
                      <Button_UI type="button" texto="Añadir" funcion={handleNewLubricacion} />
                    </div>
                    {fechaLubricacion.length > 0 && (
                      <div className="border-2 border-[#b70909] rounded-xl p-2 m-1">
                        <h3 className="text-xl font-bold">Lubricaciones</h3>
                        <ul>
                          {fechaLubricacion.map((item, index) => {
                            let fecha;
                            if (item instanceof Object) {
                              fecha = new Date(item.startDate).toLocaleDateString()
                            } else {
                              fecha = item
                            }

                            return (
                              <li
                                key={fecha}
                                className="p-1 flex flex-row items-center"
                              >
                                <div className="mr-2">
                                  <p>Fecha:</p>
                                  <p>{fecha}</p>
                                </div>
                                <Button_UI
                                  type="button"
                                  texto="Borrar"
                                  funcion={() => handleDelete(index, 'lubricacion')}
                                />
                              </li>
                            )
                          })}
                          <Button_UI
                            type="button"
                            texto="Guardar"
                            funcion={() => /* handleDelete(index, 'lubricacion') */ {}}
                          />
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
                <Button_UI type="submit" texto="Guardar" funcion={handleSaveLubricamiento} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={selectedMaquinaria?.ID_Equipo} />
                <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
              </form>
            </div>
          )}
        </div>
      )}
      {ver === 'usuario' && (
        <div className="w-full grid grid-cols-3">
          {usuarios.data.map((usuarioItem, index) => (
            <section key={index} className="flex gap-x-2 items-end m-1">
              <form
                onSubmit={handleSubmit}
                className="p-2 border-2 border-[#b70909] rounded-xl m-1"
              >
                <input type="hidden" name="editar" value={usuarioItem.ID_Usuario} />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`User: ${usuarioItem.identificacion}`}
                  required={false}
                  name="identificacion"
                  funcion={() => {}}
                />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`Rol: ${usuarioItem.Rol}`}
                  required={false}
                  name="rol"
                  funcion={() => {}}
                />
                <Input_UI
                  value={undefined}
                  type="text"
                  texto={`Contraseña: ${usuarioItem.contrasena}`}
                  required={false}
                  name="contrasena"
                  funcion={() => {}}
                />
                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={usuarioItem.ID_Usuario} />
                <Button_UI texto="Borrar" type="submit" funcion={() => {}} />
              </form>
            </section>
          ))}
        </div>
      )}
      {ver === 'orden' && (
        <div className="w-full grid grid-cols-3">
          <ul className="col-span-2">
            {ordenes.data.map((orden, index) => (
              <li
                key={index}
                className="grid grid-cols-4 my-2 px-2"
                onClick={() => setSelectedOrden(orden)}
              >
                <p>
                  Area:{' '}
                  {categorias.data.find((i) => i.ID_Categoria === orden.ID_Area)?.Nombre_Categoria}
                </p>
                <p>
                  Equipo: {maquinarias.data.find((i) => i.ID_Equipo === orden.ID_Equipo)?.Nombre}
                </p>
                <p>
                  Identificacion:{' '}
                  {maquinarias.data.find((i) => i.ID_Equipo === orden.ID_Equipo)?.Identificacion}
                </p>
                <p>Fecha: {orden.fecha.toLocaleDateString()}</p>
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
                    maquinarias.data.find((i) => i.ID_Equipo === selectedOrden.ID_Equipo)
                      ?.Identificacion
                  }
                </label>
                <input type="hidden" name="editar" value={selectedOrden.ID_Orden} />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.horarioParada}
                  value={undefined}
                  type="text"
                  texto="Horario de Parada"
                  name="horarioParada"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.horarioComienzo}
                  value={undefined}
                  type="text"
                  texto="Horario de Comienzo"
                  name="horarioComienzo"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.horarioPuestaMarcha}
                  value={undefined}
                  type="text"
                  texto="Horario de Puesta en Marcha"
                  name="horarioPuestaMarcha"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.horarioCulminacion}
                  value={undefined}
                  type="text"
                  texto="Horario de Culminacion"
                  name="horarioCulminacion"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.materialesUsados}
                  value={undefined}
                  type="text"
                  texto="Materiales Usados"
                  name="materialesUsados"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.observaciones}
                  value={undefined}
                  type="text"
                  texto="Observaciones"
                  name="observaciones"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.solicitadoPor}
                  value={undefined}
                  type="text"
                  texto="Solicitiado Por"
                  name="solicitadoPor"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.aprobadoPor}
                  value={undefined}
                  type="text"
                  texto="Aprobado Por"
                  name="aprobadoPor"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.terminadoPor}
                  value={undefined}
                  type="text"
                  texto="Terminado Por"
                  name="terminadoPor"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.revisadoPor}
                  value={undefined}
                  type="text"
                  texto="Revisado Por"
                  name="revisadoPor"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.valeSalida}
                  value={undefined}
                  type="text"
                  texto="Vale de Salida"
                  name="valeSalida"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.objetivos}
                  value={undefined}
                  type="text"
                  texto="Objetivos"
                  name="objetivos"
                  funcion={() => {}}
                />
                <Input_UI_subTexto
                  required={false}
                  subTexto={selectedOrden.presupuesto + ''}
                  value={undefined}
                  type="text"
                  texto="Presupuesto"
                  name="presupuesto"
                  funcion={() => {}}
                />

                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={selectedOrden.ID_Orden} />
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
