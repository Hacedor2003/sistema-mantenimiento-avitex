/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component'
import { useEffect, useState } from 'react'
import {
  Categorias,
  Equipos,
  Estados_Revision,
  Presupuesto,
  Tipo_Mantenimiento,
  Usuarios
} from 'src/main/db/Models'
import { addDays } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

export interface fechaType {
  startDate: Date
  endDate: Date
  key: string
}

const Anadir = (): JSX.Element => {
  const [fechaMantenimiento, setFechaMantenimiento] = useState<fechaType[]>([
    { startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection' }
  ])
  const [fecha_mantenimiento, setFecha_mantenimiento] = useState<fechaType[]>([])
  const [fechaLubricamiento, setFechaLubricamiento] = useState<fechaType[]>([
    { startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection' }
  ])
  const [fecha_lubricamiento, setFecha_lubricamiento] = useState<fechaType[]>([])
  const [ver, setVer] = useState<'area' | 'maquinaria' | 'usuario' | 'mantenimiento' | 'estado' | 'editar-presupuesto' | 'editar-area' | 'editar-maquinaria' | 'editar-usuario' | 'editar-mantenimiento' | 'editar-estado' | ''>('')

  const [estadoData, setEstadoData] = useState<Estados_Revision[]>([])
  const [tipoMantenimientoData, setTipoMantenimientoData] = useState<Tipo_Mantenimiento[]>([])
  const [categoriaData, setcategoriaData] = useState<Categorias[]>([])
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([])
  const [maquinarias, setMaquinarias] = useState<Equipos[]>([])
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const idBorrar = parseInt(formData.get('borrar') as string)
    const idEditar = parseInt(formData.get('editar') as string)
    

    
      switch (ver) {
        case 'area':
          {
            const newCategoria = await window.context.createCategorias({ Nombre_Categoria: formData.get('nombre') as string })
            if (newCategoria) {
              window.alert('Categoría creada exitosamente')
            }
          }
          break
        case 'maquinaria':
          {
            const newEquipo = await window.context.createEquipos({
              TipoMantenimiento: parseInt(formData.get('tipoMantenimiento') as string),
              Origen: formData.get('origen') as string,
              Nombre: formData.get('nombre') as string,
              Identificacion: formData.get('iden') as string,
              Estado: parseInt(formData.get('estado') as string),
              Comentarios: formData.get('comentarios') as string,
              CategoriasID: parseInt(formData.get('categoria') as string),
              fecha_mantenimiento: fecha_mantenimiento.map((item) => ({
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                key: item.key
              })),
              fecha_lubricamiento: fecha_lubricamiento.map((item) => ({
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                key: item.key
              }))
            })
            if (newEquipo) {
              window.alert('Equipo creado exitosamente')
            }
          }
          break
        case 'usuario':
          {
            const equipo = await window.context.createUsuarios({
              Rol: 'user',
              identificacion: formData.get('nombre') as string,
              contrasena: formData.get('contrasena') as string
            })
            if (equipo) {
              window.alert('Usuario creado exitosamente')
            }
          }
          break
        case 'estado':
          {
            const newEstado = await window.context.createEstados_Revision({ Nombre_Estado: formData.get('nombre') as string })
            if (newEstado) {
              window.alert('Estado creado exitosamente')
            }
          }
          break
        case 'mantenimiento':
          {
            const newMantenimiento = await window.context.createTipo_Mantenimiento({ Tipo: formData.get('nombre') as string })
            if (newMantenimiento) {
              window.alert('Tipo de Mantenimiento creado exitosamente')
            }
          }
          break
        case 'editar-presupuesto':
          {
            const idPresupuesto = parseInt(formData.get('idpresupuesto') as string)
            const prevPresupuesto = await window.context.getPresupuestos_By_Id(idPresupuesto)
            prevPresupuesto.monto = parseInt(formData.get('presupuesto') as string)
            prevPresupuesto.Fecha = new Date()
            const newPresupuesto = await window.context.editPresupuesto_By_Id(
              idPresupuesto,
              prevPresupuesto
            )
            if (newPresupuesto) {
              alert('Presupuesto Editado Correctamente')
            }
          }
          break
        case 'editar-area':
          {  
            if (idBorrar) {
              await window.context.deleteCategorias_By_Id(idBorrar)
              window.alert('Categoría eliminada exitosamente')
            } else if (idEditar) {
            const nombre = formData.get('nombre') as string
              const updatedCategoria = await window.context.editCategorias_By_Id(idEditar,{Nombre_Categoria:nombre})
            if (updatedCategoria) {
              window.alert('Categoría actualizada exitosamente')
            }
            }
          }
          break
        case 'editar-estado':
          { 
            if (idBorrar) {
              await window.context.deleteEstados_Revision_By_Id(idBorrar)
              window.alert('Estado eliminado exitosamente')
            } else if (idEditar) {
              const nombre = formData.get('nombre') as string
              const updatedEstado = await window.context.editEstados_Revision_By_Id(idEditar,{Nombre_Estado:nombre})
              if (updatedEstado) {
                window.alert('Estado actualizado exitosamente')
              }
            }
          }
          break
        case 'editar-mantenimiento':
          {
            if (idBorrar) {
              await window.context.deleteTipo_Mantenimiento_By_Id(idBorrar)
              window.alert('Tipo de Mantenimiento eliminado exitosamente')
            } else if (idEditar) {
              const nombre = formData.get('nombre') as string
              const updatedTipoMantenimiento = await window.context.editTipo_Mantenimiento_By_Id(idEditar,{Tipo:nombre})
              if (updatedTipoMantenimiento) {
                window.alert('Tipo de Mantenimiento actualizado exitosamente')
              }
            }
          }
          break
        case 'editar-maquinaria':
          {
            if (idBorrar) {
              await window.context.deleteEquipos_By_Id(idBorrar)
              window.alert('Equipo eliminado exitosamente')
            } else if (idEditar) {
              const nombre = formData.get('nombre') as string
              const identificacion = formData.get('identificacion') as string
              const categoria = formData.get('categoria') as string
              const comentarios = formData.get('comentarios') as string
              const estado = formData.get('estado') as string
              const origen = formData.get('origen') as string
              const mantenimiento = formData.get('mantenimiento') as string
              const fechalubricamiento = formData.get('fechalubricamiento') as string
              const fechamantenimiento = formData.get('fechamantenimiento') as string
              const updatedEquipo = await window.context.editEquipos_By_Id(idEditar,{Nombre:nombre,Identificacion:identificacion,Origen:origen,Comentarios:comentarios,TipoMantenimiento:parseInt(mantenimiento),CategoriasID:parseInt(categoria),Estado:parseInt(estado),fecha_lubricamiento:fechalubricamiento,fecha_mantenimiento:fechamantenimiento})
              if (updatedEquipo) {
                window.alert('Equipo actualizado exitosamente')
              }
            }
          }
          break
        case 'editar-usuario':
          {
            if (idBorrar) {
              await window.context.deleteUsuarios_By_Id(idBorrar)
              window.alert('Usuario eliminado exitosamente')
            } else if (idEditar) {
              const identificacion = formData.get('identificacion') as string
              const rol = formData.get('rol') as string
              const contrasena = formData.get('contrasena') as string
              
              const updatedUsuario = await window.context.editUsuarios_By_Id(idEditar, {identificacion:identificacion,Rol:rol,contrasena:contrasena})
              if (updatedUsuario) {
                window.alert('Usuario actualizado exitosamente')
              }
            }
          }
          break
        default:
          break
      }
    
  }
  
  useEffect(() => {
    window.context
      .getCategorias_All()
      .then((response) => {
        setcategoriaData(response)
      })
      .catch((error) => console.log(error))
  }, [categoriaData])
  
  useEffect(() => {
    window.context
      .getTipo_Mantenimiento_All()
      .then((response) => {
        setTipoMantenimientoData(response)
      })
      .catch((error) => console.log(error))
  }, [tipoMantenimientoData])
  
  useEffect(() => {
    window.context
    .getEstados_Revision_All()
    .then((response) => {
      setEstadoData(response)
    })
    .catch((error) => console.log(error))
  }, [estadoData])
  
  useEffect(() => {
    window.context
      .getPresupuestos_All()
      .then((response) => {
        setPresupuestos(response)
      })
      .catch((error) => console.log(error))
  }, [presupuestos])
  
  useEffect(() => {
    window.context
      .getEquipos_All()
      .then((response) => {
        setMaquinarias(response)
      })
      .catch((error) => console.log(error))
  }, [maquinarias])
  
  useEffect(() => {
    window.context
      .getUsuarios_All()
      .then((response) => {
        setUsuarios(response)
      })
      .catch((error) => console.log(error))
  }, [usuarios])
  
  useEffect(() => {
    setFecha_mantenimiento((prevFecha) => {
      if (
        !prevFecha.some(
          (item) =>
            item.startDate.toISOString() === fechaMantenimiento[0].startDate.toISOString() &&
            item.endDate.toISOString() === fechaMantenimiento[0].endDate.toISOString()
        )
      ) {
        return [...prevFecha, fechaMantenimiento[0]]
      }
      return prevFecha
    })
  }, [fechaMantenimiento])
  
  useEffect(() => {
    setFecha_lubricamiento((prevFecha) => {
      if (
        !prevFecha.some(
          (item) =>
            item.startDate.toISOString() === fechaLubricamiento[0].startDate.toISOString() &&
            item.endDate.toISOString() === fechaLubricamiento[0].endDate.toISOString()
        )
      ) {
        return [...prevFecha, fechaLubricamiento[0]]
      }
      return prevFecha
    })
  }, [fechaLubricamiento])

  const handleDelete = (
    item: fechaType,
    setFunction: React.Dispatch<React.SetStateAction<fechaType[]>>
  ) => {
    setFunction((prevFecha) => {
      return prevFecha.filter(
        (fecha) =>
          fecha.startDate.toISOString() !== item.startDate.toISOString() ||
          fecha.endDate.toISOString() !== item.endDate.toISOString()
      )
    })
  }

  return (
    <RootLayout>
      <main className="w-full flex flex-col items-center px-2 text-lg">
        <div className="w-full flex items-center justify-around">
          <div>
            <h4 className="text-4xl font-serif font-bold my-2">Desea añadir?</h4>
            <div className="p-1 flex items-center gap-x-4">
              <Button_UI funcion={() => setVer('area')} type="button" texto="Area" />
              <Button_UI funcion={() => setVer('maquinaria')} type="button" texto="Equipo" />
              <Button_UI funcion={() => setVer('usuario')} type="button" texto="Usuario" />
              <Button_UI
                funcion={() => setVer('mantenimiento')}
                type="button"
                texto="Tipo de Mantenimiento"
              />
              <Button_UI funcion={() => setVer('estado')} type="button" texto="Estado" />
            </div>
          </div>
          <div>
            <h4 className="text-4xl font-serif font-bold my-2">Desea Editar?</h4>
            <div className="p-1 flex items-center gap-x-4">
              <Button_UI
                funcion={() => setVer('editar-presupuesto')}
                type="button"
                texto="Presupuesto"
              />
              <Button_UI funcion={() => setVer('editar-area')} type="button" texto="Area" />
              <Button_UI funcion={() => setVer('editar-maquinaria')} type="button" texto="Equipo" />
              <Button_UI funcion={() => setVer('editar-usuario')} type="button" texto="Usuario" />
              <Button_UI
                funcion={() => setVer('editar-mantenimiento')}
                type="button"
                texto="Tipo de Mantenimiento"
              />
              <Button_UI funcion={() => setVer('editar-estado')} type="button" texto="Estado" />
            </div>
          </div>
        </div>

        {ver === 'area' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={()=>{}}
              name="nombre"
              required
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'maquinaria' && (
          <form
            className="w-full flex flex-col items-center justify-around m-2 gap-y-4"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={()=>{}}
              name="nombre"
              required
            />
            <Input_UI
              value={undefined}
              type="text"
              texto="Identificación:"
              funcion={()=>{}}
              name="iden"
              required
            />
            <Input_UI
              value={undefined}
              type="text"
              texto="Origen:"
              funcion={()=>{}}
              name="origen"
              required
            />
            <Input_UI
              value={undefined}
              type="text"
              texto="Comentarios:"
              funcion={()=>{}}
              name="comentarios"
              required
            />

            <label htmlFor="inputMantenimiento">Tipo de Mantenimiento</label>
            <select
              id="inputMantenimiento"
              className="w-fit border border-black p-2 rounded-md cursor-pointer"
              name='tipoMantenimiento'
            >
              <option value={-1}> Tipo de Mantenimiento </option>
              {tipoMantenimientoData.map((mantenimientoItem, index) => (
                <option key={index} value={mantenimientoItem.dataValues.ID_Tipo_Mantenimiento}>
                  {mantenimientoItem.dataValues.Tipo}
                </option>
              ))}
            </select>
            <label htmlFor="inputEstado">Estado</label>
            <select
              name="estado"
              id="inputEstado"
              className="w-fit border border-black p-2 rounded-md cursor-pointer"
            >
              <option value={-1}> Tipo de Estado </option>
              {estadoData.map((estadoItem, index) => (
                <option key={index} value={estadoItem.dataValues.ID_Estado}>
                  {estadoItem.dataValues.Nombre_Estado}
                </option>
              ))}
            </select>
            <label htmlFor="inputCategoria">Categoria</label>
            <select
              name='categoria'
              id="inputCategoria"
              className="w-fit border border-black p-2 rounded-md cursor-pointer"
            >
              <option value={-1}> Tipo de Area </option>
              {categoriaData.map((categoriaItem, index) => (
                <option key={index} value={categoriaItem.dataValues.ID_Categoria}>
                  {categoriaItem.dataValues.Nombre_Categoria}
                </option>
              ))}
            </select>
            <div className="self-center p-5 flex flex-row items-start justify-center gap-x-10">
              <div>
                <h4>Escoga la fecha del Mantenimiento:</h4>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setFechaMantenimiento([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={fechaMantenimiento}
                />
              </div>
              <div>
                <h3>Mantenimiento</h3>
                <ul>
                  {fecha_mantenimiento.map((item, index) => (
                    <li key={index} className="p-1 flex flex-row items-center">
                      <div className="flex flex-col items-center mx-2">
                        <h6>Fecha Inicial</h6>
                        <p>{item.startDate.toLocaleDateString() ?? ''}</p>
                      </div>
                      <div className="flex flex-col items-center mx-2">
                        <h6>Fecha Final</h6>
                        <p>{item.endDate.toLocaleDateString() ?? ''}</p>
                      </div>
                      <Button_UI
                        type="button"
                        texto="Borrar"
                        funcion={() => handleDelete(item, setFecha_mantenimiento)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="self-center p-5 flex flex-row items-start justify-center gap-x-10">
              <div>
                <h4>Escoga la fecha del Lubricación:</h4>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setFechaLubricamiento([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={fechaLubricamiento}
                />
              </div>
              <div>
                <h3>Lubricación</h3>
                <ul>
                  {fecha_lubricamiento.map((item, index) => (
                    <li key={index} className="p-1 flex flex-row items-center">
                      <div className="flex flex-col items-center mx-2">
                        <h6>Fecha Inicial</h6>
                        <p>{item.startDate.toLocaleDateString() ?? ''}</p>
                      </div>
                      <div className="flex flex-col items-center mx-2">
                        <h6>Fecha Final</h6>
                        <p>{item.endDate.toLocaleDateString() ?? ''}</p>
                      </div>
                      <Button_UI
                        type="button"
                        texto="Borrar"
                        funcion={() => handleDelete(item, setFecha_lubricamiento)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'usuario' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={()=>{}}
              name="nombre"
              required
            />
            <Input_UI
              value={undefined}
              type="password"
              texto="Contrasena:"
              funcion={()=>{}}
              name="contrasena"
              required
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'estado' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={()=>{}}
              name="nombre"
              required
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'mantenimiento' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={undefined}
              type="text"
              texto="Nombre:"
              funcion={()=>{}}
              name="nombre"
              required
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
        {ver === 'editar-presupuesto' && (
          <div className="w-full flex items-center justify-around">
            {presupuestos.map((presupuestoItem, index) => (
              <form
                key={index}
                className='p-2 border-2 border-[#b70909] rounded-xl m-1'
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="idpresupuesto"
                  value={presupuestoItem.dataValues.ID_Presupuesto}
                />
                <Input_UI
                  value={undefined}
                  type="number"
                  texto={`Presupuesto ${presupuestoItem.dataValues.Tipo} ${presupuestoItem.dataValues.monto} CUP`}
                  name="presupuesto"
                  funcion={() => {}}
                  required
                />
                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
            ))}
          </div>
        )}
        {ver === 'editar-area' && (
          <div className='w-full grid grid-cols-3'>
            {categoriaData.map((categoriaItem, index) => (
              <section key={index} className='flex gap-x-2 items-end m-1'>
                <form onSubmit={handleSubmit} className='p-2 border-2 border-[#b70909] rounded-xl m-1'>
                  <input type="hidden" name="editar" value={categoriaItem.dataValues.ID_Categoria} />
                  <Input_UI value={undefined} type='text' texto={`${categoriaItem.dataValues.Nombre_Categoria}`} required name='nombre' funcion={() => { }} />
                  <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
                </form>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="borrar" value={categoriaItem.dataValues.ID_Categoria} />
                  <Button_UI texto='Borrar' type='submit' funcion={()=>{}}/>
                </form>
              </section>
            ))}
          </div>
        )}
        {ver === 'editar-estado' && (
            <div className='w-full grid grid-cols-3'>
            {estadoData.map((estadoItem, index) => (
              <section key={index} className='flex gap-x-2 items-end m-1'>
                <form onSubmit={handleSubmit} className='p-2 border-2 border-[#b70909] rounded-xl m-1'>
                  <input type="hidden" name="editar" value={estadoItem.dataValues.ID_Estado} />
                  <Input_UI value={undefined} type='text' texto={`${estadoItem.dataValues.Nombre_Estado}`} required name='nombre' funcion={() => { }} />
                  <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
                </form>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="borrar" value={estadoItem.dataValues.ID_Estado} />
                  <Button_UI texto='Borrar' type='submit' funcion={()=>{}}/>
                </form>
              </section>
            ))}
          </div>
        )}
        {ver === 'editar-mantenimiento' && (
          <div className='w-full grid grid-cols-3'>
          {tipoMantenimientoData.map((tipoMantenimientoItem, index) => (
            <section key={index} className='flex gap-x-2 items-end m-1'>
              <form onSubmit={handleSubmit} className='p-2 border-2 border-[#b70909] rounded-xl m-1'>
                <input type="hidden" name="editar" value={tipoMantenimientoItem.dataValues.ID_Tipo_Mantenimiento} />
                <Input_UI value={undefined} type='text' texto={`${tipoMantenimientoItem.dataValues.Tipo}`} required name='nombre' funcion={() => { }} />
                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={tipoMantenimientoItem.dataValues.ID_Tipo_Mantenimiento} />
                <Button_UI texto='Borrar' type='submit' funcion={()=>{}}/>
              </form>
            </section>
          ))}
        </div>
        )}
        {ver === 'editar-maquinaria' && (
          <div className='w-full grid grid-cols-3'>
          {maquinarias.map((maquinariaItem, index) => (
            <section key={index} className='flex gap-x-2 items-end m-1'>
              <form onSubmit={handleSubmit} className='p-2 border-2 border-[#b70909] rounded-xl m-1'>
                <input type="hidden" name="editar" value={maquinariaItem.dataValues.ID_Equipo} />
                <Input_UI value={undefined} type='text' texto={`Nombre: ${maquinariaItem.dataValues.Nombre}`} required name='nombre' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Identificacion: ${maquinariaItem.dataValues.Identificacion}`} required name='identificacion' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Categoria ID: ${maquinariaItem.dataValues.CategoriasID}`} required name='categoria' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Comentarios: ${maquinariaItem.dataValues.Comentarios}`} required name='comentarios' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Estado: ${maquinariaItem.dataValues.Estado}`} required name='estado' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Origen: ${maquinariaItem.dataValues.Origen}`} required name='origen' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Tipo Mantenimiento: ${maquinariaItem.dataValues.TipoMantenimiento}`} required name='mantenimiento' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Fecha Lubricamiento: ${maquinariaItem.dataValues.fecha_lubricamiento}`} required name='fechalubricamiento' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Fecha Mantenimiento: ${maquinariaItem.dataValues.fecha_mantenimiento}`} required name='fechamantenimiento' funcion={() => { }} />
                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={maquinariaItem.dataValues.ID_Equipo} />
                <Button_UI texto='Borrar' type='submit' funcion={()=>{}}/>
              </form>
            </section>
          ))}
        </div>
        )}
        {ver === 'editar-usuario' && (
          <div className='w-full grid grid-cols-3'>
          {usuarios.map((usuarioItem, index) => (
            <section key={index} className='flex gap-x-2 items-end m-1'>
              <form onSubmit={handleSubmit} className='p-2 border-2 border-[#b70909] rounded-xl m-1'>
                <input type="hidden" name="editar" value={usuarioItem.dataValues.ID_Usuario} />
                <Input_UI value={undefined} type='text' texto={`User: ${usuarioItem.dataValues.identificacion}`} required name='identificacion' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Rol: ${usuarioItem.dataValues.Rol}`} required name='rol' funcion={()=>{}}/>
                <Input_UI value={undefined} type='text' texto={`Contraseña: ${usuarioItem.dataValues.contrasena}`} required name='contrasena' funcion={() => { }} />
                <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
              </form>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="borrar" value={usuarioItem.dataValues.ID_Usuario} />
                <Button_UI texto='Borrar' type='submit' funcion={()=>{}}/>
              </form>
            </section>
          ))}
        </div>
        )}
      </main>
    </RootLayout>
  )
}

export default Anadir
