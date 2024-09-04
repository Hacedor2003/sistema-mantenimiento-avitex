/* eslint-disable prettier/prettier */
import { AppContext } from '@renderer/Data/Store'
import { fechaType } from '@renderer/Interface'
import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component'
import { addDays } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useParams } from 'react-router-dom'


const Anadir = (): JSX.Element => {
  const { opcion: ver } = useParams()
  const context = useContext(AppContext)

  const [fechaMantenimiento, setFechaMantenimiento] = useState<fechaType[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
      tipoMantenimiento: ''
    }
  ])
  const [fecha_mantenimiento, setFecha_mantenimiento] = useState<fechaType[]>([])
  const [fechaLubricamiento, setFechaLubricamiento] = useState<fechaType[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
      tipoMantenimiento: ''
    }
  ])
  const [fecha_lubricamiento, setFecha_lubricamiento] = useState<fechaType[]>([])

  const { categorias, tipo_mantenimiento, estados } = context.data


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      switch (ver) {
        case 'area':
          {
            const newCategoria = await window.context.createCategorias({
              Nombre_Categoria: formData.get('nombre') as string
            })
            if (newCategoria) {
              window.alert('Categoría creada exitosamente')
            }
          }
          break
        case 'maquinaria':
          {
            const newEquipo = await window.context.createEquipos({
              TipoMantenimiento: 1,
              Origen: formData.get('origen') as string,
              Nombre: formData.get('nombre') as string,
              Identificacion: formData.get('iden') as string,
              Estado: parseInt(formData.get('estado') as string),
              Comentarios: formData.get('comentarios') as string,
              CategoriasID: parseInt(formData.get('categoria') as string),
              fecha_mantenimiento: fecha_mantenimiento.map((item) => ({
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                key: item.key,
                tipoMantenimiento: item.tipoMantenimiento
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
            const newEstado = await window.context.createEstados_Revision({
              Nombre_Estado: formData.get('nombre') as string
            })
            if (newEstado) {
              window.alert('Estado creado exitosamente')
            }
          }
          break
        case 'mantenimiento':
          {
            const newMantenimiento = await window.context.createTipo_Mantenimiento({
              Tipo: formData.get('nombre') as string
            })
            if (newMantenimiento) {
              window.alert('Tipo de Mantenimiento creado exitosamente')
            }
          }
          break
        default:
          break
      }
    } catch (error) {
      console.error(error)
      alert('Existio un Error: ' + error)
    }
  }


  useEffect(() => {
    setFecha_mantenimiento((prevFecha) => {
      if (
        !prevFecha.some((item) => {
          if (fechaMantenimiento.length > 0) {
            const startDate = new Date(fechaMantenimiento[0].startDate)
            const endDate = new Date(fechaMantenimiento[0].endDate)
            const itemStartDate = new Date(item.startDate)
            const itemEndDate = new Date(item.endDate)

            return (
              itemStartDate.toISOString() === startDate.toISOString() &&
              itemEndDate.toISOString() === endDate.toISOString()
            )
          } else return false
        })
      ) {
        return [...prevFecha, fechaMantenimiento[0]]
      }
      return prevFecha
    })
  }, [fechaMantenimiento])

  useEffect(() => {
    setFecha_lubricamiento((prevFecha) => {
      if (
        !prevFecha.some((item) => {
          if (fechaLubricamiento.length > 0) {
            const startDate = new Date(fechaLubricamiento[0].startDate)
            const endDate = new Date(fechaLubricamiento[0].endDate)
            const itemStartDate = new Date(item.startDate)
            const itemEndDate = new Date(item.endDate)

            return (
              itemStartDate.toISOString() === startDate.toISOString() &&
              itemEndDate.toISOString() === endDate.toISOString()
            )
          } else return false
        })
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
      return prevFecha.filter((fecha) => {
        const fechaStartDate = new Date(fecha.startDate)
        const fechaEndDate = new Date(fecha.endDate)
        const itemStartDate = new Date(item.startDate)
        const itemEndDate = new Date(item.endDate)

        return (
          fechaStartDate.toISOString() !== itemStartDate.toISOString() ||
          fechaEndDate.toISOString() !== itemEndDate.toISOString()
        )
      })
    })
  }

  const handleTipoMantenimientoChange = (e, index, setFecha_mantenimiento) => {
    const selectedTipoMantenimiento = parseInt(e.target.value)
    setFecha_mantenimiento((prevFecha_mantenimiento) => {
      const updatedFecha_mantenimiento = [...prevFecha_mantenimiento]
      updatedFecha_mantenimiento[index] = {
        ...updatedFecha_mantenimiento[index],
        tipoMantenimiento: selectedTipoMantenimiento
      }
      return updatedFecha_mantenimiento
    })
  }

  return (
    <RootLayout>
      <h1 className="first-letter:uppercase w-full text-center text-4xl font-serif font-bold border-b-2 border-black">
        {ver}
      </h1>
      <main className="w-full flex flex-col items-center px-2 text-lg">
        <form
          className="w-full flex flex-col items-left justify-around m-2"
          onSubmit={handleSubmit}
        >
          {ver === 'area' && (
            <>
              <Input_UI
                value={undefined}
                type="text"
                texto="Nombre:"
                funcion={() => {}}
                name="nombre"
                required
              />
              <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
            </>
          )}
          {ver === 'maquinaria' && (
            <>
              <Input_UI
                value={undefined}
                type="text"
                texto="Nombre:"
                funcion={() => {}}
                name="nombre"
                required
              />
              <Input_UI
                value={undefined}
                type="text"
                texto="Identificación:"
                funcion={() => {}}
                name="iden"
                required
              />
              <Input_UI
                value={undefined}
                type="text"
                texto="Origen:"
                funcion={() => {}}
                name="origen"
                required
              />
              <Input_UI
                value={undefined}
                type="text"
                texto="Comentarios:"
                funcion={() => {}}
                name="comentarios"
                required
              />
              <label htmlFor="inputEstado">Estado</label>
              <select
                name="estado"
                id="inputEstado"
                className="w-fit border border-black p-2 rounded-md cursor-pointer"
              >
                <option value={-1}> Tipo de Estado </option>
                {estados.data.map((estadoItem, index) => (
                  <option key={index} value={estadoItem.ID_Estado}>
                    {estadoItem.Nombre_Estado}
                  </option>
                ))}
              </select>
              <label htmlFor="inputCategoria">Categoria</label>
              <select
                name="categoria"
                id="inputCategoria"
                className="w-fit border border-black p-2 rounded-md cursor-pointer"
              >
                <option value={-1}> Tipo de Area </option>
                {categorias.data.map((categoriaItem, index) => (
                  <option key={index} value={categoriaItem.ID_Categoria}>
                    {categoriaItem.Nombre_Categoria}
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
                          <p>
                            {new Date(item.startDate).toLocaleDateString() ??
                              item.startDate.toLocaleDateString() ??
                              ''}
                          </p>
                        </div>
                        <div className="flex flex-col items-center mx-2">
                          <h6>Fecha Final</h6>
                          <p>
                            {new Date(item.endDate).toLocaleDateString() ??
                              item.endDate.toLocaleDateString() ??
                              ''}
                          </p>
                        </div>
                        <div>
                          <h6>Tipo de Mantenimiento</h6>
                          <select
                            id="inputMantenimiento"
                            className="w-fit border border-black p-2 rounded-md cursor-pointer"
                            name="tipoMantenimientoFecha"
                            onChange={(e) =>
                              handleTipoMantenimientoChange(e, index, setFecha_mantenimiento)
                            }
                          >
                            <option value={-1}> Tipo de Mantenimiento </option>
                            {tipo_mantenimiento.data.map((mantenimientoItem, index) => (
                              <option
                                key={index}
                                value={mantenimientoItem.ID_Tipo_Mantenimiento}
                              >
                                {mantenimientoItem.Tipo}
                              </option>
                            ))}
                          </select>
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
                          <p>
                            {new Date(item.startDate).toLocaleDateString() ??
                              item.startDate.toLocaleDateString() ??
                              ''}
                          </p>
                        </div>
                        <div className="flex flex-col items-center mx-2">
                          <h6>Fecha Final</h6>
                          <p>
                            {new Date(item.endDate).toLocaleDateString() ??
                              item.endDate.toLocaleDateString() ??
                              ''}
                          </p>
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
            </>
          )}
          {ver === 'usuario' && (
            <>
              <Input_UI
                value={undefined}
                type="text"
                texto="Nombre:"
                funcion={() => {}}
                name="nombre"
                required
              />
              <Input_UI
                value={undefined}
                type="password"
                texto="Contrasena:"
                funcion={() => {}}
                name="contrasena"
                required
              />
              <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
            </>
          )}
          {ver === 'estado' && (
            <>
              <Input_UI
                value={undefined}
                type="text"
                texto="Nombre:"
                funcion={() => {}}
                name="nombre"
                required
              />
              <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
            </>
          )}
          {ver === 'mantenimiento' && (
            <>
              <Input_UI
                value={undefined}
                type="text"
                texto="Nombre:"
                funcion={() => {}}
                name="nombre"
                required
              />
              <Button_UI type="submit" texto="Guardar" funcion={() => {}} />
            </>
          )}
        </form>
      </main>
    </RootLayout>
  )
}

export default Anadir
