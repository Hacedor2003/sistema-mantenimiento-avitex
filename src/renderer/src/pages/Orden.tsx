/* eslint-disable prettier/prettier */
import React from 'react'
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component'
import { useEffect, useState } from 'react'
import {
  Categorias,
  Equipos,
  Estados_Revision,
  Orden_Mantenimiento,
  Presupuesto,
  Tipo_Mantenimiento,
  Usuarios
} from 'src/main/db/Models'
import '../styles/orden.styles.css'
import { Orden_MantenimientoAttributes } from 'src/shared/types'
import { DateRange } from 'react-date-range'
import { fechaType } from './Anadir'

export const Orden = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [estados, setEstados] = useState<Estados_Revision[]>([])
  const [presupuesto, setPresupuesto] = useState<Presupuesto[]>([])
  const [Tipo_Mantenimiento, setTipo_Mantenimiento] = useState<Tipo_Mantenimiento[]>([])

  /* Crear Orden */
  const [orden, setOrden] = useState<Orden_MantenimientoAttributes | null>(null)
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipos | null>(null)
  const [equiposSeleccionadoLista, setequiposSeleccionadoLista] = useState<{ id: number; date: Date; ciclo: string; tipoMantenimiento: string; nombre: string } | null>(null)
  /* Ver Ordenes */
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([])
  const [ordenesVerLista, setOrdenesVerLista] = useState<
    { id: number; date: Date; ciclo: string; tipoMantenimiento: string; nombre: string }[]
  >([])
  const [searchedOrden, setSearchedOrden] = useState<
    { id: number; date: Date; ciclo: string; tipoMantenimiento: string; nombre: string }[]
  >([])
  /* Filtrar las ordenes */
  const [filterOrdenes, setFilterOrdenes] = useState<'Todo' | 'Mantenimiento' | 'lubricación'>(
    'Todo'
  )
  /* Pantalla */
  const [ver, setVer] = useState<'ver-orden' | 'crear-orden' | 'imprimir-orden' | ''>('')

  /* Equipo  */
  const [equipoImprimir, setEquipoImprimir] = useState<Equipos | null>(null)
  const [areaImprimir, setAreaImprimir] = useState<Categorias | null>(null)
  const [estadoImprimir, setEstadoImprimir] = useState<Estados_Revision | null>(null)
  const [tipo_trabajo, setTipo_Trabajo] = useState<Presupuesto | null>(null)
  const [tipo_mantenimiento, seTipo_Mantenimiento] = useState<Tipo_Mantenimiento | null>(null)

  /* Filtrar por Fecha */
  const [date, setDate] = useState<fechaType[]>([
    { startDate: new Date(), endDate: new Date(), key: 'selection', tipoMantenimiento: '' }
  ])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [
          responseEquipos,
          responseUsuarios,
          responseOrdenes,
          responseEstados_Revision_All,
          responsePresupuesto,
          responseTiposMantenimiento
        ] = await Promise.all([
          window.context.getEquipos_All(),
          window.context.getUsuarios_All(),
          window.context.getOrden_Mantenimiento_All(),
          window.context.getEstados_Revision_All(),
          window.context.getPresupuestos_All(),
          window.context.getTipo_Mantenimiento_All()
        ])
        setEquipos(responseEquipos)
        setUsuarios(responseUsuarios)
        setOrdenes(responseOrdenes)

        setOrdenesVerLista(
          responseEquipos.flatMap((item) => [
            ...item.dataValues.fecha_lubricamiento.flatMap((itemItem) => {
              if (
                new Date(itemItem.startDate).toLocaleDateString() !==
                new Date(itemItem.endDate).toLocaleDateString()
              ) {
                return [
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'lubricación',
                    tipoMantenimiento: Tipo_Mantenimiento.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.dataValues.Tipo
                  },
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.endDate),
                    ciclo: 'lubricación',
                    tipoMantenimiento: Tipo_Mantenimiento.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.dataValues.Tipo
                  }
                ]
              } else {
                return [
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'lubricación',
                    tipoMantenimiento: Tipo_Mantenimiento.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.dataValues.Tipo
                  }
                ]
              }
            }),
            ...item.dataValues.fecha_mantenimiento.flatMap((itemItem) => {
              if (itemItem.startDate !== itemItem.endDate) {
                return [
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'mantenimiento',
                    tipoMantenimiento: Tipo_Mantenimiento.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.dataValues.Tipo
                  },
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.endDate),
                    ciclo: 'mantenimiento',
                    tipoMantenimiento: Tipo_Mantenimiento.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.dataValues.Tipo
                  }
                ]
              } else {
                return [
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'mantenimiento',
                    tipoMantenimiento: Tipo_Mantenimiento.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.dataValues.Tipo
                  }
                ]
              }
            })
          ])
        )
        setOrdenesVerLista((prevItems) => {
          const nuevosItems = responseOrdenes.map((item) => ({
            id: item.dataValues.ID_Orden ?? -1,
            date: item.dataValues.fecha,
            ciclo: 'ordenes',
            tipoMantenimiento: -1
          }))

          return [...prevItems, ...nuevosItems]
        })

        setEstados(responseEstados_Revision_All)
        setPresupuesto(responsePresupuesto)
        setTipo_Mantenimiento(responseTiposMantenimiento)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    obtenerDatos()
  }, [ver])

  useEffect(() => {
    const equipoSearch = async () => {
      try {
      const response = await window.context.getEquipos_By_Id(orden?.ID_Equipo)
      const areaResponse = await window.context.getCategorias_By_ID(orden!.ID_Area)
      const estadoImprimir = await window.context.getEstados_Revision_By_Id(orden!.ID_Estado)
      const tipo_trabajoResponse = await window.context.getPresupuestos_By_Id(orden!.ID_Presupuesto)
      const tipo_mante = await window.context.getTipo_Mantenimiento_By_Id(equipoSeleccionado!.dataValues!.TipoMantenimiento)
      setEquipoImprimir(response)
      setAreaImprimir(areaResponse)
      setEstadoImprimir(estadoImprimir)
      setTipo_Trabajo(tipo_trabajoResponse)
        seTipo_Mantenimiento(tipo_mante)
      } catch (error:any) {
        alert(error.message)
      }
    }
    equipoSearch()
  }, [orden])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const newOrden: Orden_MantenimientoAttributes = {
      ID_Equipo: parseInt(formData.get('idEquipo') as string) ?? equipoSeleccionado?.dataValues.ID_Equipo,
      ID_Usuario: parseInt(formData.get('idUsuario') as string),
      ID_Estado: parseInt(formData.get('idestado') as string) ,
      horarioParada: formData.get('horarioParada') as string,
      horarioComienzo: formData.get('horarioComienzo') as string,
      horarioPuestaMarcha: formData.get('horarioPuestaMarcha') as string,
      horarioCulminacion: formData.get('horarioCulminacion') as string,
      materialesUsados: ' ',
      observaciones: formData.get('observaciones') as string,
      solicitadoPor: formData.get('solicitadoPor') as string,
      aprobadoPor: 'Director',
      terminadoPor: formData.get('terminadoPor') as string,
      revisadoPor: formData.get('revisadoPor') as string,
      valeSalida: formData.get('valeSalida') as string,
      objetivos: ' ',
      tipo_trabajo: formData.get('trabajo') as string,
      tipo_mantenimiento: parseInt(formData.get('mantenimiento') as string ?? 2),
      fecha: date[0].startDate,
      ID_Presupuesto: parseInt(formData.get('trabajo') as string),
      presupuesto: parseInt(formData.get('presupuesto') as string),
      ID_Area: equipoSeleccionado!.dataValues.CategoriasID
    }

    try {
      setOrden(newOrden)
      if (newOrden.presupuesto) {
        const prevPresupuesto = await window.context.getPresupuestos_By_Id(newOrden.ID_Presupuesto)
        prevPresupuesto.dataValues.monto = prevPresupuesto.dataValues.monto - newOrden.presupuesto
        prevPresupuesto.dataValues.Fecha = new Date()
        const newPresupuesto = await window.context.editPresupuesto_By_Id(
          newOrden.ID_Presupuesto,
          prevPresupuesto.dataValues
        )
        if (newPresupuesto.dataValues.monto < 0) {
          alert('Ha sobrepasado el presupuesto! \n Deuda: ' + newPresupuesto.dataValues.monto)
        }
      }
      await window.context.createOrden_Mantenimiento(newOrden)
      alert('Orden de mantenimiento creada exitosamente')
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
    setEquipoImprimir(null)
    setAreaImprimir(null)
    setEstadoImprimir(null)
    setTipo_Trabajo(null)
    seTipo_Mantenimiento(null)
  }

  useEffect(() => {
    if (date && date[0].startDate && date[0].endDate) {
      const newOrdenes = ordenesVerLista.filter((item) => {
        const fecha = item.date
        const { startDate, endDate } = date[0]
        return (
          fecha.getMonth() === startDate.getMonth() &&
          fecha.getDate() >= startDate.getDate() &&
          fecha.getDate() <= endDate.getDate()
        )
      })
      setSearchedOrden(newOrdenes.sort((x, y) => x.date.getDate() - y.date.getDate()))
    } else if (date && date[0].startDate) {
      const newOrdenes = ordenesVerLista.filter((item) => {
        const fecha = item.date
        const { startDate, endDate } = date[0]
        return (
          fecha.getMonth() === startDate.getMonth() &&
          fecha.getDate() === startDate.getDate() &&
          fecha.getDate() === endDate.getDate()
        )
      })
      setSearchedOrden(newOrdenes)
    } else {
      setSearchedOrden([])
    }
  }, [date])

  function imprimirOrden() {
    //window.context.imprimirOrden()
    const contenido = document.getElementById('orden-imprimir')!.innerHTML
    const contenidoOriginal = document.body.innerHTML
    document.body.innerHTML = contenido
    document.body.className = 'imprimible'
    window.print()
    document.body.innerHTML = ''
    document.body.className = ''
    document.body.innerHTML = contenidoOriginal
  }

  function searchOrden(id: number) {
    let r: { id: number; date: Date; ciclo: string } | null
    if (ordenes.length > 0 && ordenes.length) {
      const orden = ordenes.find((item) => item.dataValues.ID_Orden === id) ?? null
      if (orden) {
        return orden
      }
    }
    if (searching) {
      r = searchedOrden.find((item) => item.id === id) ?? null
    } else {
      r = ordenesVerLista.find((item) => item.id === id) ?? null
    }
    return (
      ordenes.find((item) => item.dataValues.ID_Equipo === r?.id)  ?? null
    )
  }
  
  const handleSetOrden = (item) => {
    const e = equipos.find(i => i.dataValues.ID_Equipo === item.id)
    setequiposSeleccionadoLista(item);
    setEquipoSeleccionado(e ?? null);
  }

  return (
    <RootLayout>
      <div className="flex flex-row items-center justify-center gap-x-2 m-2">
        <Button_UI texto="Ver Ordenes" type="button" funcion={() => setVer('ver-orden')} />
        <Button_UI texto="Crear Orden" type="button" funcion={() => setVer('crear-orden')} />
      </div>

      {ver === 'ver-orden' && (
        <main className="w-full px-2">
          <header className="w-full flex flex-col items-center justify-around mb-10">
            <h2 className="text-center text-3xl border-b-2 border-[#b70909] my-3">
              Ordenes de Mantenimiento
            </h2>
            <div className="w-full flex items-center justify-around">
              {presupuesto.map((presupuestoItem, index) => (
                <p key={index} className="text-xl font-bold font-sans">
                  Presupuesto {presupuestoItem.dataValues.Tipo}:{' '}
                  <span className="text-base font-mono font-thin">
                    {presupuestoItem.dataValues.monto}
                  </span>
                </p>
              ))}
            </div>
          </header>
          <article className="w-full flex justify-around px-2">
            <div className="flex flex-col">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setDate([item.selection])
                  setSearching(true)
                }}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
              <Button_UI
                type="button"
                texto="Borrar"
                funcion={() => {
                  setDate([
                    {
                      startDate: new Date(),
                      endDate: new Date(),
                      key: 'selection',
                      tipoMantenimiento: ''
                    }
                  ])
                  setSearching(false)
                }}
              />
            </div>
            <div className="w-full flex flex-col px-2">
              <SelectComponent
                options={['Todo', 'Lubricación', 'Mantenimiento'].map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
                value={parseInt(filterOrdenes)}
                onChange={setFilterOrdenes}
                name="filtro"
                label="Filtro:"
                id="idFiltro"
                className=""
                required={false}
              />
              <table style={{ width: 'inherit' }} className="my-2 text-lg">
                <thead>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Ciclo</th>
                  <th>Tipo de Mantenimiento</th>
                </thead>
                <tbody>
                  {searching &&
                    (filterOrdenes === 'Todo'
                      ? searchedOrden
                      : filterOrdenes === 'Mantenimiento'
                        ? searchedOrden.filter((item) => item.ciclo === 'mantenimiento')
                        : searchedOrden.filter((item) => item.ciclo === 'lubricación')
                    ).map((itemOrden, index) => (
                      <tr
                        key={index}
                        className="hover:cursor-pointer hover:border hover:border-black hover:bg-[#b70909] hover:text-white"
                        onClick={() => {
                          handleSetOrden(itemOrden)
                          setVer('crear-orden')
                        }}
                      >
                        <td>{itemOrden.id}</td>
                        <td>{'Nombre'}</td>
                        <td>{itemOrden.date.toLocaleDateString()}</td>
                        <td>{itemOrden.ciclo}</td>
                        <td>{ itemOrden.tipoMantenimiento ? itemOrden.tipoMantenimiento : ""}</td>
                      </tr>
                    ))}
                  {!searching &&
                    (filterOrdenes === 'Todo'
                      ? ordenesVerLista
                      : filterOrdenes === 'Mantenimiento'
                        ? ordenesVerLista.filter((item) => item.ciclo === 'mantenimiento')
                        : ordenesVerLista.filter((item) => item.ciclo === 'lubricación')
                    ).map((itemOrden, index) => (
                      <tr
                        key={index}
                        className="hover:cursor-pointer hover:border hover:border-black hover:bg-[#b70909] hover:text-white"
                        onClick={() => {
                          handleSetOrden(itemOrden)
                          setVer('crear-orden')
                        }}
                      >
                        <td>{itemOrden.id}</td>
                        <td>{itemOrden.nombre}</td>
                        <td>{itemOrden.date.toLocaleDateString()}</td>
                        <td>{itemOrden.ciclo}</td>
                        <td>{itemOrden.tipoMantenimiento}</td>
                      </tr>
                    ))}
                  {/* {date[0].endDate == new Date() &&
                  ordenes.map((itemOrden, index) => (
                    <tr key={index} className="hover:cursor-pointer hover:border hover:border-black hover:bg-[#b70909] hover:text-white" onClick={() => { setOrden(itemOrden.dataValues); setVer('crear-orden')}}>
                      <td>{itemOrden.dataValues.ID_Orden}</td>
                      <td>{itemOrden.dataValues.fecha.toLocaleString()}</td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </article>
        </main>
      )}

      {ver === 'crear-orden' && (
        <>
          <h2 className="text-center text-3xl border-b-2 border-[#b70909] my-3">
            Crear Orden de Mantenimiento
          </h2>
          <div className="w-full flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-1/2 block p-2 gap-y-2">
              {/* Seleccionar Tecnico y Equipo */}
              <section className="flex flex-row gap-x-10 mb-5">
                <SelectComponent
                  options={equipos.map((equipo) => (
                    <option key={equipo.dataValues.ID_Equipo} value={equipo.dataValues.ID_Equipo}>
                      {equipo.dataValues.Nombre}
                    </option>
                  ))}
                  value={equipoSeleccionado?.dataValues.ID_Equipo ?? undefined}
                  required
                  onChange={() => {}}
                  name="idEquipo"
                  label="Equipo:*"
                  id="idEquipo"
                  className=""
                />
                <SelectComponent
                  options={usuarios.map((usuario) => (
                    <option
                      key={usuario.dataValues.ID_Usuario}
                      value={usuario.dataValues.ID_Usuario}
                    >
                      {usuario.dataValues.identificacion}
                    </option>
                  ))}
                  value={orden?.ID_Usuario ?? undefined}
                  required
                  onChange={() => {}}
                  name="idUsuario"
                  label="Usuario:*"
                  id="idUsuario"
                  className=""
                />
              </section>

              {/* Fecha */}
              <div className="flex flex-col">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDate([item.selection])
                    setSearching(true)
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                />
                <Button_UI
                  type="button"
                  texto="Borrar"
                  funcion={() => {
                    setDate([
                      {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection',
                        tipoMantenimiento: ''
                      }
                    ])
                    setSearching(false)
                  }}
                />
                <p>{date[0].startDate.toDateString()}</p>
              </div>

              <div className="w-full flex gap-x-10">
                <SelectComponent
                  options={estados.map((estado) => (
                    <option key={estado.dataValues.ID_Estado} value={estado.dataValues.ID_Estado}>
                      {estado.dataValues.Nombre_Estado}
                    </option>
                  ))}
                  value={orden?.ID_Estado ?? undefined}
                  required
                  onChange={() => {}}
                  name="idestado"
                  label="Estado:*"
                  id="idEstado"
                  className=""
                />

                {/* Objetivos del Mantenimiento */}
                {!orden && <SelectComponent
                  options={presupuesto.map((trabajo, index) => (
                    <option
                      className="first-letter:uppercase"
                      key={index}
                      value={trabajo.dataValues.ID_Presupuesto}
                    >
                      {trabajo.dataValues.Tipo}
                    </option>
                  ))}
                  value={ equipoSeleccionado ? 2 : undefined}
                  required
                  onChange={()=>{}}
                  name="trabajo"
                  label="Tipo de Trabajo:*"
                  id="idTrabajo"
                  className=""
                />}
                {!equiposSeleccionadoLista && (
                  <SelectComponent
                    options={Tipo_Mantenimiento?.map((trabajo, index) => (
                      <option
                        className="first-letter:uppercase"
                        key={index}
                        value={undefined}
                      >
                        {trabajo.dataValues.Tipo}
                      </option>
                    ))}
                    value={undefined}
                    required
                    onChange={() => {}}
                    name="mantenimiento"
                    label="Tipo de Mantenimiento:*"
                    id="idMantenimiento"
                    className=""
                  />
                )}
                {
                  equiposSeleccionadoLista && <p>{ equiposSeleccionadoLista.tipoMantenimiento}</p>
                }
              </div>

              <Input_UI
                type="text"
                value={orden?.observaciones ?? undefined}
                texto="Observaciones:"
                name="observaciones"
                funcion={() => {}}
                required={false}
              />
              <div className="w-full flex">
                <Input_UI
                  type="text"
                  value={orden?.solicitadoPor ?? undefined}
                  texto="Solicitado Por:"
                  name="solicitadoPor"
                  funcion={() => {}}
                  required={false}
                />
                <Input_UI
                  type="text"
                  value={orden?.terminadoPor ?? undefined}
                  texto="Terminado Por:"
                  name="terminadoPor"
                  funcion={() => {}}
                  required={false}
                />
                <Input_UI
                  type="text"
                  value={orden?.revisadoPor ?? undefined}
                  texto="Revisado Por:"
                  name="revisadoPor"
                  funcion={() => {}}
                  required={false}
                />
              </div>

              <div className="w-full flex">
                <Input_UI
                  type="text"
                  value={orden?.valeSalida ?? undefined}
                  texto="Vale de Salida:"
                  name="valeSalida"
                  funcion={() => {}}
                  required={false}
                />

                <Input_UI
                  type="number"
                  value={orden?.presupuesto ?? undefined}
                  texto="Presupuesto:"
                  name="presupuesto"
                  funcion={() => {}}
                  required={false}
                />
              </div>
              <div className="w-full flex items-center justify-center gap-x-2">
                <Button_UI type="submit" texto="Crear Orden" funcion={() => {}} />
                {equipoSeleccionado && (
                  <Button_UI
                    type="button"
                    texto="Vista Previa"
                    funcion={() => setVer('imprimir-orden')}
                  />
                )}
              </div>
            </form>
          </div>
        </>
      )}

      {ver === 'imprimir-orden' && (
        <div className="w-full flex flex-col items-center p-2">
          <div className="w-full grid grid-rows-5 imprimible" id="orden-imprimir">
            <h4 className="border-b border-black w-full text-center">
              ORDEN DE TRABAJO DE MANTENIMIENTO
            </h4>

            {/* Header */}
            <ul className="w-full grid grid-cols-4 border border-black">
              <li className="border-r border-black">
                <h4>ORGANISMO</h4>
                <p>MINAG</p>
              </li>
              <li className="border-r border-black">
                <h4>EMPRESA</h4>
                <p>AVITEX</p>
              </li>
              <li className="border-r border-black">
                <h4>UNIDAD</h4>
                <p>UEB Fabrica</p>
              </li>
              <li>
                <section>
                  <ul className="w-full flex justify-around">
                    <li className="border-r border-black w-full">
                      {' '}
                      <h4>D</h4>
                      <p>{ orden?.fecha.getDate() ?? new Date().getDate()}</p>
                    </li>
                    <li className="border-r border-black w-full">
                      {' '}
                      <h4>M</h4>
                      <p>{ orden?.fecha.getMonth() ?? new Date().getMonth() + 1}</p>
                    </li>
                    <li className="border-r border-black w-full">
                      {' '}
                      <h4>A</h4>
                      <p>{ orden?.fecha.getUTCFullYear() ?? new Date().getFullYear()}</p>
                    </li>
                  </ul>
                </section>
              </li>
            </ul>
            {/* Body */}
            <ul className="w-full border border-black grid grid-cols-6 grid-rows-1">
              <li className="col-span-1 border-r border-black">
                <h3>TIPO DE TRABAJO</h3>
                <p>
                  {tipo_trabajo?.dataValues.Tipo + '\n -' + tipo_mantenimiento?.dataValues.Tipo}
                </p>
              </li>
              <li className="col-span-1 border-r border-black">
                <h3>CRONOGRAMA</h3>
                <p>{estadoImprimir?.dataValues.Nombre_Estado}</p>
              </li>
              <li className="col-span-4 border-r border-black">
                <h3>OBJETIVOS DEL MANTENIMIENTO:</h3>
                <div className="w-full grid grid-cols-2">
                  <ul>
                    <li>Area:{areaImprimir?.dataValues.Nombre_Categoria}</li>
                    <li className="h-[50px]">Tiempo de Parada:{orden?.horarioParada ?? ""}</li>
                    <li className="h-[50px]">Tiempo de Inicio:{orden?.horarioComienzo ?? ""}</li>
                  </ul>
                  <ul>
                    <li>
                      Equipo:{' '}
                      {equipoImprimir?.dataValues.Nombre +
                        ' ' +
                        equipoImprimir?.dataValues.Identificacion}
                    </li>
                    <li className="h-[50px]">
                      Tiempo de Puesta en Marcha:{orden?.horarioPuestaMarcha ?? ""}
                    </li>
                    <li className="h-[50px]">Tiempo de Culminación:{orden?.horarioCulminacion ?? ""}</li>
                  </ul>
                </div>
                <h4>Materiales utilizados: Referenciado en el Vale de Salida</h4>
              </li>
            </ul>
            <div className="w-full flex flex-col items-start border border-black">
              <h4>Observaciones:</h4>
              <p className="w-full h-[300px]">{orden?.observaciones ?? ""}</p>
            </div>
            <ul className="w-full border border-black grid grid-cols-6">
              <li className="border-r border-black flex flex-col">
                <h4>Solicitado por:</h4> <p>{orden?.solicitadoPor ?? ""}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Aprobado por:</h4> <p>{orden?.aprobadoPor ?? ""}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Terminado por:</h4> <p>{orden?.terminadoPor ?? ""}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Revisado por:</h4> <p>{orden?.revisadoPor ?? ""}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Vale de Salida:</h4> <p>{orden?.valeSalida ?? ""}</p>
              </li>
            </ul>
          </div>
          <Button_UI type="button" texto="Imprimir Orden" funcion={() => imprimirOrden()} />
        </div>
      )}
    </RootLayout>
  )
}

