/* eslint-disable prettier/prettier */
import React from 'react'
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component'
import { useEffect, useState } from 'react'
import { Categorias, Equipos, Estados_Revision, Orden_Mantenimiento, Usuarios } from 'src/main/db/Models'
import '../styles/orden.styles.css'

export const Orden = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [areas, setAreas] = useState<Categorias[]>([])
  const [estados, setEstados] = useState<Estados_Revision[]>([])
  
  const [empresa, setEmpresa] = useState('')
  const [unidad, setUnidad] = useState('')
  const [fecha, setFecha] = useState<Date>(new Date())
  const [organismo, setOrganismo] = useState('')
  const [horarioParada, setHorarioParada] = useState('')
  const [horarioComienzo, setHorarioComienzo] = useState('')
  const [materialesUsados, setMaterialesUsados] = useState('')
  const [observaciones ,setObservaciones] = useState('')
  const [solicitadoPor, setSolicitadoPor] = useState('')
  const [aprobadoPor, setAprobadoPor] = useState('')
  const [terminadoPor, setTerminadoPor] = useState('')
  const [revisadoPor, setRevisadoPor] = useState('')
  const [valeSalida, setValeSalida] = useState('')
  const [objetivos, setObjetivos] = useState('')
  
  const [ID_Equipo, setID_Equipo] = useState(0)
  const [ID_Usuario, setID_Usuario] = useState(0)
  const [ID_Estado, setID_Estado] = useState('')
  const [ID_Area, setID_Area] = useState('')

  const [ver, setVer] = useState<'ver-orden' | 'crear-orden' | 'imprimir-orden' | ''>('')
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([])

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [responseEquipos,responseUsuarios,responseOrdenes,responseCategorias_All,responseEstados_Revision_All] = await Promise.all([window.context.getEquipos_All(),window.context.getUsuarios_All(),window.context.getOrden_Mantenimiento_All(),window.context.getCategorias_All(),window.context.getEstados_Revision_All()]);

        setEquipos(responseEquipos);
        setUsuarios(responseUsuarios);
        setOrdenes(responseOrdenes);
        setAreas(responseCategorias_All);
        setEstados(responseEstados_Revision_All);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);

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
              <th>ID_Equipo</th>
              <th>ID_Usuario</th>
              <th>fecha_inicio</th>
              <th>fecha_fin</th>
              <th>herramientas</th>
              <th>equiposUsar</th>
              <th>duranteMantenimiento</th>
              <th>repuestos</th>
              <th>tecnico</th>
            </thead>
            <tbody>
              {ordenes.map((itemOrden, index) => (
                <tr key={index}>
                  <td>{itemOrden.dataValues.ID_Orden}</td>
                  <td>{itemOrden.dataValues.ID_Equipo}</td>
                  <td>{itemOrden.dataValues.ID_Usuario}</td>
                  <td>{itemOrden.dataValues.fecha_inicio.toLocaleDateString()}</td>
                  <td>{itemOrden.dataValues.fecha_fin.toLocaleDateString()}</td>
                  <td>{itemOrden.dataValues.herramientas}</td>
                  <td>{itemOrden.dataValues.equiposUsar}</td>
                  <td>{itemOrden.dataValues.duranteMantenimiento}</td>
                  <td>{itemOrden.dataValues.repuestos}</td>
                  <td>{itemOrden.dataValues.tecnico}</td>
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
              {/* Seleccionar Tecnico y Equipo */}
              <section className='flex flex-row gap-x-10 mb-5'>
              <SelectComponent options={equipos.map((equipo) => (<option key={equipo.dataValues.ID_Equipo} value={equipo.dataValues.ID_Equipo}>{equipo.dataValues.Nombre}</option>))} value={ID_Equipo} required onChange={setID_Equipo} name='idEquipo' label='Equipo:' id='idEquipo' className='' />
              <SelectComponent options={usuarios.map((usuario) => (<option key={usuario.dataValues.ID_Usuario} value={usuario.dataValues.ID_Usuario}>{usuario.dataValues.identificacion}</option>))} value={ID_Usuario} required onChange={setID_Usuario} name='idUsuario' label='Usuario:' id='idUsuario' className='' />
              </section>
              
              <Input_UI type='text' value={organismo} texto='Organismo:' name='organismo' funcion={setOrganismo} />
              <Input_UI type='text' value={empresa} texto='Empresa:' name='empresa' funcion={setEmpresa} />
              <Input_UI type='text' value={unidad} texto='Unidad:' name='unidad' funcion={setUnidad} />
              <Input_UI type='date' value={fecha} texto='Fecha:' name='fecha' funcion={setFecha} />
              <section className='flex flex-row gap-x-10 mb-5'>
              <SelectComponent options={estados.map((estado) => (<option key={estado.dataValues.ID_Estado} value={estado.dataValues.ID_Estado}>{estado.dataValues.Nombre_Estado}</option>))} value={ID_Estado} required onChange={setID_Estado} name='idestado' label='Estado:' id='idEstado' className='' />

              
              {/* Objetivos del Mantenimiento */}
                <SelectComponent options={areas.map((area) => (<option key={area.dataValues.ID_Categoria} value={area.dataValues.ID_Categoria}>{area.dataValues.Nombre_Categoria}</option>))} value={ID_Area} required onChange={setID_Area} name='idArea' label='Area:' id='idArea' className='' />
              </section>
              <Input_UI type='text' value={objetivos} texto='Objetivos Planificados:' name='objetivos' funcion={setObjetivos} />
              <Input_UI type='text' value={horarioParada} texto='Horario de Maquina Parada:' name='horarioParada' funcion={setHorarioParada} />
              <Input_UI type='text' value={horarioComienzo} texto='Horario de Comienzo:' name='horarioComienzo' funcion={setHorarioComienzo} />
              <Input_UI type='text' value={materialesUsados} texto='Materiales Usados:' name='materialeUsados' funcion={setMaterialesUsados} />
              
              <Input_UI type='text' value={observaciones} texto='Observaciones:' name='observaciones' funcion={setObservaciones} />
              <Input_UI type='text' value={solicitadoPor} texto='Solicitado Por:' name='solicitadoPor' funcion={setSolicitadoPor} />
              <Input_UI type='text' value={aprobadoPor} texto='Aprobado Por:' name='aprobadoPor' funcion={setAprobadoPor} />
              <Input_UI type='text' value={terminadoPor} texto='Terminado Por:' name='terminadoPor' funcion={setTerminadoPor} />
              <Input_UI type='text' value={revisadoPor} texto='Revisado Por:' name='revisadoPor' funcion={setRevisadoPor} />
              <Input_UI type='text' value={valeSalida} texto='Vale de Salida:' name='valeSalida' funcion={setValeSalida} />
              
              
              <Button_UI type='button' texto='Vista Previa' funcion={() => setVer('imprimir-orden')} />
              </form>
          </div>
        </>
      )}
      
      {ver === 'imprimir-orden' && (
          <div className='w-full flex flex-col items-center p-2'>
          <div className="w-full flex flex-col items-center p-2 gap-y-2" id="orden-imprimir">
              <h3>Orden de Trabajo de Mantenimiento</h3>
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
        )}
    </RootLayout>
  )
}

const SelectComponent = ({ id, name, label, options, value, onChange, required = false, className }: { id: string; name: string; label: string; options: Array; value: any; onChange: React.Dispatch<React.SetStateAction<any>>  ; required: boolean; className:string}) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        required={required}
        className={className + ' w-fit border border-black p-2 rounded-md cursor-pointer'}
      >
        <option value="">Selecciona una opción</option>
        {options}
      </select>
    </div>
  );
};