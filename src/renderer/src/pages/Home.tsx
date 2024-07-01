/* eslint-disable prettier/prettier */

import { RootLayout } from '@renderer/components/AppLayout'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Categorias, Equipos } from 'src/main/db/Models'

const Home = (): JSX.Element => {
  const [lista_areas, setLista_areas] = useState<Categorias[]>([])
  const [productoCount, setProductoCount] = useState(0)

  useEffect(() => {
    window.context
      .getCategorias_All()
      .then((response) => {
        setLista_areas(response)
      })
      .catch((error) => console.log(error))
    window.context
      .getEquipos_Number_All()
      .then((response) => {
        setProductoCount(response.rows.length)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <RootLayout>
      <main className="w-full h-full text-center">
        <header className="w-full flex flex-row items-center justify-around">
          <aside className="flex flex-row gap-x-2 my-10 font-normal border-b border-[#b70909]">
            <p>
              {productoCount}-<span>Equipos</span>
            </p>
            {/* <p>
              8-<span>Funcionando</span>
            </p>
            <p>
              4-<span>Mantenimiento</span>
            </p>
            <p>
              4-<span>Baja</span>
            </p> */}
          </aside>
        </header>
        <ul className="px-2 flex flex-row flex-wrap justify-around">
          {lista_areas.map((item, index) => (
            <ItemOfList_NavigationContent
              nombre={item.dataValues.Nombre_Categoria}
              id={item.dataValues.ID_Categoria}
              key={index}
            />
          ))}
        </ul>
      </main>
    </RootLayout>
  )
}

export default Home

const ItemOfList_NavigationContent = ({ nombre, id }: { nombre: string, id: number }): JSX.Element => {
  const [producto, setProducto] = useState<Equipos[] | null>(null)
  useEffect(() => {
    window.context
      .getEquipos_By_Categoria(id)
      .then((response) => {
        setProducto(response)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <li className="fondo-areas">
      <Link
        to={"/home/" + id }
        className="w-80 h-32 grid grid-cols-1 grid-rows-5 items-center my-2 rounded-xl hover:rounded-sm border-2 group p-2 hover:p-1 hover:bg-[#b7090993] hover:text-white backdrop-blur-sm hover:backdrop-invert border-[#b70909] text-black transition-all cursor-pointer duration-300 font-serif"
      >
        <h6 className="row-span-2 text-2xl text-left">{nombre}</h6>
        <aside className="row-span-3 w-full flex flex-row gap-x-2 text-sm py-2 p-2">
          <p>{producto?.length} Equipos</p>
          {/* <p>2 Funcionando</p>
          <p>1 Mantenimiento</p>
          <p>1 Baja</p> */}
        </aside>
      </Link>
    </li>
  )
}
