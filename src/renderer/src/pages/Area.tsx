/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Categorias, Equipos } from 'src/main/db/Models'
import React from 'react'

const Area = (): JSX.Element => {
  const { area: categoriaID } = useParams()
  const [producto, setProducto] = useState<Equipos[] | null>(null)
  const [categoria, setCategoria] = useState<Categorias | null>(null)

  useEffect(() => {
    window.context
      .getEquipos_By_Categoria(categoriaID)
      .then((response) => {
        setProducto(response)
      })
      .catch((error) => console.error(error))
    window.context
      .getCategorias_By_ID(Number(categoriaID))
      .then((response) => {
        setCategoria(response)
      })
      .catch((error) => console.log(error))
  }, [producto,categoria])

  return (
    <RootLayout>
      <main className="w-full h-full px-2">
        <section className="w-full grid grid-cols-6 grid-rows-1 my-2">
          <h4 className="text-2xl font-bold w-full col-span-2">
            Area - {categoria?.dataValues.Nombre_Categoria}
          </h4>
          <div className="col-span-4 w-full">
            <label className="text-lg" htmlFor="selectCiclo">
              Ciclo de{' '}
            </label>
            <select
              name="selectCiclo"
              id="selectCiclo"
              className="border-b border-black cursor-pointer"
            >
              <option value="">Lubricacion</option>
              <option value="">Mantenimiento</option>
              <option value="">Todo</option>
            </select>
            <label className="mx-2 text-lg" htmlFor="inputBusqueda">
              Buscar:
            </label>
            <input
              className="border-b border-black"
              type="text"
              name="inputBusqueda"
              id="inputBusqueda"
              placeholder="Buscar:"
            />
          </div>
        </section>
        <table className="w-full mt-2 text-left text-lg">
          <thead>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Origen</th>
            <th>Comentarios</th>
          </thead>
          <tbody>
            {producto?.map((item:Equipos, index) => {
              if (item.Estado === 1 || item.Estado === 2 || item.Estado === 3) {
                return (
                  <ItemOfList_ComponentsContentEsp indicador="warning" key={index} item={item} />
                )
              } else if (item.Estado === 5 || item.Estado === 6) {
                return (
                  <ItemOfList_ComponentsContentEsp indicador="danger" key={index} item={item} />
                )
              } else {
                return <ItemOfList_ComponentsContent key={index} item={item} />
              }
            })}
          </tbody>
        </table>
      </main>
    </RootLayout>
  )
}

export default Area

const ItemOfList_ComponentsContent = ({item}:{item: Equipos}): JSX.Element => {
  const navigate = useNavigate()
  return (
    <tr className="hover:bg-[#b70909] hover:text-white p-2 transition-all duration-300 cursor-pointer text-lg">
      <td onClick={() => navigate(`/home/${item.dataValues.CategoriasID}/${item.dataValues.ID_Equipo}`)} >{item.dataValues.ID_Equipo + ' ' + item.dataValues.Nombre}</td>
      <td onClick={() => navigate(`/home/${item.dataValues.CategoriasID}/${item.dataValues.ID_Equipo}`)} >{item.dataValues.Identificacion}</td>
      <td onClick={() => navigate(`/home/${item.dataValues.CategoriasID}/${item.dataValues.ID_Equipo}`)} >{item.dataValues.Origen}</td>
      <td onClick={() => navigate(`/home/${item.dataValues.CategoriasID}/${item.dataValues.ID_Equipo}`)} >{item.dataValues.Comentarios}</td>
      <td onClick={() => navigate(`/home/calendario/${item.dataValues.ID_Equipo}`)}>Ver Fechas</td>
      { JSON.parse(localStorage.getItem('user') ?? '').role === 'admin' && <td onClick={() => window.context.deleteEquipos_By_Id(item.dataValues.ID_Equipo ?? -1)}>Borrar</td>}
    </tr>
  )
}

const ItemOfList_ComponentsContentEsp = ({   item,   indicador }: {   item: Equipos ,  indicador: 'warning' | 'danger' }): JSX.Element => {
  const navigate = useNavigate()

  return (
    <tr
      className={`cursor-pointer text-lg duration-300 ${indicador === 'warning' ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-red-500 hover:bg-red-700'}`}
      onClick={() => navigate(`/home/${item.dataValues.CategoriasID}/${item.dataValues.ID_Equipo}`)}
    >
      <td>{item.dataValues.ID_Equipo + ' ' + item.dataValues.Nombre}</td>
      <td>{item.dataValues.Identificacion}</td>
      <td>{item.dataValues.Origen}</td>
      <td>{item.dataValues.Comentarios}</td>
      <td onClick={() => navigate('/home/calendario/maquinaria')}>
        {indicador === 'warning' ? 'Mantenimiento - Ver Fechas' : 'Baja - Ver Fechas'}{' '}
        <span className={`rounded-sm ${indicador === 'warning' ? 'bg-yellow-200' : 'bg-red-200'}`}>
          {indicador === 'warning' ? '⚠️' : '💀'}
        </span>
      </td>
    </tr>
  )
}
