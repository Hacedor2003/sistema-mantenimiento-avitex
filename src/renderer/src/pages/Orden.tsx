/* eslint-disable prettier/prettier */

import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component';
import { useEffect, useState } from 'react';
import { Equipos, Orden_Mantenimiento, Usuarios } from 'src/main/db/Models';
import { Orden_MantenimientoAttributes } from 'src/shared/types';

export const Orden = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([]);
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const [Descripcion, setDescripcion] = useState('')
  const [Recursos_Humanos, setRecursos_Humanos] = useState('')
  const [Materiales, setMateriales] = useState('')
  const [Observaciones, setObservaciones] = useState('')
  const [Presupuesto, setPresupuesto] = useState(0)
  const [ID_Equipo, setID_Equipo] = useState(0)
  const [ID_Usuario, setID_Usuario] = useState(0)
  const [ver, setVer] = useState<'ver-orden' | 'crear-orden' | ''>('')
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([])

  useEffect(() => {
    // Obtener los equipos y usuarios de la base de datos
    const obtenerDatos = async () => {
      try {
        const responseEquipos = await window.context.getEquipos_All();
        setEquipos(responseEquipos);
        const responseUsuarios = await window.context.getUsuarios_All();
        setUsuarios(responseUsuarios);
        const responseOrdenes = await window.context.getOrden_Mantenimiento_All()
        setOrdenes(responseOrdenes)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    obtenerDatos();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await window.context.createOrden_Mantenimiento({Descripcion,Recursos_Humanos,Materiales,Observaciones,Presupuesto,ID_Equipo,ID_Usuario})
      alert('Orden de mantenimiento creada exitosamente');
    } catch (error) {
      console.error('Error al crear la orden de mantenimiento:', error);
      // Mostrar un mensaje de error
      alert('Ocurrió un error al crear la orden de mantenimiento');
    }
  };

  return (
    <RootLayout>
      <div className='flex flex-row items-center justify-center gap-x-2 m-2'>
        <Button_UI texto='Ver Ordenes' type='button' funcion={()=>setVer('ver-orden')}/>
        <Button_UI texto='Crear Orden' type='button' funcion={()=>setVer('crear-orden')}/>
      </div>
      
      {ver === 'ver-orden' && <>
        <h2 className='text-center text-3xl border-b-2 border-[#b70909] my-3'>Ver Ordenes de Mantenimiento</h2>
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
            {
              ordenes.map((itemOrden, index) => <tr key={index}>
                <td>{itemOrden.dataValues.ID_Orden}</td>
                <td>{itemOrden.dataValues.Descripcion}</td>
                <td>{itemOrden.dataValues.Recursos_Humanos}</td>
                <td>{itemOrden.dataValues.Materiales}</td>
                <td>{itemOrden.dataValues.Observaciones}</td>
                <td>{itemOrden.dataValues.Presupuesto}</td>
                <td>{itemOrden.dataValues.ID_Equipo}</td>
                <td>{itemOrden.dataValues.ID_Usuario}</td>
              </tr>)
            }
          </tbody>
        </table>
      </>}
      
      { ver === 'crear-orden' && <><h2 className='text-center text-3xl border-b-2 border-[#b70909] my-3'>Crear Orden de Mantenimiento</h2>
      <form onSubmit={handleSubmit} className='w-full flex flex-col items-center p-2 gap-y-2'>
        <Input_UI texto='Descripción:' funcion={ setDescripcion} value={Descripcion} type='text' name='Descripcion' />
        <Input_UI texto='Recursos Humanos:' funcion={ setRecursos_Humanos} value={Recursos_Humanos} type='text' name='Recursos_Humanos' />
        <Input_UI texto='Materiales:' funcion={ setMateriales} value={Materiales} type='text' name='Materiales' />
        <Input_UI texto='Observaciones:' funcion={ setObservaciones} value={Observaciones} type='text' name='Observaciones' />
        <Input_UI texto='Presupuesto:' funcion={setPresupuesto} value={Presupuesto} type='number' name='Presupuesto' />
        <section className='flex flex-row gap-x-10 mb-5'>
        <div className='flex flex-col gap-y-2'>
          <label htmlFor="idEquipo">Equipo:</label>
          <select
            id="idEquipo"
            name="idEquipo"
            value={ID_Equipo}
            onChange={(e)=>setID_Equipo(Number(e.target.value))}
            required
            className='w-fit border border-black p-2 rounded-md cursor-pointer'
          >
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
          <select
            id="idUsuario"
            name="idUsuario"
            value={ID_Usuario}
            onChange={(e)=>setID_Usuario(Number(e.target.value))}
            required
            className='w-fit border border-black p-2 rounded-md cursor-pointer'
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.dataValues.ID_Usuario} value={usuario.dataValues.ID_Usuario}>
                {usuario.dataValues.identificacion}
              </option>
            ))}
          </select>
        </div>
        </section>
        <Button_UI type='submit' texto='Crear Orden de Mantenimiento' funcion={()=>{}} />
      </form></>  }
      
    </RootLayout>
  );
};
