/* eslint-disable prettier/prettier */

import { RootLayout } from '@renderer/components/AppLayout'
import { Link } from 'react-router-dom'

const Home = (): JSX.Element => {
  return (
    <RootLayout>
      <main className="w-full h-full text-center ">
        <header className="w-full flex flex-row items-center justify-around">
          <h4 className="text-5xl mb-10 font-mono font-bold">Areas:</h4>
          <aside className="flex flex-row gap-x-2 font-normal border-b border-[#b70909]">
            <p>
              16-<span>Equipos</span>
            </p>
            <p>
              8-<span>Funcionando</span>
            </p>
            <p>
              4-<span>Mantenimiento</span>
            </p>
            <p>
              4-<span>Baja</span>
            </p>
          </aside>
        </header>
        <ul className="px-2 flex flex-row flex-wrap justify-around">
          <ItemOfList_NavigationContent />
          <ItemOfList_NavigationContent />
          <ItemOfList_NavigationContent />
          <ItemOfList_NavigationContent />
        </ul>
      </main>
    </RootLayout>
  )
}

export default Home

const ItemOfList_NavigationContent = (): JSX.Element => {
  return (
    <li className="fondo-areas">
      <Link
        to="/home/1"
        className="w-80 h-32 grid grid-cols-1 grid-rows-5 items-center my-2 rounded-xl hover:rounded-sm border-2 group p-2 hover:p-1 hover:bg-[#b7090993] hover:text-white backdrop-blur-sm hover:backdrop-invert border-[#b70909] text-black transition-all cursor-pointer duration-300 font-serif"
      >
        <h6 className="row-span-2 text-2xl text-left">Area</h6>
        <aside className="row-span-3 w-full flex flex-row gap-x-2 text-sm py-2 p-2">
          <p>4 Equipos</p>
          <p>2 Funcionando</p>
          <p>1 Mantenimiento</p>
          <p>1 Baja</p>
        </aside>
      </Link>
    </li>
  )
}
