/* eslint-disable prettier/prettier */
import { AppContext } from '@renderer/Data/Store'
import { fechaType } from '@renderer/Interface'
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI } from '@renderer/components/UI_Component'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriasAttributes, EquiposAttributes, Estados_RevisionAttributes, Orden_MantenimientoAttributes, PresupuestoAttributes, Tipo_MantenimientoAttributes, UsuariosAttributes } from 'src/shared/types'
import { CrearOrden, ImprimirOrden, VerOrden } from '../components/Orden'
import '../styles/orden.styles.css'

export type itemOrdenes = {
  id: number
  date: Date
  ciclo: string
  tipoMantenimiento: string
  nombre: string
  identificacion: string
}

export const Orden = () => {
  const { id: equipoID } = useParams()

  const [equipos, setEquipos] = useState<EquiposAttributes[]>([])
  const [usuarios, setUsuarios] = useState<UsuariosAttributes[]>([])
  const [estados, setEstados] = useState<Estados_RevisionAttributes[]>([])
  const [presupuesto, setPresupuesto] = useState<PresupuestoAttributes[]>([])
  const [tipos_mantenimientos, setTipo_Mantenimiento] = useState<Tipo_MantenimientoAttributes[]>([])
  const [ordenes, setOrdenes] = useState<Orden_MantenimientoAttributes[]>([])

  /* Crear Orden */
  const [orden, setOrden] = useState<Orden_MantenimientoAttributes | null>(null)
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<EquiposAttributes | null>(null)
  const [equiposSeleccionadoLista, setequiposSeleccionadoLista] = useState<itemOrdenes | null>(null)
  /* Ver Ordenes */
  const [ordenesVerLista, setOrdenesVerLista] = useState<itemOrdenes[]>([])
  const [searchedOrden, setSearchedOrden] = useState<itemOrdenes[]>([])

  /* Pantalla */
  const [ver, setVer] = useState<'ver-orden' | 'crear-orden' | 'imprimir-orden' | ''>(
    equipoID ? 'crear-orden' : ''
  )

  /* Equipo  */
  const [equipoImprimir, setEquipoImprimir] = useState<EquiposAttributes | null>(null)
  const [areaImprimir, setAreaImprimir] = useState<CategoriasAttributes | null>(null)
  const [estadoImprimir, setEstadoImprimir] = useState<Estados_RevisionAttributes | null>(null)
  const [tipo_trabajo, setTipo_Trabajo] = useState<PresupuestoAttributes | null>(null)
  const [tipo_mantenimiento, seTipo_Mantenimiento] = useState<Tipo_MantenimientoAttributes | null>(null)

  /* Filtrar por Fecha */
  const [date, setDate] = useState<fechaType[]>([
    { startDate: new Date(), endDate: new Date(), key: 'selection', tipoMantenimiento: '' }
  ])
  const [searching, setSearching] = useState(false)
  
  const context = useContext(AppContext)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const {equipos,usuarios,tipo_mantenimiento,estados,presupuestos,ordenes} = context.data
          setEquipos(equipos.data)
          setUsuarios(usuarios.data)
          setTipo_Mantenimiento(tipo_mantenimiento.data)
          setEstados(estados.data)
          setPresupuesto(presupuestos.data)
        setOrdenes(ordenes.data)

        setOrdenesVerLista(
          equipos.data.flatMap((item) => [
            ...item.fecha_lubricamiento.flatMap((itemItem) => {
              if (
                new Date(itemItem.startDate).toLocaleDateString() !==
                new Date(itemItem.endDate).toLocaleDateString()
              ) {
                return [
                  {
                    nombre: item.Nombre,
                    id: item.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'lubricación',
                    identificacion:item.Identificacion,
                    tipoMantenimiento: ''
                  },
                  {
                    nombre: item.Nombre,
                    identificacion:item.Identificacion,
                    id: item.ID_Equipo,
                    date: new Date(itemItem.endDate),
                    ciclo: 'lubricación',
                    tipoMantenimiento: ''
                  }
                ]
              } else {
                return [
                  {
                    nombre: item.Nombre,
                    identificacion:item.Identificacion,
                    id: item.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'lubricación',
                    tipoMantenimiento: ''
                  }
                ]
              }
            }),
            ...item.fecha_mantenimiento.flatMap((itemItem) => {
              if (itemItem.startDate !== itemItem.endDate) {
                return [
                  {
                    nombre: item.Nombre,
                    identificacion:item.Identificacion,
                    id: item.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'mantenimiento',
                    tipoMantenimiento: tipos_mantenimientos.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.Tipo
                  },
                  {
                    nombre: item.Nombre,
                    identificacion:item.Identificacion,
                    id: item.ID_Equipo,
                    date: new Date(itemItem.endDate),
                    ciclo: 'mantenimiento',
                    tipoMantenimiento: tipos_mantenimientos.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.Tipo
                  }
                ]
              } else {
                return [
                  {
                    nombre: item.Nombre,
                    identificacion:item.Identificacion,
                    id: item.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'mantenimiento',
                    tipoMantenimiento: tipos_mantenimientos.find(
                      (item) => item.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento
                    )?.Tipo
                  }
                ]
              }
            })
          ])
        )
        setOrdenesVerLista((prevItems) => {
          const nuevosItems = ordenes.data.map((item) => ({
            id: item.ID_Orden ?? -1,
            identificacion:'identificacion',
            date: item.fecha,
            ciclo: 'orden',
            tipoMantenimiento: 'Orden Imprevista',
            nombre: 'orden'
          }))

          return [...prevItems, ...nuevosItems]
        })
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    obtenerDatos()
  }, [ver])

  useEffect(() => {
    const equipoSearch = async () => {
      const response = await window.context.getEquipos_By_Id(orden?.ID_Equipo)
      const areaResponse = await window.context.getCategorias_By_ID(orden!.ID_Area)
      const estadoImprimir = await window.context.getEstados_Revision_By_Id(orden!.ID_Estado)
      const tipo_trabajoResponse = await window.context.getPresupuestos_By_Id(orden!.ID_Presupuesto)
      const tipo_mante = await window.context.getTipo_Mantenimiento_By_Id(orden?.tipo_mantenimiento ?? equipoSeleccionado!.TipoMantenimiento)
      setEquipoImprimir(response)
      setAreaImprimir(areaResponse)
      setEstadoImprimir(estadoImprimir)
      setTipo_Trabajo(tipo_trabajoResponse)
      seTipo_Mantenimiento(tipo_mante)
    }
    equipoSearch()
  }, [orden])

  useEffect(() => {
    const equipoSearch = async () => {
      const response = await window.context.getEquipos_By_Id(
        equipoSeleccionado?.ID_Equipo
      )
      const areaResponse = await window.context.getCategorias_By_ID(
        equipoSeleccionado!.CategoriasID
      )
      const estadoImprimir = await window.context.getEstados_Revision_By_Id(
        equipoSeleccionado!.Estado
      )
      const tipo_trabajoResponse = await window.context.getPresupuestos_By_Id(
        orden?.ID_Presupuesto ?? 2
      )
      const tipo_mante = await window.context.getTipo_Mantenimiento_By_Id(
        equipoSeleccionado!.TipoMantenimiento
      )
      setEquipoImprimir(response)
      setAreaImprimir(areaResponse)
      setEstadoImprimir(estadoImprimir)
      setTipo_Trabajo(tipo_trabajoResponse)
      seTipo_Mantenimiento(tipo_mante)
    }
    equipoSearch()
  }, [equipoSeleccionado, equiposSeleccionadoLista])

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

  /* Si existe ID equipo por parametros */
  useEffect(() => {
    const equipoSearch = async () => {
      const response = await window.context.getEquipos_By_Id(equipoID)
      if (response) {
        const areaResponse = await window.context.getCategorias_By_ID(
          response!.CategoriasID
        )
        const estadoImprimir = await window.context.getEstados_Revision_By_Id(
          response!.Estado
        )
        //const tipo_trabajoResponse = await window.context.getPresupuestos_By_Id(equipoSeleccionado!.p)
        const tipo_mante = await window.context.getTipo_Mantenimiento_By_Id(
          response!.TipoMantenimiento
        )
        setEquipoImprimir(response)
        setAreaImprimir(areaResponse)
        setEstadoImprimir(estadoImprimir)
        //setTipo_Trabajo(tipo_trabajoResponse)
        seTipo_Mantenimiento(tipo_mante)

        setEquipoSeleccionado(response)
      }
    }
    equipoSearch()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)

      const newOrden: Orden_MantenimientoAttributes = {
        ID_Equipo:parseInt(formData.get('idEquipo') as string) ?? orden?.ID_Equipo ?? equipoSeleccionado?.ID_Equipo,
        ID_Usuario: parseInt((formData.get('idUsuario') as string) ?? orden?.ID_Usuario),
        ID_Estado: parseInt((formData.get('idestado') as string) ?? orden?.ID_Estado),
        horarioParada: (formData.get('horarioParada') as string) ?? orden?.horarioParada,
        horarioComienzo: (formData.get('horarioComienzo') as string) ?? orden?.horarioComienzo,
        horarioPuestaMarcha:
          (formData.get('horarioPuestaMarcha') as string) ?? orden?.horarioPuestaMarcha,
        horarioCulminacion:
          (formData.get('horarioCulminacion') as string) ?? orden?.horarioCulminacion,
        materialesUsados: orden?.materialesUsados ?? '',
        observaciones: (formData.get('observaciones') as string) ?? orden?.observaciones,
        solicitadoPor: (formData.get('solicitadoPor') as string) ?? orden?.solicitadoPor,
        aprobadoPor: 'Director',
        terminadoPor: (formData.get('terminadoPor') as string) ?? orden?.terminadoPor,
        revisadoPor: (formData.get('revisadoPor') as string) ?? orden?.revisadoPor,
        valeSalida: (formData.get('valeSalida') as string) ?? orden?.valeSalida,
        objetivos: orden?.objetivos ?? '',
        tipo_trabajo: (formData.get('trabajo') as string) ?? orden?.tipo_trabajo,
        tipo_mantenimiento: parseInt(
          (formData.get('mantenimiento') as string) ?? orden?.tipo_mantenimiento
        ),
        fecha: date[0].startDate ?? orden?.fecha,
        ID_Presupuesto: parseInt((formData.get('trabajo') as string) ?? orden?.ID_Presupuesto),
        presupuesto: parseInt((formData.get('presupuesto') as string) ?? orden?.presupuesto),
        ID_Area: orden?.ID_Area ?? equipoSeleccionado?.CategoriasID ?? equipos.find(e => e.ID_Equipo === parseInt(formData.get('idEquipo') as string))?.CategoriasID ?? -1
      }

      if (orden?.ID_Orden) {
        const res = await window.context.editOrden_Mantenimiento_By_Id(orden.ID_Orden, newOrden)
        if (res) {
          setOrden(res)
          alert('Orden de mantenimiento creada exitosamente')
        }
      } else {
        setOrden(newOrden)
        const res = await window.context.createOrden_Mantenimiento(newOrden)
        if (res) {
          setOrden(res)
          alert('Orden de mantenimiento creada exitosamente')
        }
      }

      if (newOrden.presupuesto) {
        const prevPresupuesto = await window.context.getPresupuestos_By_Id(newOrden.ID_Presupuesto)
        prevPresupuesto.monto = prevPresupuesto.monto - newOrden.presupuesto
        prevPresupuesto.Fecha = new Date()
        const newPresupuesto = await window.context.editPresupuesto_By_Id(
          newOrden.ID_Presupuesto,
          prevPresupuesto
        )
        if (newPresupuesto && newPresupuesto.monto < 0) {
          alert('Ha sobrepasado el presupuesto! \n Deuda: ' + newPresupuesto.monto)
        }
      }
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

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

  const handleSetOrden = (item: itemOrdenes) => {
    if (item.ciclo === 'orden') {
      setOrden(ordenes.find((i) => i.ID_Orden === item.id) ?? null)
      console.log(orden)
    } else {
      const e = equipos.find((i) => i.ID_Equipo === item.id)
      setequiposSeleccionadoLista(item)
      setEquipoSeleccionado(e ?? null)
    }
  }

  return (
    <RootLayout>
      <div className="absolute top-24 left-0 flex flex-row items-center justify-start gap-x-2 m-2">
        <Button_UI texto="Ver Ordenes" type="button" funcion={() => setVer('ver-orden')} />
        <Button_UI texto="Crear Orden" type="button" funcion={() => setVer('crear-orden')} />
      </div>

      {ver === 'ver-orden' && (
        <VerOrden
          setVer={setVer}
          setSearching={setSearching}
          setDate={setDate}
          searching={searching}
          searchedOrden={searchedOrden}
          presupuesto={presupuesto}
          ordenesVerLista={ordenesVerLista}
          handleSetOrden={handleSetOrden}
          date={date}
          key={0}
        />
      )}

      {ver === 'crear-orden' && (
        <CrearOrden
          usuarios={usuarios}
          tipos_mantenimientos={tipos_mantenimientos}
          setVer={setVer}
          setSearching={setSearching}
          setDate={setDate}
          presupuesto={presupuesto}
          orden={orden}
          handleSubmit={handleSubmit}
          estados={estados}
          equiposSeleccionadoLista={equiposSeleccionadoLista}
          equipos={equipos}
          equipoSeleccionado={equipoSeleccionado}
          date={date}
          key={1}
        />
      )}

      {ver === 'imprimir-orden' && (
        <ImprimirOrden
          tipo_trabajo={tipo_trabajo}
          tipo_mantenimiento={tipo_mantenimiento}
          orden={orden}
          imprimirOrden={imprimirOrden}
          estadoImprimir={estadoImprimir}
          equipoImprimir={equipoImprimir}
          areaImprimir={areaImprimir}
          equiposSeleccionadoLista={equiposSeleccionadoLista}
          key={2}
        />
      )}
    </RootLayout>
  )
}
