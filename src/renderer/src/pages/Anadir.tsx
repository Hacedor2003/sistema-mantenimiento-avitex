/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component'
import { useEffect, useState } from 'react'
import { Categorias, Estados_Revision, Tipo_Mantenimiento } from 'src/main/db/Models'
import { addDays } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

export interface fechaType{
  startDate: Date,
  endDate: Date,
  key:string
}

const Anadir = (): JSX.Element => {
  const [nombre, setNombre] = useState('')
  const [iden, setIden] = useState('')
  const [origen, setOrigen] = useState('')
  const [comentarios, setcomentarios] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [tipoMantenimiento, setTipoMantenimiento] = useState(0)
  const [estado, setEstado] = useState(0)
  const [categorias, setCategorias] = useState(0)
  const [fechaMantenimiento, setFechaMantenimiento] = useState<fechaType[]>([{ startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection' }])
  const [fecha_mantenimiento, setFecha_mantenimiento] = useState<fechaType[]>([])
  const [fechaLubricamiento, setFechaLubricamiento] = useState<fechaType[]>([{ startDate: new Date(), endDate: addDays(new Date(), 7), key: 'selection' }])
  const [fecha_lubricamiento, setFecha_lubricamiento] = useState<fechaType[]>([])
  const [ver, setVer] = useState<
    'area' | 'maquinaria' | 'usuario' | 'mantenimiento' | 'estado' | ''
    >('area')


  const [estadoData, setEstadoData] = useState<Estados_Revision[]>([])
  const [tipoMantenimientoData, setTipoMantenimientoData] = useState<Tipo_Mantenimiento[]>([])
  const [categoriaData, setcategoriaData] = useState<Categorias[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (ver === 'area') {
        await window.context.createCategorias({ Nombre_Categoria: nombre })
        window.alert('Categoría creada exitosamente')
      } else if (ver === 'maquinaria') {
        await window.context.createEquipos({
          TipoMantenimiento: tipoMantenimiento,
          Origen: origen,
          Nombre: nombre,
          Identificacion: iden,
          Estado: estado,
          Comentarios: comentarios,
          CategoriasID: categorias,
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
        });
        
        window.alert('Equipo creado exitosamente')
      } else if (ver === 'usuario') {
        await window.context.createUsuarios({
          Rol: 'user',
          identificacion: nombre,
          contrasena: contrasena
        })
        window.alert('Usuario creado exitosamente')
      } else if (ver === 'estado') {
        await window.context.createEstados_Revision({ Nombre_Estado: nombre })
        window.alert('Estado creado exitosamente')
      } else if (ver === 'mantenimiento') {
        await window.context.createTipo_Mantenimiento({ Tipo: nombre })
        window.alert('Tipo de Mantenimiento creado exitosamente')
      }
    } catch (error) {
      console.error('Error al crear el registro:', error)
      window.alert('Error al crear el registro')
    }
  }

  useEffect(() => {
    window.context
      .getCategorias_All()
      .then((response) => {
        setcategoriaData(response)
      })
      .catch((error) => console.log(error))
    window.context
      .getTipo_Mantenimiento_All()
      .then((response) => {
        setTipoMantenimientoData(response)
      })
      .catch((error) => console.log(error))
    window.context
      .getEstados_Revision_All()
      .then((response) => {
        setEstadoData(response)
      })
      .catch((error) => console.log(error))
  }, [])
  
  useEffect(() => {
    setFecha_mantenimiento((prevFecha) => {
      if (!prevFecha.some(
        (item) =>
          item.startDate.toISOString() === fechaMantenimiento[0].startDate.toISOString() &&
          item.endDate.toISOString() === fechaMantenimiento[0].endDate.toISOString()
      )) {
        return [...prevFecha, fechaMantenimiento[0]];
      }
      return prevFecha;
    });
  }, [fechaMantenimiento]);
  useEffect(() => {
    setFecha_lubricamiento((prevFecha) => {
      if (!prevFecha.some(
        (item) =>
          item.startDate.toISOString() === fechaLubricamiento[0].startDate.toISOString() &&
          item.endDate.toISOString() === fechaLubricamiento[0].endDate.toISOString()
      )) {
        return [...prevFecha, fechaLubricamiento[0]];
      }
      return prevFecha;
    });
  }, [fechaLubricamiento]);
  
  const handleDelete = (item: fechaType , setFunction:React.Dispatch<React.SetStateAction<fechaType[]>>) => {
    setFunction((prevFecha) => {
      return prevFecha.filter(
        (fecha) =>
          fecha.startDate.toISOString() !== item.startDate.toISOString() ||
          fecha.endDate.toISOString() !== item.endDate.toISOString()
      );
    });
  };
  
  

  return (
    <RootLayout>
      <main className="w-full flex flex-col items-center px-2 text-lg">
        <h4 className="text-4xl font-serif font-bold my-2">Que desea añadir?</h4>
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
        {ver === 'area' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <Input_UI
              value={nombre}
              type="text"
              texto="Nombre:"
              funcion={setNombre}
              name="nombre"
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
              value={nombre}
              type="text"
              texto="Nombre:"
              funcion={setNombre}
              name="nombre"
            />
            <Input_UI
              value={iden}
              type="text"
              texto="Identificación:"
              funcion={setIden}
              name="iden"
            />
            <Input_UI
              value={origen}
              type="text"
              texto="Origen:"
              funcion={setOrigen}
              name="origen"
            />
            <Input_UI
              value={comentarios}
              type="text"
              texto="Comentarios:"
              funcion={setcomentarios}
              name="comentarios"
            />

            <label htmlFor="inputMantenimiento">Tipo de Mantenimiento</label>
            <select
              onChange={(e) => {
                setTipoMantenimiento(Number(e.target.value))
              }}
              id="inputMantenimiento"
              className="w-fit border border-black p-2 rounded-md cursor-pointer"
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
              onChange={(e) => setEstado(Number(e.target.value))}
              name=""
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
              onChange={(e) => setCategorias(Number(e.target.value))}
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
                    <li key={index} className='p-1 flex flex-row items-center'>
                      <div className='flex flex-col items-center mx-2'>
                        <h6>Fecha Inicial</h6>
                        <p>{item.startDate.toLocaleDateString() ?? ''}</p>
                      </div>
                      <div className='flex flex-col items-center mx-2'>
                        <h6>Fecha Final</h6>
                        <p>{item.endDate.toLocaleDateString() ?? ''}</p>
                      </div>
                      <Button_UI type='button' texto='Borrar' funcion={()=>handleDelete(item,setFecha_mantenimiento)}/>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="self-center p-5 flex flex-row items-start justify-center gap-x-10">
              <div>
                <h4>Escoga la fecha del Lubricamiento:</h4>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setFechaLubricamiento([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={fechaLubricamiento}
                />
              </div>
              <div>
                <h3>Lubricamiento</h3>
                <ul>
                  {fecha_lubricamiento.map((item, index) => (
                    <li key={index} className='p-1 flex flex-row items-center'>
                      <div className='flex flex-col items-center mx-2'>
                        <h6>Fecha Inicial</h6>
                        <p>{item.startDate.toLocaleDateString() ?? ''}</p>
                      </div>
                      <div className='flex flex-col items-center mx-2'>
                        <h6>Fecha Final</h6>
                        <p>{item.endDate.toLocaleDateString() ?? ''}</p>
                      </div>
                      <Button_UI type='button' texto='Borrar' funcion={()=>handleDelete(item,setFecha_lubricamiento)}/>
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
              value={nombre}
              type="text"
              texto="Nombre:"
              funcion={setNombre}
              name="nombre"
            />
            <Input_UI
              value={contrasena}
              type="password"
              texto="Contrasena:"
              funcion={setContrasena}
              name="contrasena"
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
              value={nombre}
              type="text"
              texto="Nombre:"
              funcion={setNombre}
              name="nombre"
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
              value={nombre}
              type="text"
              texto="Nombre:"
              funcion={setNombre}
              name="nombre"
            />
            <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
          </form>
        )}
      </main>
    </RootLayout>
  )
}

export default Anadir
