import { ComponentProps } from 'react'

export const NavigationContent = (): JSX.Element => {
  return (
    <main className="col-span-2 bg-gray-400 h-full text-center">
      <header className="w-full flex flex-row items-center justify-around">
        <h4 className="text-xl font-bold">Areas</h4>
        <aside>
          <label htmlFor="ciclos">Ciclo de </label>
          <select className="border-b border-black bg-transparent" name="ciclos" id="ciclos">
            <option value="">Lubricacion</option>
            <option value="">Engrase</option>
            <option value="">Lubricacion-Engrase</option>
            <option value="">Mantenimiento</option>
            <option value="">Todos</option>
          </select>
        </aside>
      </header>
      <ul className="px-2">
        <ItemOfList_NavigationContent>Area 1</ItemOfList_NavigationContent>
        <ItemOfList_NavigationContent>Area 2</ItemOfList_NavigationContent>
        <ItemOfList_NavigationContent>Area 3</ItemOfList_NavigationContent>
        <ItemOfList_NavigationContent>Area 4</ItemOfList_NavigationContent>
      </ul>
    </main>
  )
}

const ItemOfList_NavigationContent = ({ children }: ComponentProps<'li'>): JSX.Element => {
  return (
    <li className="w-full grid grid-cols-5 grid-rows-1 my-2 p-2 border-2 border-black rounded-sm hover:rounded-lg bg-white hover:bg-zinc-500 text-black hover:text-white  transition-all cursor-pointer duration-300">
      <h6 className="col-span-2 text-2xl text-left">Area</h6>
      <aside className="col-span-3 w-full flex flex-row gap-x-2 text-sm">
        <p>4 Equipos</p>
        <p>2 Funcionando</p>
        <p>1 Mantenimiento</p>
        <p>1 Baja</p>
      </aside>
    </li>
  )
}
