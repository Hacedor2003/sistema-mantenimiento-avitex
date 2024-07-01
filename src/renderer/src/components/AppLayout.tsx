import { ComponentProps } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export const RootLayout = ({ children }: ComponentProps<'main'>): JSX.Element => {
  return (
    <main className="flex flex-col items-center h-screen text-black select-none">
      <Sidebar />
      <section className="w-full h-full border-t-4 border-[#b70909] overflow-scroll">
        {children}
      </section>
    </main>
  )
}

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <aside className="w-full h-24 overflow-auto bg-white grid items-center grid-cols-3 overflow-y-hidden">
      <Link to="/" className="w-28 h-20 col-span-1">
        <img src={logo} alt="Logo" />
      </Link>
      <header className="h-5/6 self-start bg-[#b70909] rounded-b-2xl flex flex-row items-center justify-center">
        <ul className="flex flex-row gap-x-3">
          <li
            className="cursor-pointer text-xl hover:text-white hover:mx-2 hover:scale-110 duration-300"
            onClick={() => navigate(-1)}
          >
            Atras
          </li>
          {user.role === 'admin' && (
            <li
              className="cursor-pointer text-xl hover:text-white hover:mx-2 hover:scale-110 duration-300"
              onClick={() => navigate('/home/anadir')}
            >
              Añadir
            </li>
          )}
          <li
            className="cursor-pointer text-xl hover:text-white hover:mx-2 hover:scale-110 duration-300"
            onClick={() => navigate('/home/ayuda')}
          >
            Ayuda
          </li>
          <li
            className="cursor-pointer text-xl hover:text-white hover:mx-2 hover:scale-110 duration-300"
            onClick={() => navigate('/')}
          >
            Salir
          </li>
        </ul>
      </header>
    </aside>
  )
}
