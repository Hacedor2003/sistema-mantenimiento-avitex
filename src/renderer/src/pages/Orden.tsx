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

  /* Crear Orden */
  const [orden, setOrden] = useState<Orden_MantenimientoAttributes | null>(null)
  /* Ver Ordenes */
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([])
  const [ordenesVerLista, setOrdenesVerLista] = useState<{ id: number, date: Date, ciclo: string }[]>([])
  const [searchedOrden, setSearchedOrden] = useState<{ id: number, date: Date, ciclo: string }[]>([])
  /* Filtrar las ordenes */
  const [filterOrdenes, setFilterOrdenes] = useState<'Todo' | 'Mantenimiento' | 'Lubricamiento'>('Todo')
  /* Pantalla */
  const [ver, setVer] = useState<'ver-orden' | 'crear-orden' | 'imprimir-orden' | ''>('')

  /* Equipo  */
  const [equipoImprimir, setEquipoImprimir] = useState<Equipos | null>(null)
  const [areaImprimir, setAreaImprimir] = useState<Categorias | null>(null)
  const [estadoImprimir, setEstadoImprimir] = useState<Estados_Revision | null>(null)
  const [tipo_trabajo, setTipo_Trabajo] = useState<Presupuesto | null>(null)

  /* Filtrar por Fecha */
  const [date, setDate] = useState<fechaType[]>([
    { startDate: new Date(), endDate: new Date(), key: 'selection' , tipoMantenimiento:"" }
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
          responsePresupuesto
        ] = await Promise.all([
          window.context.getEquipos_All(),
          window.context.getUsuarios_All(),
          window.context.getOrden_Mantenimiento_All(),
          window.context.getEstados_Revision_All(),
          window.context.getPresupuestos_All()
        ])
        setEquipos(responseEquipos)
        setUsuarios(responseUsuarios)
        setOrdenes(responseOrdenes)
        setOrdenesVerLista(  responseEquipos.flatMap(item => [
          ...item.dataValues.fecha_lubricamiento.flatMap(itemItem => {
            if (new Date(itemItem.startDate).toLocaleDateString() !== new Date(itemItem.endDate).toLocaleDateString()) {
              return [
                { id: item.dataValues.ID_Equipo, date: new Date(itemItem.startDate) , ciclo:'lubricamiento' },
                { id: item.dataValues.ID_Equipo, date: new Date(itemItem.endDate)  , ciclo:'lubricamiento'}
              ];
            } else {
              return [
                { id: item.dataValues.ID_Equipo, date: new Date(itemItem.startDate),ciclo:'lubricamiento' },
            ];
            }
          }),
          ...item.dataValues.fecha_mantenimiento.flatMap(itemItem => {
            if (itemItem.startDate !== itemItem.endDate) {
              return [
                { id: item.dataValues.ID_Equipo, date: new Date(itemItem.startDate),ciclo:'mantenimiento' },
                { id: item.dataValues.ID_Equipo, date: new Date(itemItem.endDate),ciclo:'mantenimiento' }
              ];
            }else {
              return [
                { id: item.dataValues.ID_Equipo, date: new Date(itemItem.startDate),ciclo:'mantenimiento' },
            ];
            }
          }),
          ...responseOrdenes.flatMap(item => [{ id: item.dataValues.ID_Orden, date: item.dataValues.fecha, ciclo: '' }])
        ])
)
        setEstados(responseEstados_Revision_All)
        setPresupuesto(responsePresupuesto)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    obtenerDatos()
  }, [ver])

  useEffect(() => {
    const equipoSearch = async () => {
      const response = await window.context.getEquipos_By_Id(orden?.ID_Equipo)
      const areaResponse = await window.context.getCategorias_By_ID(orden?.ID_Area ?? 1)
      const estadoImprimir = await window.context.getEstados_Revision_By_Id(orden?.ID_Estado ?? 1)
      const tipo_trabajoResponse = await window.context.getPresupuestos_By_Id(
        parseInt((orden?.ID_Presupuesto)?.toString() ?? '1')
      )
      setEquipoImprimir(response)
      setAreaImprimir(areaResponse)
      setEstadoImprimir(estadoImprimir)
      setTipo_Trabajo(tipo_trabajoResponse)
    }
    equipoSearch()
  }, [orden])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const newOrden: Orden_MantenimientoAttributes = {
      ID_Equipo: parseInt(formData.get('idEquipo') as string),
      ID_Usuario: parseInt(formData.get('idUsuario') as string),
      ID_Estado: parseInt(formData.get('idestado') as string),
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
      fecha: new Date(),
      ID_Presupuesto: parseInt(formData.get('trabajo') as string),
      presupuesto: parseInt(formData.get('presupuesto') as string),
      ID_Area: -1
    }

    newOrden.ID_Area =
      (await window.context.getCategorias_By_ID(newOrden.ID_Equipo))?.dataValues.ID_Categoria ?? -1
    setOrden(newOrden)
    const prevPresupuesto = await window.context.getPresupuestos_By_Id(newOrden.ID_Presupuesto)
    prevPresupuesto.dataValues.monto = prevPresupuesto.dataValues.monto - newOrden.presupuesto
    prevPresupuesto.dataValues.Fecha = new Date()
    await window.context.createOrden_Mantenimiento(newOrden)
    alert('Orden de mantenimiento creada exitosamente')
    const newPresupuesto = await window.context.editPresupuesto_By_Id(
      newOrden.ID_Presupuesto,
      prevPresupuesto.dataValues
    )
    if (newPresupuesto.dataValues.monto < 0) {
      alert('Ha sobrepasado el presupuesto! \n Deuda: ' + newPresupuesto.dataValues.monto)
    }
  }

  useEffect(() => {
    if (date && date[0].startDate) {
      const newOrdenes = ordenesVerLista.filter((item) => {
        const fecha = item.date
        const { startDate, endDate } = date[0]
        return (
          (fecha.getDate() >= startDate.getDate() && fecha.getDate() <= endDate.getDate()) ||
          (fecha.getDate() === startDate.getDate() && fecha.getDate() === endDate.getDate())
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
  
  function searchOrden(id:number) {
    return ordenes.find(item => item.dataValues.ID_Orden === id) ?? null
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
                onChange={(item) => { setDate([item.selection]); setSearching(true)}}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
              <Button_UI
                type="button"
                texto="Borrar"
                funcion={() =>
                  {setDate([{ startDate: new Date(), endDate: new Date(), key: 'selection' , tipoMantenimiento:"" }]);
                  setSearching(false)}
                }
              />
            </div>
            <div className='w-full flex flex-col px-2'>
            <SelectComponent
                  options={['Todo', 'Lubricamiento' , 'Mantenimiento'].map((item,index) => (
                    <option
                      key={index}
                      value={item}
                    >
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
            <table style={{width:'inherit'}} className="my-2 text-lg">
              <thead>
                <th>ID</th>
                <th>Fecha</th>
                <th>Ciclo</th>
              </thead>
              <tbody>
                {searching &&
                  (  filterOrdenes === 'Todo' ? searchedOrden : filterOrdenes === 'Mantenimiento' ? searchedOrden.filter(item => item.ciclo === 'mantenimiento') : searchedOrden.filter(item => item.ciclo === 'lubricamiento')).map((itemOrden, index) => (
                    <tr key={index} className="hover:cursor-pointer hover:border hover:border-black hover:bg-[#b70909] hover:text-white" onClick={() => {setOrden(searchOrden(itemOrden.id)?.dataValues ?? null); setVer('crear-orden')}}>
                      <td>{itemOrden.id}</td> 
                      <td>{itemOrden.date.toLocaleDateString()}</td> 
                      <td>{itemOrden.ciclo}</td> 
                    </tr>
                  ))}
                  {!searching &&
                  ( filterOrdenes === 'Todo' ? ordenesVerLista : filterOrdenes === 'Mantenimiento' ? ordenesVerLista.filter(item => item.ciclo === 'mantenimiento') : ordenesVerLista.filter(item => item.ciclo === 'lubricamiento')).map((itemOrden, index) => (
                    <tr key={index} className="hover:cursor-pointer hover:border hover:border-black hover:bg-[#b70909] hover:text-white" onClick={() => {setOrden(searchOrden(itemOrden.id)?.dataValues ?? null); setVer('crear-orden')}}>
                      <td>{itemOrden.id}</td> 
                      <td>{itemOrden.date.toLocaleDateString()}</td> 
                      <td>{itemOrden.ciclo}</td> 
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
                  value={orden?.ID_Equipo ?? undefined}
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
                  value={ orden?.ID_Usuario ?? undefined}
                  required
                  onChange={() => {}}
                  name="idUsuario"
                  label="Usuario:*"
                  id="idUsuario"
                  className=""
                />
              </section>

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
                <SelectComponent
                  options={presupuesto.map((trabajo, index) => (
                    <option
                      className="first-letter:uppercase"
                      key={index}
                      value={trabajo.dataValues.ID_Presupuesto}
                    >
                      {trabajo.dataValues.Tipo}
                    </option>
                  ))}
                  value={orden?.ID_Presupuesto ?? undefined}
                  required
                  onChange={() => {}}
                  name="trabajo"
                  label="Tipo de Trabajo:*"
                  id="idTrabajo"
                  className=""
                />
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
                  texto="Solicitado Por:*"
                  name="solicitadoPor"
                  funcion={() => {}}
                  required
                />
                <Input_UI
                  type="text"
                  value={orden?.terminadoPor ?? undefined}
                  texto="Terminado Por:*"
                  name="terminadoPor"
                  funcion={() => {}}
                  required
                />
                <Input_UI
                  type="text"
                  value={orden?.revisadoPor ?? undefined}
                  texto="Revisado Por:*"
                  name="revisadoPor"
                  funcion={() => {}}
                  required
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
                  texto="Presupuesto:*"
                  name="presupuesto"
                  funcion={() => {}}
                  required
                />
              </div>
              <div className="w-full flex items-center justify-center gap-x-2">
                <Button_UI type="submit" texto="Crear Orden" funcion={() => {}} />
                {orden && (
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

      {ver === 'imprimir-orden' && orden && (
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
                      <p>{new Date().getDate() ?? ''}</p>
                    </li>
                    <li className="border-r border-black w-full">
                      {' '}
                      <h4>M</h4>
                      <p>{new Date().getMonth() ?? ' ' + 1}</p>
                    </li>
                    <li className="border-r border-black w-full">
                      {' '}
                      <h4>A</h4>
                      <p>{new Date().getFullYear() ?? ''}</p>
                    </li>
                  </ul>
                </section>
              </li>
            </ul>
            {/* Body */}
            <ul className="w-full border border-black grid grid-cols-6 grid-rows-1">
              <li className="col-span-1 border-r border-black">
                <h3>TIPO DE TRABAJO</h3>
                <p>{tipo_trabajo?.dataValues.Tipo}</p>
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
                    <li className="h-[50px]">Tiempo de Parada:{orden.horarioParada}</li>
                    <li className="h-[50px]">Tiempo de Inicio:{orden.horarioComienzo}</li>
                  </ul>
                  <ul>
                    <li>
                      Equipo:{' '}
                      {equipoImprimir?.dataValues.Nombre +
                        ' ' +
                        equipoImprimir?.dataValues.Identificacion}
                    </li>
                    <li className="h-[50px]">
                      Tiempo de Puesta en Marcha:{orden.horarioPuestaMarcha}
                    </li>
                    <li className="h-[50px]">Tiempo de Culminación:{orden.horarioCulminacion}</li>
                  </ul>
                </div>
                <h4>Materiales utilizados: Referenciado en el Vale de Salida</h4>
              </li>
            </ul>
            <div className="w-full flex flex-col items-start border border-black">
              <h4>Observaciones:</h4>
              <p className="w-full h-[300px]">{orden?.observaciones}</p>
            </div>
            <ul className="w-full border border-black grid grid-cols-6">
              <li className="border-r border-black flex flex-col">
                <h4>Solicitado por:</h4> <p>{orden?.solicitadoPor}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Aprobado por:</h4> <p>{orden?.aprobadoPor}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Terminado por:</h4> <p>{orden?.terminadoPor}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Revisado por:</h4> <p>{orden?.revisadoPor}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Vale de Salida:</h4> <p>{orden?.valeSalida}</p>
              </li>
            </ul>
          </div>
          <Button_UI type="button" texto="Imprimir Orden" funcion={() => imprimirOrden()} />
        </div>
      )}
    </RootLayout>
  )
}

export const SelectComponent = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  required = false,
  className
}: {
  id: string
  name: string
  label: string
  options: any
  value: number | undefined
  onChange: React.Dispatch<React.SetStateAction<any>>
  required: boolean
  className: string
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-2xl font-thin font-serif" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={className + ' w-fit border border-black p-2 rounded-md cursor-pointer'}
      >
        <option value="">Selecciona una opción</option>
        {options}
      </select>
    </div>
  )
}
