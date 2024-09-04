/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CategoriasAttributes, EquiposAttributes } from 'src/shared/types'

const Area = (): JSX.Element => {
  const { area: categoriaID } = useParams()
  const [producto, setProducto] = useState<EquiposAttributes[] | null>(null)
  const [categoria, setCategoria] = useState<CategoriasAttributes | null>(null)

  useEffect(() => {
    window.context
      .getCategorias_By_ID(Number(categoriaID))
      .then((response) => {
        setCategoria(response)
      })
      .catch((error) => console.log(error))
    if (categoria?.Nombre_Categoria !== 'Todos') {
      window.context
        .getEquipos_By_Categoria(categoriaID)
        .then((response) => {
          setProducto(response)
        })
        .catch((error) => console.error(error))
    } else {
      window.context
        .getEquipos_All()
        .then((response) => {
          setProducto(response)
        })
        .catch((error) => console.error(error))
    }
  }, [producto, categoria])

  return (
    <RootLayout>
      <main className="w-full h-full px-2">
        <section className="w-full grid grid-cols-6 grid-rows-1 my-2">
          <h4 className="text-2xl font-bold w-full col-span-2">
            Area - {categoria?.Nombre_Categoria}
          </h4>
        </section>
        <table className="w-full mt-2 text-left text-lg">
          <thead>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Origen</th>
            <th>Comentarios</th>
          </thead>
          <tbody>
            {producto?.map((item: EquiposAttributes, index) => {
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

const ItemOfList_ComponentsContent = ({ item }: { item: EquiposAttributes }): JSX.Element => {
  const navigate = useNavigate()
  return (
    <tr className="hover:bg-[#b70909] hover:text-white p-2 transition-all duration-300 cursor-pointer text-lg">
      <td
        onClick={() =>
          navigate(`/home/${item.CategoriasID}/${item.ID_Equipo}`)
        }
      >
        {item.ID_Equipo + ' ' + item.Nombre}
      </td>
      <td
        onClick={() =>
          navigate(`/home/${item.CategoriasID}/${item.ID_Equipo}`)
        }
      >
        {item.Identificacion}
      </td>
      <td
        onClick={() =>
          navigate(`/home/${item.CategoriasID}/${item.ID_Equipo}`)
        }
      >
        {item.Origen}
      </td>
      <td
        onClick={() =>
          navigate(`/home/${item.CategoriasID}/${item.ID_Equipo}`)
        }
      >
        {item.Comentarios}
      </td>
      <td onClick={() => navigate(`/home/calendario/${item.ID_Equipo}`)}>Ver Fechas</td>
      {JSON.parse(localStorage.getItem('user') ?? '').role === 'admin' && (
        <td onClick={() => window.context.deleteEquipos_By_Id(item.ID_Equipo ?? -1)}>
          Borrar
        </td>
      )}
    </tr>
  )
}

const ItemOfList_ComponentsContentEsp = ({
  item,
  indicador
}: {
  item: EquiposAttributes
  indicador: 'warning' | 'danger'
}): JSX.Element => {
  const navigate = useNavigate()

  return (
    <tr
      className={`cursor-pointer text-lg duration-300 ${indicador === 'warning' ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-red-500 hover:bg-red-700'}`}
      onClick={() => navigate(`/home/${item.CategoriasID}/${item.ID_Equipo}`)}
    >
      <td>{item.ID_Equipo + ' ' + item.Nombre}</td>
      <td>{item.Identificacion}</td>
      <td>{item.Origen}</td>
      <td>{item.Comentarios}</td>
      <td onClick={() => navigate('/home/calendario/maquinaria')}>
        {indicador === 'warning' ? 'Mantenimiento - Ver Fechas' : 'Baja - Ver Fechas'}{' '}
        <span className={`rounded-sm ${indicador === 'warning' ? 'bg-yellow-200' : 'bg-red-200'}`}>
          {indicador === 'warning' ? '⚠️' : '💀'}
        </span>
      </td>
    </tr>
  )
}
