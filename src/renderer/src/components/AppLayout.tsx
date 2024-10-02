import { ComponentProps } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export function updateMessage(_, message) {
  const elemE = document.getElementById('message')
  elemE!.innerHTML = message
}

export const RootLayout = ({ children }: ComponentProps<'main'>): JSX.Element => {
  window.bridge.updateMessage(updateMessage)
  return (
    <main className="flex flex-col items-center h-screen text-black select-none">
      <Sidebar />
      <section className="w-full h-full border-t-4 border-[#b70909] overflow-scroll">
        {children}
      </section>
      <p>Derechos Reservados a Bit Tec SRL</p>
      <p id="message"></p>
    </main>
  )
}

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')!)

  return (
    <main className="w-full h-24 overflow-auto bg-white grid items-center grid-cols-3 overflow-y-hidden">
      <header className="col-span-2 w-full h-5/6 self-start bg-[#b70909] flex flex-row items-center justify-center p-3 rounded-br-xl">
        <ul className="w-full flex flex-row items-center justify-around gap-x-3">
          <li
            className="cursor-pointer text-2xl hover:text-white hover:mx-2 hover:scale-110 duration-300 w-max flex items-center gap-x-2"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64" />
              <path
                fill="currentColor"
                d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
              />
            </svg>
            Atras
          </li>
          <li
            className="cursor-pointer text-2xl hover:text-white hover:mx-2 hover:scale-110 duration-300"
            onClick={() => navigate('/home')}
          >
            Áreas
          </li>
          {user.Rol === 'admin' && (
            <li
              className="cursor-pointer text-2xl hover:text-white hover:mx-2 hover:scale-110 duration-300 w-max flex items-center gap-x-2"
              onClick={() => navigate('/home/admin')}
            >
              Administrador
            </li>
          )}
          <li
            className="cursor-pointer text-2xl hover:text-white hover:mx-2 hover:scale-110 duration-300"
            onClick={() => navigate('/home/orden')}
          >
            Orden de Mantenimiento
          </li>
          <li
            className="cursor-pointer text-2xl hover:text-white hover:mx-2 hover:scale-110 duration-300"
            onClick={() => navigate('/home/guia')}
          >
            Guia
          </li>
          <li
            className="cursor-pointer text-2xl hover:text-white hover:mx-2 hover:scale-110 duration-300 w-max flex items-center gap-x-2"
            onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.285 12h-8.012m5.237 3.636L20 12l-3.49-3.636M13.455 7V4H4v16h9.455v-3"
              />
            </svg>
            Salir
          </li>
        </ul>
      </header>
      <div className="w-full col-span-1 flex justify-end">
        <Link to="/" className=" w-28 h-20 ">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
    </main>
  )
}
