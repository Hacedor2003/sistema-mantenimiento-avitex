/* eslint-disable prettier/prettier */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (): JSX.Element => {
  const [carnet, setCarnet] = useState('')
  const [constrasena, setConstrasena] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event): void => {
    event.preventDefault()
    
    window.context.getUsuarios_All()
      .then(response => {
        if (carnet === response[0].dataValues.identificacion && constrasena === response[0].dataValues.contrasena) {
          const user = {
            id: response[0].dataValues.ID_Usuario,
            name: response[0].dataValues.identificacion,
            role: response[0].dataValues.Rol
          };
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/home')
        }
        
      })
        .catch(error => error.log(error))
      
    
    
  }

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <section className="md:w-10/12 lg:w-1/2 h-1/2 mt-20 flex flex-col items-center justify-evenly border-2 border-black bg-[#b70909] p-5 rounded-lg">
        <h3 className="text-2xl mb-3 font-mono font-bold">Bienvenido al sistema de mantenimiento</h3>
        <h3 className="text-4xl mb-10 font-mono font-bold">Iniciar Sesión:</h3>
        <form className="w-5/6 flex flex-col items-left justify-around m-2" onSubmit={handleSubmit}>
          <section className="w-5/6 flex flex-col items-left justify-around m-2">
            <label className="text-2xl font-thin font-serif" htmlFor="inputCarnet">
              Carnet de identidad:
            </label>
            <input
              className="border border-black p-1 rounded-md w-32"
              type="text"
              name="inputCarnet"
              id="inputCarnet"
              placeholder="Carnet"
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
            />
          </section>
          <section className="w-5/6 flex flex-col items-left justify-around m-2">
            <label className="text-2xl font-thin font-serif" htmlFor="inputConstrasena">
              Contraseña:
            </label>
            <input
              className="border border-black p-1 rounded-md w-56"
              type="password"
              name="inputConstrasena"
              id="inputConstrasena"
              placeholder="Contraseña"
              value={constrasena}
              onChange={(e) => setConstrasena(e.target.value)}
            />
          </section>
          <button
            type="submit"
            className="self-center border border-black w-fit bg-white hover:bg-[#b70909] text-black hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm"
          >
            Ingresar
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
