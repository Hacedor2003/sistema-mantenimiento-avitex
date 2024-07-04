/* eslint-disable prettier/prettier */

import { RootLayout } from '@renderer/components/AppLayout'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Categorias, Equipos, Estados_Revision } from 'src/main/db/Models'

const Home = (): JSX.Element => {
  const [lista_areas, setLista_areas] = useState<Categorias[]>([])
  const [productos, setProductos] = useState<Equipos[]>([])
  const [listEstados, setListEstados] = useState<Estados_Revision[]> ([])

  useEffect(() => {
    window.context
      .getCategorias_All()
      .then((response) => {
        setLista_areas(response)
      })
      .catch((error) => console.log(error))
    window.context
      .getEquipos_All()
      .then((response) => {
        setProductos(response)
      })
      .catch((error) => console.log(error))
      window.context
      .getEstados_Revision_All()
      .then((response) => {
        setListEstados(response)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <RootLayout>
      <main className="w-full h-full flex items-start justify-start text-center px-5">
        <ul className="min-w-[301px] flex flex-col items-start gap-y-2 font-normal border-b-4 border-x-4 border-[#b70909] p-2">
          <li className='text-2xl font-bold p-2 uppercase'>Resumen</li>
          <li className='flex flex-col items-start border-b-2 border-[#b70909] w-full'>
            <p className='font-bold'>Total de Equipos: </p>
            <span>{productos.length}</span>
          </li>
          {listEstados.map((item, index) => {
            let productLength = 0
            productos.forEach(itemProduct => itemProduct.dataValues.Estado === item.dataValues.ID_Estado ? productLength+=1 : null)
            return <li className='flex flex-col items-start border-b-2 border-[#b70909] w-full' key={index}><p className='font-bold first-letter:uppercase'>{item.dataValues.Nombre_Estado}</p><span>{productLength}</span></li>
          })}
            
          </ul>
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
          <p>{producto?.length === 1 ? producto?.length + " Equipo" : producto?.length + " Equipos"}</p>
        </aside>
      </Link>
    </li>
  )
}
