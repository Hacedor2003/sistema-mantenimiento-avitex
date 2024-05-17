import { ComponentProps } from 'react'

export const RootLayout = ({ children }: ComponentProps<'main'>): JSX.Element => {
  const loc = location.pathname
  return (
    <main className="flex flex-col items-center h-screen bg-white text-black select-none">
      {loc !== '/' && <Sidebar />}
      {children}
    </main>
  )
}

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-full h-24 overflow-auto bg-slate-600 grid items-center grid-cols-2">
      <h1>Pollera</h1>
      <header>
        <ul className="w-full flex flex-row gap-x-3">
          <li>Busqueda</li>
          <li>Añadir</li>
        </ul>
      </header>
    </aside>
  )
}

export const Content = ({ children }: ComponentProps<'div'>): JSX.Element => {
  return <div className="grid grid-cols-6 grid-rows-1 w-full h-full">{children}</div>
}
