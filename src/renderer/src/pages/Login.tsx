/* eslint-disable prettier/prettier */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Login = (): JSX.Element => {
  const [carnet, setCarnet] = useState('')
  const [constrasena, setConstrasena] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = (event): void => {
    event.preventDefault()
    console.log(event.target[0].value)
    console.log(event.target[1].value)

    navigate('/home')
  }
  

  return (
    <main className="md:w-10/12 lg:w-1/2 h-1/2 mt-20 flex flex-col items-center justify-evenly border-2 border-black p-2 rounded-lg">
      <h3 className="text-5xl mb-10 font-mono font-bold">Iniciar Sesion:</h3>
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
            type="text"
            name="inputConstrasena"
            id="inputConstrasena"
            placeholder="Contraseña"
            value={constrasena}
            onChange={(e) => setConstrasena(e.target.value)}
          />
        </section>
        <button type="submit">Ingresar</button>
      </form>
    </main>
  )
}

export default Login
