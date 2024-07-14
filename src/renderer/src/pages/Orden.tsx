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

export const Orden = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [areas, setAreas] = useState<Categorias[]>([])
  const [estados, setEstados] = useState<Estados_Revision[]>([])
  const [presupuesto, setPresupuesto] = useState<Presupuesto[]>([])

  /* Crear Orden */
  const [orden, setOrden] = useState<Orden_MantenimientoAttributes | null>(null)
  /* Ver Ordenes */
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([])
  /* Pantalla */
  const [ver, setVer] = useState<'ver-orden' | 'crear-orden' | 'imprimir-orden' | ''>('')

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [
          responseEquipos,
          responseUsuarios,
          responseOrdenes,
          responseCategorias_All,
          responseEstados_Revision_All,
          responsePresupuesto
        ] = await Promise.all([
          window.context.getEquipos_All(),
          window.context.getUsuarios_All(),
          window.context.getOrden_Mantenimiento_All(),
          window.context.getCategorias_All(),
          window.context.getEstados_Revision_All(),
          window.context.getPresupuestos_All()
        ])
        setEquipos(responseEquipos)
        setUsuarios(responseUsuarios)
        setOrdenes(responseOrdenes)
        setAreas(responseCategorias_All)
        setEstados(responseEstados_Revision_All)
        setPresupuesto(responsePresupuesto)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    obtenerDatos()
  }, [ver])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)

      const newOrden: Orden_MantenimientoAttributes = {
        ID_Equipo: parseInt(formData.get('idEquipo') as string),
        ID_Usuario: parseInt(formData.get('idUsuario') as string),
        ID_Estado: parseInt(formData.get('idestado') as string),
        ID_Area: parseInt(formData.get('idArea') as string),
        organismo: formData.get('organismo') as string,
        horarioParada: formData.get('horarioParada') as string,
        horarioComienzo: formData.get('horarioComienzo') as string,
        horarioPuestaMarcha: formData.get('horarioPuestaMarcha') as string,
        horarioCulminacion: formData.get('horarioCulminacion') as string,
        materialesUsados: formData.get('materialeUsados') as string,
        observaciones: formData.get('observaciones') as string,
        solicitadoPor: formData.get('solicitadoPor') as string,
        aprobadoPor: formData.get('aprobadoPor') as string,
        terminadoPor: formData.get('terminadoPor') as string,
        revisadoPor: formData.get('revisadoPor') as string,
        valeSalida: formData.get('valeSalida') as string,
        objetivos: formData.get('objetivos') as string,
        tipo_trabajo: formData.get('trabajo') as string,
        empresa: formData.get('empresa') as string,
        unidad: formData.get('unidad') as string,
        fecha: new Date(),
        ID_Presupuesto: parseInt(formData.get('trabajo') as string),
        presupuesto: parseInt(formData.get('presupuesto') as string)
      }
      setOrden(newOrden)
      const prevPresupuesto = await window.context.getPresupuestos_By_Id(newOrden.ID_Presupuesto)
      prevPresupuesto.monto = prevPresupuesto.dataValues.monto - newOrden.presupuesto
      prevPresupuesto.Fecha = new Date()
      await window.context.createOrden_Mantenimiento(newOrden)
      alert('Orden de mantenimiento creada exitosamente')
      const newPresupuesto = await window.context.editPresupuesto_By_Id(newOrden.ID_Presupuesto,prevPresupuesto)
      alert('Presupuesto editado correctamente exitosamente: ' + newPresupuesto.dataValues.monto )
    } catch (error) {
      console.error('Error al crear la orden de mantenimiento:', error)
      alert('Ocurrió un error al crear la orden de mantenimiento')
    }
  }

  function imprimirOrden() {
    //window.context.imprimirOrden()
    const contenido = document.getElementById('orden-imprimir').innerHTML
    const contenidoOriginal = document.body.innerHTML
    document.body.innerHTML = contenido
    document.body.className = 'imprimible'
    window.print()
    document.body.innerHTML = contenidoOriginal
  }

  return (
    <RootLayout>
      <div className="flex flex-row items-center justify-center gap-x-2 m-2">
        <Button_UI texto="Ver Ordenes" type="button" funcion={() => setVer('ver-orden')} />
        <Button_UI texto="Crear Orden" type="button" funcion={() => setVer('crear-orden')} />
      </div>

      {ver === 'ver-orden' && (
        <>
          <header className="w-full flex flex-col items-center justify-around">
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
          <table className="w-full my-2 text-left text-lg">
            <thead>
              <th>ID_Orden</th>
              <th>ID_Equipo</th>
              <th>ID_Usuario</th>
              <th>Tipo</th>
              <th>Tipo de Presupuesto</th>
              <th>Fecha</th>
            </thead>
            <tbody>
              {ordenes.map((itemOrden, index) => (
                <tr key={index}>
                  <td>{itemOrden.dataValues.ID_Orden}</td>
                  <td>{itemOrden.dataValues.ID_Equipo}</td>
                  <td>{itemOrden.dataValues.ID_Usuario}</td>
                  <td>{itemOrden.dataValues.tipo_trabajo}</td>
                  <td>{itemOrden.dataValues.ID_Presupuesto}</td>
                  <td>{itemOrden.dataValues.fecha.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {ver === 'crear-orden' && (
        <>
          <h2 className="text-center text-3xl border-b-2 border-[#b70909] my-3">
            Crear Orden de Mantenimiento
          </h2>
          <div className="w-full flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-1/2 flex flex-col items-center p-2 gap-y-2">
              {/* Seleccionar Tecnico y Equipo */}
              <section className="flex flex-row gap-x-10 mb-5">
                <SelectComponent
                  options={equipos.map((equipo) => (
                    <option key={equipo.dataValues.ID_Equipo} value={equipo.dataValues.ID_Equipo}>
                      {equipo.dataValues.Nombre}
                    </option>
                  ))}
                  value={undefined}
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
                  value={undefined}
                  required
                  onChange={() => {}}
                  name="idUsuario"
                  label="Usuario:*"
                  id="idUsuario"
                  className=""
                />
              </section>

              <Input_UI
                type="text"
                value={undefined}
                texto="Organismo:"
                name="organismo"
                funcion={() => { }}
                required={false}
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Empresa:"
                name="empresa"
                funcion={() => { }}
                required={false}
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Unidad:"
                name="unidad"
                funcion={() => { }}
                required={false}
              />
              <section className="flex flex-row gap-x-10 mb-5">
                <SelectComponent
                  options={estados.map((estado) => (
                    <option key={estado.dataValues.ID_Estado} value={estado.dataValues.ID_Estado}>
                      {estado.dataValues.Nombre_Estado}
                    </option>
                  ))}
                  value={undefined}
                  required
                  onChange={() => {}}
                  name="idestado"
                  label="Estado:*"
                  id="idEstado"
                  className=""
                />

                {/* Objetivos del Mantenimiento */}
                <SelectComponent
                  options={areas.map((area) => (
                    <option key={area.dataValues.ID_Categoria} value={area.dataValues.ID_Categoria}>
                      {area.dataValues.Nombre_Categoria}
                    </option>
                  ))}
                  value={undefined}
                  required
                  onChange={() => {}}
                  name="idArea"
                  label="Area:*"
                  id="idArea"
                  className=""
                />
              </section>
              <Input_UI
                type="text"
                value={undefined}
                texto="Objetivos Planificados:*"
                name="objetivos"
                funcion={() => { }}
                required
              />
              <SelectComponent
                options={presupuesto.map((trabajo, index) => (
                  <option className='first-letter:uppercase' key={index} value={trabajo.dataValues.ID_Presupuesto}>
                    {trabajo.dataValues.Tipo}
                  </option>
                ))}
                value={undefined}
                required
                onChange={() => {}}
                name="trabajo"
                label="Tipo de Trabajo:*"
                id="idTrabajo"
                className=""
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Horario de Maquina Parada:"
                name="horarioParada"
                funcion={() => { }}
                required={false}
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Horario de Comienzo:"
                name="horarioComienzo"
                funcion={() => { }}
                required={false}
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Horario de Puesta en Marcha:"
                name="horarioPuestaMarcha"
                funcion={() => { }}
                required={false}
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Horario de Culminación:"
                name="horarioCulminacion"
                funcion={() => { }}
                required={false}
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Materiales Usados:*"
                name="materialeUsados"
                funcion={() => { }}
                required
              />

              <Input_UI
                type="text"
                value={undefined}
                texto="Observaciones:"
                name="observaciones"
                funcion={() => { }}
                required={false}
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Solicitado Por:*"
                name="solicitadoPor"
                funcion={() => { }}
                required
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Aprobado Por:*"
                name="aprobadoPor"
                funcion={() => { }}
                required
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Terminado Por:*"
                name="terminadoPor"
                funcion={() => { }}
                required
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Revisado Por:*"
                name="revisadoPor"
                funcion={() => { }}
                required
              />
              <Input_UI
                type="text"
                value={undefined}
                texto="Vale de Salida:"
                name="valeSalida"
                funcion={() => { }}
                required={false}
              />
              
              <Input_UI
                type="number"
                value={undefined}
                texto="Presupuesto:*"
                name="presupuesto"
                funcion={() => { }}
                required
              />

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
                <p>{orden.organismo}</p>
              </li>
              <li className="border-r border-black">
                <h4>EMPRESA</h4>
                <p>{orden.empresa}</p>
              </li>
              <li className="border-r border-black">
                <h4>UNIDAD</h4>
                <p>{orden.unidad}</p>
              </li>
              <li>
                <section>
                  <ul className="w-full flex justify-around">
                    <li className="border-r border-black w-full">
                      {' '}
                      <h4>D</h4>
                      <p>{orden.fecha.getDate()}</p>
                    </li>
                    <li className="border-r border-black w-full">
                      {' '}
                      <h4>M</h4>
                      <p>{orden.fecha.getMonth() + 1}</p>
                    </li>
                    <li className="border-r border-black w-full">
                      {' '}
                      <h4>A</h4>
                      <p>{orden.fecha.getFullYear()}</p>
                    </li>
                  </ul>
                </section>
              </li>
            </ul>
            {/* Body */}
            <ul className="w-full border border-black grid grid-cols-6 grid-rows-1">
              <li className="col-span-1 border-r border-black">
                <h3>TIPO DE TRABAJO</h3>
                <p>{orden.tipo_trabajo}</p>
              </li>
              <li className="col-span-1 border-r border-black">
                <h3>CRONOGRAMA</h3>
                <p>{orden.ID_Estado}</p>
              </li>
              <li className="col-span-4 border-r border-black">
                <h3>OBJETIVOS DEL MANTENIMIENTO:{orden.objetivos}</h3>
                <div className="w-full grid grid-cols-2">
                  <ul>
                    <li>Area:{orden.ID_Area}</li>
                    <li>Horario de Maquina de Parada:{orden.horarioParada}</li>
                    <li>Horario de Comienzo:{orden.horarioComienzo}</li>
                  </ul>
                  <ul>
                    <li>Equipo:{orden.ID_Equipo}</li>
                    <li>Horario de Puesta en Marcha:{orden.horarioPuestaMarcha}</li>
                    <li>Horario de Culminación:{orden.horarioCulminacion}</li>
                  </ul>
                </div>
                <h4>Materiales utilizados:{orden.materialesUsados}</h4>
              </li>
            </ul>
            <div className="w-full flex flex-col items-start border border-black">
              <h4>Observaciones:</h4>
              <p>{orden.observaciones}</p>
            </div>
            <ul className="w-full border border-black grid grid-cols-6">
              <li className="border-r border-black flex flex-col">
                <h4>Solicitado por:</h4> <p>{orden.solicitadoPor}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Aprobado por:</h4> <p>{orden.aprobadoPor}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Terminado por:</h4> <p>{orden.terminadoPor}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Revisado por:</h4> <p>{orden.revisadoPor}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Vale de Salida:</h4> <p>{orden.valeSalida}</p>
              </li>
              <li className="border-r border-black flex flex-col">
                <h4>Numero de Orden:</h4> <p>{orden.numeroOrden}</p>
              </li>
            </ul>
          </div>
          <Button_UI type="button" texto="Imprimir Orden" funcion={() => imprimirOrden()} />
        </div>
      )}
    </RootLayout>
  )
}

const SelectComponent = ({
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
  options: Array
  value: any
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
