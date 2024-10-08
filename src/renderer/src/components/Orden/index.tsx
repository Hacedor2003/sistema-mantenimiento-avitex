/* eslint-disable prettier/prettier */
import { fechaType } from '@renderer/Interface'
import { itemOrdenes } from '@renderer/pages/Orden'
import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import { CategoriasAttributes, EquiposAttributes, Estados_RevisionAttributes, Orden_MantenimientoAttributes, PresupuestoAttributes, Tipo_MantenimientoAttributes, UsuariosAttributes } from 'src/shared/types'
import { Button_UI, Input_UI, SelectComponent } from '../UI_Component'

export const VerOrden = ({

  presupuesto,
  searching,
  date,
  searchedOrden,
  ordenesVerLista,
  setDate,
  setSearching,
  setVer,
  handleSetOrden
}: {
  presupuesto: PresupuestoAttributes[]
  searching: boolean
  date: fechaType[]
  searchedOrden: itemOrdenes[]
  ordenesVerLista: itemOrdenes[]
  setDate: React.Dispatch<React.SetStateAction<fechaType[]>>
  setSearching: React.Dispatch<React.SetStateAction<boolean>>
  setVer: React.Dispatch<React.SetStateAction<'' | 'imprimir-orden' | 'crear-orden' | 'ver-orden'>>
  handleSetOrden: (item: any) => void
  }) => {
  /* Filtrar las ordenes */
  const [filterOrdenes, setFilterOrdenes] = useState<'Todo' | 'Mantenimiento' | 'Lubricación' | "orden">('Todo')
  
  return (
    <main className="w-full px-2">
      <header className="w-full flex flex-col items-center justify-around mb-10">
        <h2 className="text-center text-3xl border-b-2 border-[#b70909] my-3">
          Ordenes de Mantenimiento
        </h2>
        {/* Ver el presupuesto actual */}
        <div className="w-full flex items-center justify-around">
          {presupuesto.map((presupuestoItem, index) => (
            <p key={index} className="text-xl font-bold font-sans">
              Presupuesto {presupuestoItem.Tipo}:{' '}
              <span className="text-base font-mono font-thin">
                {presupuestoItem.monto}
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
            options={['Todo', 'Lubricación', 'Mantenimiento' , 'orden'].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
            value={undefined}
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
              <th>Identificación</th>
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
                  : filterOrdenes === 'Lubricación' ? 
                  searchedOrden.filter((item) => item.ciclo === 'lubricación')
                  : searchedOrden.filter((item) => item.ciclo === 'orden')
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
                    <td>{itemOrden.nombre ?? 'Nombre'}</td>
                    <td>{itemOrden.identificacion ?? 'Identificacion'}</td>
                    <td>{itemOrden.date.toLocaleDateString()}</td>
                    <td>{itemOrden.ciclo}</td>
                    <td>{itemOrden.tipoMantenimiento ? itemOrden.tipoMantenimiento : ''}</td>
                  </tr>
                ))}
              {!searching &&
                (filterOrdenes === 'Todo'
                  ? ordenesVerLista
                  : filterOrdenes === 'Mantenimiento'
                    ? ordenesVerLista.filter((item) => item.ciclo === 'mantenimiento')
                  : filterOrdenes === 'Lubricación' ? 
                  ordenesVerLista.filter((item) => item.ciclo === 'lubricación')
                  : ordenesVerLista.filter((item) => item.ciclo === 'orden')
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
                    <td>{itemOrden.identificacion}</td>
                    <td>{itemOrden.date.toLocaleDateString()}</td>
                    <td>{itemOrden.ciclo}</td>
                    <td>{itemOrden.tipoMantenimiento}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </article>
    </main>
  )
}

export const CrearOrden = ({
  equipos,
  estados,
  usuarios,
  tipos_mantenimientos,
  orden,
  date,
  presupuesto,
  equiposSeleccionadoLista,
  equipoSeleccionado,
  handleSubmit,
  setDate,
  setSearching,
  setVer
}: {
  equipos: EquiposAttributes[]
  estados: Estados_RevisionAttributes[]
  usuarios: UsuariosAttributes[]
  tipos_mantenimientos: Tipo_MantenimientoAttributes[]
  orden: Orden_MantenimientoAttributes | null
  date: fechaType[]
  presupuesto: PresupuestoAttributes[]
  equipoSeleccionado: EquiposAttributes | null
  equiposSeleccionadoLista: itemOrdenes | null
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  setDate: React.Dispatch<React.SetStateAction<fechaType[]>>
  setSearching: React.Dispatch<React.SetStateAction<boolean>>
  setVer: React.Dispatch<React.SetStateAction<'' | 'imprimir-orden' | 'crear-orden' | 'ver-orden'>>
  }) => {
  const ordenEditar = orden
  const [ob, setOb] = useState(ordenEditar?.observaciones)
   const [sol, setSol] = useState(orden?.solicitadoPor)
  const [termi, setTermi] = useState(orden?.terminadoPor)
  const [revisado, setRevisado] = useState(orden?.revisadoPor)
  const [valeSalida, setValeSalid] = useState(orden?.valeSalida)
  const [pres, setPres] = useState(orden?.presupuesto) 
  
  return (
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
                <option key={equipo.ID_Equipo} value={equipo.ID_Equipo}>
                  {equipo.Nombre}
                </option>
              ))}
              value={equipoSeleccionado?.ID_Equipo ?? ordenEditar?.ID_Equipo ?? undefined}
              required
              onChange={() => {}}
              name="idEquipo"
              label="Equipo:*"
              id="idEquipo"
              className=""
            />
            <SelectComponent
              options={usuarios.map((usuario) => (
                <option key={usuario.ID_Usuario} value={usuario.ID_Usuario}>
                  {usuario.identificacion}
                </option>
              ))}
              value={ordenEditar?.ID_Usuario ?? undefined}
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
                <option key={estado.ID_Estado} value={estado.ID_Estado}>
                  {estado.Nombre_Estado}
                </option>
              ))}
              value={ordenEditar?.ID_Estado ?? undefined}
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
                    value={trabajo.ID_Presupuesto ?? ordenEditar?.tipo_trabajo}
                  >
                    {trabajo.Tipo}
                  </option>
                ))}
                value={equiposSeleccionadoLista ?  2 :  ordenEditar ? parseInt(ordenEditar.tipo_trabajo) : undefined}
                required
                onChange={() => {}}
                name="trabajo"
                label="Tipo de Trabajo:*"
                id="idTrabajo"
                className=""
              />
            
            {!equiposSeleccionadoLista && (
              <SelectComponent
                options={tipos_mantenimientos?.map((trabajo, index) => (
                  <option className="first-letter:uppercase" key={index} value={trabajo.ID_Tipo_Mantenimiento}>
                    {trabajo.Tipo}
                  </option>
                ))}
                value={ ordenEditar?.tipo_mantenimiento ?? undefined}
                required
                onChange={() => {}}
                name="mantenimiento"
                label="Tipo de Mantenimiento:*"
                id="idMantenimiento"
                className=""
              />
            )}
            {equiposSeleccionadoLista && <p>{equiposSeleccionadoLista.tipoMantenimiento}</p>}
          </div>

          <Input_UI
            type="text"
            value={ob ?? undefined}
            texto="Observaciones:"
            name="observaciones"
            funcion={setOb}
            required={false}
          />

          <div className="w-full flex">
            <Input_UI
              type="text"
              value={sol ?? undefined}
              texto="Solicitado Por:"
              name="solicitadoPor"
              funcion={setSol}
              required={false}
            />
            <Input_UI
              type="text"
              value={termi ?? undefined}
              texto="Terminado Por:"
              name="terminadoPor"
              funcion={setTermi}
              required={false}
            />
            <Input_UI
              type="text"
              value={revisado ?? undefined}
              texto="Revisado Por:"
              name="revisadoPor"
              funcion={setRevisado}
              required={false}
            />
          </div>

          <div className="w-full flex">
            <Input_UI
              type="text"
              value={valeSalida ?? undefined}
              texto="Vale de Salida:"
              name="valeSalida"
              funcion={setValeSalid}
              required={false}
            />

            <Input_UI
              type="number"
              value={pres ?? undefined}
              texto="Presupuesto:"
              name="presupuesto"
              funcion={setPres}
              required={false}
            />
          </div>

          <div className="w-full flex items-center justify-center gap-x-2">
            <Button_UI type="submit" texto={ ordenEditar?.ID_Orden ? "Actualizar" : "Crear Orden"} funcion={() => {}} />
            {(equipoSeleccionado || ordenEditar) && (
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
  )
}

export const ImprimirOrden = ({
  orden,
  tipo_trabajo,
  tipo_mantenimiento,
  estadoImprimir,
  areaImprimir,
  equipoImprimir,
  imprimirOrden,
  equiposSeleccionadoLista
}: {
  orden: Orden_MantenimientoAttributes | null
  tipo_trabajo: PresupuestoAttributes | null
  tipo_mantenimiento: Tipo_MantenimientoAttributes | null
  estadoImprimir: Estados_RevisionAttributes | null
  areaImprimir: CategoriasAttributes | null
  equipoImprimir: EquiposAttributes | null
    imprimirOrden(): void
    equiposSeleccionadoLista:itemOrdenes | null
}) => {
  return <div className="w-full flex flex-col items-center p-2">
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
              <li className="border-r border-black w-full flex flex-col justify-center items-center">
                <h4>D</h4>
                <p>{orden?.fecha.getDate() ?? new Date().getDate()}</p>
              </li>
              <li className="border-r border-black w-full flex flex-col justify-center items-center">
                {' '}
                <h4>M</h4>
                <p>{orden?.fecha.getMonth() ?? new Date().getMonth() + 1}</p>
              </li>
              <li className="border-r border-black w-full flex flex-col justify-center items-center">
                {' '}
                <h4>A</h4>
                <p>{orden?.fecha.getUTCFullYear() ?? new Date().getFullYear()}</p>
              </li>
            </ul>
          </section>
        </li>
      </ul>
      {/* Body */}
      <ul className="w-full border border-black grid grid-cols-6 grid-rows-1">
        <li className="col-span-1 border-r border-black">
          <h3>TIPO DE TRABAJO</h3>
          <p>{tipo_trabajo?.Tipo + '\n -' + (equiposSeleccionadoLista?.tipoMantenimiento ?? tipo_mantenimiento?.Tipo)}</p>
        </li>
        <li className="col-span-1 border-r border-black">
          <h3>CRONOGRAMA</h3>
          <p>{estadoImprimir?.Nombre_Estado}</p>
        </li>
        <li className="col-span-4 border-r border-black">
          <h3>OBJETIVOS DEL MANTENIMIENTO:</h3>
          <div className="w-full grid grid-cols-2">
            <ul>
              <li>Area:{areaImprimir?.Nombre_Categoria}</li>
              <li className="h-[50px]">Tiempo de Parada:{orden?.horarioParada ?? ''}</li>
              <li className="h-[50px]">Tiempo de Inicio:{orden?.horarioComienzo ?? ''}</li>
            </ul>
            <ul>
              <li>
                Equipo:{' '}
                {equipoImprimir?.Nombre +
                  ' ' +
                  equipoImprimir?.Identificacion}
              </li>
              <li className="h-[50px]">
                Tiempo de Puesta en Marcha:{orden?.horarioPuestaMarcha ?? ''}
              </li>
              <li className="h-[50px]">Tiempo de Culminación:{orden?.horarioCulminacion ?? ''}</li>
            </ul>
          </div>
          <h4>Materiales utilizados: Referenciado en el Vale de Salida</h4>
        </li>
      </ul>
      <div className="w-full flex flex-col items-start border border-black">
        <h4>Observaciones:</h4>
        <p className="w-full h-[300px]">{orden?.observaciones ?? ''}</p>
      </div>
      <ul className="w-full border border-black grid grid-cols-6">
        <li className="border-r border-black flex flex-col">
          <h4>Solicitado por:</h4> <p>{orden?.solicitadoPor ?? ''}</p>
        </li>
        <li className="border-r border-black flex flex-col">
          <h4>Aprobado por:</h4> <p>{orden?.aprobadoPor ?? ''}</p>
        </li>
        <li className="border-r border-black flex flex-col">
          <h4>Terminado por:</h4> <p>{orden?.terminadoPor ?? ''}</p>
        </li>
        <li className="border-r border-black flex flex-col">
          <h4>Revisado por:</h4> <p>{orden?.revisadoPor ?? ''}</p>
        </li>
        <li className="border-r border-black flex flex-col">
          <h4>Vale de Salida:</h4> <p>{orden?.valeSalida ?? ''}</p>
        </li>
      </ul>
    </div>
    <Button_UI type="button" texto="Imprimir Orden" funcion={() => imprimirOrden()} />
  </div>
}
