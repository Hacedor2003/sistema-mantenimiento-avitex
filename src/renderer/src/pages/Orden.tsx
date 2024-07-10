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
  
  const [tipo_trabajo, setTipo_trabajo] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [unidad, setUnidad] = useState('')
  const fecha = new Date()
  const [organismo, setOrganismo] = useState('')
  const [horarioParada, setHorarioParada] = useState('')
  const [horarioComienzo, setHorarioComienzo] = useState('')
  const [horarioPuestaMarcha, setHorarioPuestaMarcha] = useState('')
  const [horarioCulminacion, setHorarioCulminacion] = useState('')
  const [materialesUsados, setMaterialesUsados] = useState('')
  const [observaciones ,setObservaciones] = useState('')
  const [solicitadoPor, setSolicitadoPor] = useState('')
  const [aprobadoPor, setAprobadoPor] = useState('')
  const [terminadoPor, setTerminadoPor] = useState('')
  const [revisadoPor, setRevisadoPor] = useState('')
  const [valeSalida, setValeSalida] = useState('')
  const [objetivos, setObjetivos] = useState('')
  const [numeroOrden, setNumeroOrden] = useState('')
  
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
    document.body.className = 'imprimible'
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
              <section className='flex flex-row gap-x-10 mb-5'>
              <SelectComponent options={estados.map((estado) => (<option key={estado.dataValues.ID_Estado} value={estado.dataValues.ID_Estado}>{estado.dataValues.Nombre_Estado}</option>))} value={ID_Estado} required onChange={setID_Estado} name='idestado' label='Estado:' id='idEstado' className='' />

              
              {/* Objetivos del Mantenimiento */}
                <SelectComponent options={areas.map((area) => (<option key={area.dataValues.ID_Categoria} value={area.dataValues.ID_Categoria}>{area.dataValues.Nombre_Categoria}</option>))} value={ID_Area} required onChange={setID_Area} name='idArea' label='Area:' id='idArea' className='' />
              </section>
              <Input_UI type='text' value={objetivos} texto='Objetivos Planificados:' name='objetivos' funcion={setObjetivos} />
              <SelectComponent options={['Planificado','Imprevisto','Correctivo'].map((trabajo,index) => (<option key={index} value={trabajo}>{trabajo}</option>))} value={tipo_trabajo} required onChange={setTipo_trabajo} name='trabajo' label='Tipo de Trabajo:' id='idTrabajo' className='' />
              <Input_UI type='text' value={horarioParada} texto='Horario de Maquina Parada:' name='horarioParada' funcion={setHorarioParada} />
              <Input_UI type='text' value={horarioComienzo} texto='Horario de Comienzo:' name='horarioComienzo' funcion={setHorarioComienzo} />
              <Input_UI type='text' value={horarioPuestaMarcha} texto='Horario de Puesta en Marcha:' name='horarioPuestaMarcha' funcion={setHorarioPuestaMarcha} />
              <Input_UI type='text' value={horarioCulminacion} texto='Horario de Culminación:' name='horarioCulminacion' funcion={setHorarioCulminacion} />
              <Input_UI type='text' value={materialesUsados} texto='Materiales Usados:' name='materialeUsados' funcion={setMaterialesUsados} />
              
              <Input_UI type='text' value={observaciones} texto='Observaciones:' name='observaciones' funcion={setObservaciones} />
              <Input_UI type='text' value={solicitadoPor} texto='Solicitado Por:' name='solicitadoPor' funcion={setSolicitadoPor} />
              <Input_UI type='text' value={aprobadoPor} texto='Aprobado Por:' name='aprobadoPor' funcion={setAprobadoPor} />
              <Input_UI type='text' value={terminadoPor} texto='Terminado Por:' name='terminadoPor' funcion={setTerminadoPor} />
              <Input_UI type='text' value={revisadoPor} texto='Revisado Por:' name='revisadoPor' funcion={setRevisadoPor} />
              <Input_UI type='text' value={valeSalida} texto='Vale de Salida:' name='valeSalida' funcion={setValeSalida} />
              
              
              <div className='w-full flex items-center justify-center gap-x-2'>
              <Button_UI type="submit" texto="Crear Orden" funcion={() =>{}} />
              <Button_UI type='button' texto='Vista Previa' funcion={() => setVer('imprimir-orden')} />
              </div>
              </form>
          </div>
        </>
      )}
      
      {ver === 'imprimir-orden' && (
          <div className='w-full flex flex-col items-center p-2'>
          <div className="w-full grid grid-rows-5 imprimible" id="orden-imprimir">
            
            <h4 className='border-b border-black w-full text-center'>ORDEN DE TRABAJO DE MANTENIMIENTO</h4>
            
            {/* Header */}
            <ul className='w-full grid grid-cols-4 border border-black'>
              <li className='border-r border-black'><h4>ORGANISMO</h4><p>{organismo}</p></li>
              <li className='border-r border-black'><h4>EMPRESA</h4><p>{empresa}</p></li>
              <li className='border-r border-black'><h4>UNIDAD</h4><p>{unidad}</p></li>
              <li>
                <section>
                  <ul className='w-full flex justify-around'>
                    <li className='border-r border-black w-full'> <h4>D</h4><p>{fecha.getDate()}</p></li>
                    <li className='border-r border-black w-full'> <h4>M</h4><p>{fecha.getMonth()+1}</p></li>
                    <li className='border-r border-black w-full'> <h4>A</h4><p>{fecha.getFullYear()}</p></li>
                  </ul>
                </section>
              </li>
            </ul>
            {/* Body */}
            <ul className='w-full border border-black grid grid-cols-6 grid-rows-1'>
              <li className='col-span-1 border-r border-black'>
                <h3>TIPO DE TRABAJO</h3>
                <p>{tipo_trabajo}</p>
              </li>
              <li className='col-span-1 border-r border-black'>
                <h3>CRONOGRAMA</h3>
                <p>{ID_Estado}</p>
              </li>
              <li className='col-span-4 border-r border-black'>
                <h3>OBJETIVOS DEL MANTENIMIENTO:{objetivos}</h3>
                <div className='w-full grid grid-cols-2'>
                  <ul>
                    <li>Area:{ID_Area}</li>
                    <li>Horario de Maquina de Parada:{horarioParada}</li>
                    <li>Horario de Comienzo:{horarioComienzo}</li>
                  </ul>
                  <ul>
                    <li>Equipo:{ID_Equipo}</li>
                    <li>Horario de Puesta en Marcha:{horarioPuestaMarcha}</li>
                    <li>Horario de Culminación:{horarioCulminacion}</li>
                  </ul>
                </div>
                <h4>Materiales utilizados:{materialesUsados}</h4>
              </li>
            </ul>
            <div className='w-full flex flex-col items-start border border-black'>
              <h4>Observaciones:</h4>
              <p>{observaciones}</p>
            </div>
            <ul className='w-full border border-black grid grid-cols-6'>
              <li className='border-r border-black flex flex-col'><h4>Solicitado por:</h4> <p>{solicitadoPor}</p></li>
              <li className='border-r border-black flex flex-col'><h4>Aprobado por:</h4> <p>{aprobadoPor}</p></li>
              <li className='border-r border-black flex flex-col'><h4>Terminado por:</h4> <p>{terminadoPor}</p></li>
              <li className='border-r border-black flex flex-col'><h4>Revisado por:</h4> <p>{revisadoPor}</p></li>
              <li className='border-r border-black flex flex-col'><h4>Vale de Salida:</h4> <p>{valeSalida}</p></li>
              <li className='border-r border-black flex flex-col'><h4>Numero de Orden:</h4> <p>{numeroOrden}</p></li>
            </ul>
            
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