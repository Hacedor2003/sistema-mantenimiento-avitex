/* eslint-disable prettier/prettier */
import React from 'react'
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component'
import { useEffect, useState } from 'react'
import { Equipos, Orden_Mantenimiento, Usuarios } from 'src/main/db/Models'
import '../styles/orden.styles.css'

export const Orden = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [ID_Equipo, setID_Equipo] = useState(0)
  const [ID_Usuario, setID_Usuario] = useState(0)
  const [fecha_inicio, setFecha_inicio] = useState<Date>(new Date())
  const [fecha_fin, setFecha_fin] = useState<Date>(new Date())
  const [herramientas, setHerramientas] = useState<string>('')
  const [equiposUsar, setEquiposUsar] = useState<string>('')
  const [duranteMantenimiento, setduranteMantenimiento] = useState<string>('')
  const [repuestos, setRepuestos] = useState<string>('')
  const [tecnico, setTecnico] = useState<string>('')

  const [ver, setVer] = useState<'ver-orden' | 'crear-orden' | 'imprimir-orden' | ''>('')
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([])

  useEffect(() => {
    // Obtener los equipos y usuarios de la base de datos
    const obtenerDatos = async () => {
      try {
        const responseEquipos = await window.context.getEquipos_All()
        setEquipos(responseEquipos)
        const responseUsuarios = await window.context.getUsuarios_All()
        setUsuarios(responseUsuarios)
        const responseOrdenes = await window.context.getOrden_Mantenimiento_All()
        setOrdenes(responseOrdenes)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }
    obtenerDatos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await window.context.createOrden_Mantenimiento({
        Descripcion,
        Recursos_Humanos,
        Materiales,
        Observaciones,
        Presupuesto,
        ID_Equipo,
        ID_Usuario,
        fecha_inicio: fechainicio,
        fecha_fin: fechafin,
        estado
      })
      alert('Orden de mantenimiento creada exitosamente')
    } catch (error) {
      console.error('Error al crear la orden de mantenimiento:', error)
      // Mostrar un mensaje de error
      alert('Ocurrió un error al crear la orden de mantenimiento')
    }
  }

  function imprimirOrden() {
    //window.context.imprimirOrden()
    const contenido = document.getElementById('orden-imprimir').innerHTML;
     const contenidoOriginal= document.body.innerHTML;
     document.body.innerHTML = contenido;
     window.print();
     document.body.innerHTML = contenidoOriginal;
  }

  return (
    <RootLayout>
      <div className="flex flex-row items-center justify-center gap-x-2 m-2">
        <Button_UI texto="Ver Ordenes" type="button" funcion={() => setVer('ver-orden')} />
        <Button_UI texto="Crear Orden" type="button" funcion={() => setVer('crear-orden')} />
      </div>

      {ver === 'ver-orden' && (
        <>
          <h2 className="text-center text-3xl border-b-2 border-[#b70909] my-3">
            Ver Ordenes de Mantenimiento
          </h2>
          <table className="w-full my-2 text-left text-lg">
            <thead>
              <th>ID_Orden</th>
              <th>Descripcion</th>
              <th>Recursos_Humanos</th>
              <th>Materiales</th>
              <th>Observaciones</th>
              <th>Presupuesto</th>
              <th>ID_Equipo</th>
              <th>ID_Usuario</th>
            </thead>
            <tbody>
              {ordenes.map((itemOrden, index) => (
                <tr key={index}>
                  <td>{itemOrden.dataValues.ID_Orden}</td>
                  <td>{itemOrden.dataValues.Descripcion}</td>
                  <td>{itemOrden.dataValues.Recursos_Humanos}</td>
                  <td>{itemOrden.dataValues.Materiales}</td>
                  <td>{itemOrden.dataValues.Observaciones}</td>
                  <td>{itemOrden.dataValues.Presupuesto}</td>
                  <td>{itemOrden.dataValues.ID_Equipo}</td>
                  <td>{itemOrden.dataValues.ID_Usuario}</td>
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
            <form onSubmit={handleSubmit} className='w-1/2 flex flex-col items-center p-2 gap-y-2'>
              <section className='flex flex-row gap-x-10 mb-5'>
                <div className='flex flex-col gap-y-2'>
                  <label htmlFor="idEquipo">Equipo:</label>
                  <select id="idEquipo" name="idEquipo" value={ID_Equipo} onChange={(e)=>setID_Equipo(Number(e.target.value))} required className='w-fit border border-black p-2 rounded-md cursor-pointer'>
                    <option value="">Selecciona un equipo</option>
                    {equipos.map((equipo) => (
                      <option key={equipo.dataValues.ID_Equipo} value={equipo.dataValues.ID_Equipo}>
                        {equipo.dataValues.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <label htmlFor="idUsuario">Usuario:</label>
                  <select id="idUsuario" name="idUsuario" value={ID_Usuario} onChange={(e)=>setID_Usuario(Number(e.target.value))} required className='w-fit border border-black p-2 rounded-md cursor-pointer' >
                    <option value="">Selecciona un usuario</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.dataValues.ID_Usuario} value={usuario.dataValues.ID_Usuario}>
                        {usuario.dataValues.identificacion}
                      </option>
                    ))}
                  </select>
                </div>
              </section>
              
              <Input_UI type='date' value={fecha_inicio} texto='Fecha de Inicio:' name='fechainicio' funcion={setFecha_inicio} />
              <Input_UI type='text' value={herramientas} texto='Herramientas:' name='herramientas' funcion={setHerramientas} />
              <Input_UI type='text' value={equiposUsar} texto='Equipos a usar:' name='equiposusar' funcion={setEquiposUsar} />
              <Input_UI type='text' value={duranteMantenimiento} texto='Durante la Ejecución del Mantenimiento:' name='durantemantenimiento' funcion={setduranteMantenimiento} />
              <Input_UI type='text' value={repuestos} texto='Repuestos:' name='durantemantenimiento' funcion={setRepuestos} />
              <Input_UI type='text' value={tecnico} texto='Tecnico:' name='tecnico' funcion={setTecnico} />
              <Input_UI type='date' value={fecha_fin} texto='Fecha Fin:' name='fechafin' funcion={setFecha_fin} />
              
              <Button_UI type='button' texto='Vista Previa' funcion={() => setVer('imprimir-orden')} />
              </form>
          </div>
        </>
      )}
      
      {
        ver === 'imprimir-orden' && (
          <div className='w-full flex flex-col items-center p-2'>
          <div className="w-full flex flex-col items-center p-2 gap-y-2" id="orden-imprimir">
              <h3>Orden de Mantenimiento</h3>
              <br />
              <h4>
                <span>1</span>Datos:
              </h4>
              <section className="w-full flex flex-row items-start justify-around">
                <div className="w-full">
                  <h6>Equipos:</h6>
                  <table className="w-full">
                    <thead>
                      <th>Nombre</th>
                      <th>Identificación</th>
                      <th>Area</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Nombre</td>
                        <td>ID</td>
                        <td>Area</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <h6>Fecha de Inicio:</h6>
              <p>{fecha_inicio.toLocaleString()}</p>
              <br />
              <h4>
                <span>2</span>Antes de iniciar la ejecución del mantenimiento:
              </h4>
              <p>2.1 SOLCITAR LOS PERMISOS DE TRABAJOS PERTINENTES</p>
              <p>2.2 ASEGURAR QUE EL EQUIPO CUMPLE CON EL PROGRAMA DE LIMPIEZA Y DESINFECIÓN</p>
              <p>2.3 ASEGURAR EL BLOQUEO Y LETRERO DE EQUIPO/ÁREA EN MANTENIMIENTO</p>
              <p>
                2.4 UTILIZAR LOS EQUIPOS DE SEGURIDAD Y PROTECCION PERSONAL APROPIADOS PARA LA
                ACTIVIDAD DE MANTENIMIENTO
              </p>
              <p>2.5 ANTES DEL MANTENIMIENTO</p>
              <br />
              <h6>Herramientas:</h6>
              <p>{herramientas}</p>
              <h6>Equipos:</h6>
              <p>{equiposUsar}</p>
              <br />
              <h4>
                <span>3</span>Durante la ejecución del mantenimiento:
              </h4>
              <p>{duranteMantenimiento}</p>
              <br />
              <h4>
                <span>4</span>Despues de los trabajos de mantenimiento asegurese de que:
              </h4>
              <p>
                4.1 SEAN RETIRADOS QUIMICOS COMO LUBRICANTES, SOLVENTES, ETC,. Y SE COLOQUEN EN UN
                LUGAR DEFINIDO DE CONFINAMIENTO.
              </p>
              <p>
                4.2 EL EQUIPO O INSTALACION QUEDE LIBRE DE FRAGMENTOS O RESIDUOS DE METAL, PINTURA
                OXIDO, ETC.
              </p>
              <p>4.3 TODA HERRAMIENTA SEA RETIRADA DEL ÁREA.</p>
              <p>4.4 EL EQUIPO O INSTALACION QUEDE LIMPIO</p>
              <br />
              <h4>
                <span>5</span>REPUESTOS
              </h4>
              <p>{repuestos}</p>
              <br />
              <h4>
                <span>6</span>ENTREGA DE EQUIPO
              </h4>
              <p>{tecnico}</p>
              <br />
              <h4>
                <span>7</span>Fecha de Terminacion
              </h4>
              <p>{fecha_fin.toLocaleString()}</p>
            </div>
            <Button_UI type="button" texto="Imprimir Orden" funcion={() => imprimirOrden()} />
          </div>
        )
      }
    </RootLayout>
  )
}
