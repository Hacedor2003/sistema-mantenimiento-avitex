/* eslint-disable prettier/prettier */
import React from 'react'
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI } from '@renderer/components/UI_Component'
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
import { fechaType } from './Anadir'
import { CrearOrden, ImprimirOrden, VerOrden } from '../components/Orden'

export type itemOrdenes = {
  id: number
  date: Date
  ciclo: string
  tipoMantenimiento: string
  nombre: string
}

export const Orden = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [estados, setEstados] = useState<Estados_Revision[]>([])
  const [presupuesto, setPresupuesto] = useState<Presupuesto[]>([])
  const [tipos_mantenimientos, setTipo_Mantenimiento] = useState<Tipo_Mantenimiento[]>([])

  /* Crear Orden */
  const [orden, setOrden] = useState<Orden_MantenimientoAttributes | null>(null)
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipos | null>(null)
  const [equiposSeleccionadoLista, setequiposSeleccionadoLista] = useState<itemOrdenes | null>(null)
  /* Ver Ordenes */
  const [ordenesVerLista, setOrdenesVerLista] = useState<itemOrdenes[]>([])
  const [searchedOrden, setSearchedOrden] = useState<itemOrdenes[]>([])
  
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
        const [responseEquipos,responseUsuarios,responseOrdenes,responseEstados_Revision_All,responsePresupuesto,responseTiposMantenimiento] = await Promise.all([
          window.context.getEquipos_All(),
          window.context.getUsuarios_All(),
          window.context.getOrden_Mantenimiento_All(),
          window.context.getEstados_Revision_All(),
          window.context.getPresupuestos_All(),
          window.context.getTipo_Mantenimiento_All()
        ])
        if (responseEquipos.length > 0) {
          setEquipos(responseEquipos)
        } else alert("No hay equipos")
        if (responseUsuarios.length > 0) {
          setUsuarios(responseUsuarios)
        } else alert('No hay usuarios')
        if (responseTiposMantenimiento.length > 0) {
          setTipo_Mantenimiento(responseTiposMantenimiento)
        } else alert('No hay tipos de mantenimiento')
        if (responseEstados_Revision_All.length > 0) {
          setEstados(responseEstados_Revision_All)
        } else alert('No hay estados de revision')
        if (responsePresupuesto.length > 0) {
          setPresupuesto(responsePresupuesto)
        } else alert('No hay presupuesto')
          
        setOrdenesVerLista(
          responseEquipos.flatMap((item) => [
            ...item.dataValues.fecha_lubricamiento.flatMap((itemItem) => {
              if (new Date(itemItem.startDate).toLocaleDateString() !== new Date(itemItem.endDate).toLocaleDateString()) {
                return [
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'lubricación',
                    tipoMantenimiento: ""
                  },
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.endDate),
                    ciclo: 'lubricación',
                    tipoMantenimiento: ""
                  }
                ]
              } else {
                return [
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'lubricación',
                    tipoMantenimiento: ""
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
                    tipoMantenimiento: tipos_mantenimientos.find((item) => item.dataValues.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento)?.dataValues.Tipo
                  },
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.endDate),
                    ciclo: 'mantenimiento',
                    tipoMantenimiento: tipos_mantenimientos.find((item) => item.dataValues.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento)?.dataValues.Tipo
                  }
                ]
              } else {
                return [
                  {
                    nombre: item.dataValues.Nombre,
                    id: item.dataValues.ID_Equipo,
                    date: new Date(itemItem.startDate),
                    ciclo: 'mantenimiento',
                    tipoMantenimiento: tipos_mantenimientos.find((item) => item.dataValues.ID_Tipo_Mantenimiento === itemItem.tipoMantenimiento)?.dataValues.Tipo
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
            ciclo: 'orden',
            tipoMantenimiento: '-1',
            nombre: "orden"
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
        const tipo_trabajoResponse = await window.context.getPresupuestos_By_Id(
          orden!.ID_Presupuesto
        )
        const tipo_mante = await window.context.getTipo_Mantenimiento_By_Id(
          equipoSeleccionado!.dataValues!.TipoMantenimiento
        )
        setEquipoImprimir(response)
        setAreaImprimir(areaResponse)
        setEstadoImprimir(estadoImprimir)
        setTipo_Trabajo(tipo_trabajoResponse)
        seTipo_Mantenimiento(tipo_mante)
    
    }
    equipoSearch()
  }, [orden])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const newOrden: Orden_MantenimientoAttributes = {
      ID_Equipo:
        parseInt(formData.get('idEquipo') as string) ?? equipoSeleccionado?.dataValues.ID_Equipo,
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
      tipo_mantenimiento: parseInt((formData.get('mantenimiento') as string) ?? 2),
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

  const handleSetOrden = (item) => {
    const e = equipos.find((i) => i.dataValues.ID_Equipo === item.id)
    setequiposSeleccionadoLista(item)
    setEquipoSeleccionado(e ?? null)
  }

  return (
    <RootLayout>
      <div className="flex flex-row items-center justify-center gap-x-2 m-2">
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
          key={2}
        />
      )}
    </RootLayout>
  )
}
