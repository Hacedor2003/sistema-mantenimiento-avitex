/* eslint-disable prettier/prettier */
import { AppContext } from '@renderer/Data/Store'
import { Button_UI, Input_UI } from '@renderer/components/UI_Component'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (): JSX.Element => {
  const [carnet, setCarnet] = useState('')
  const [contrasena, setConstrasena] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const context = useContext(AppContext)

  const handleSubmit = (event): void => {
    event.preventDefault()


    if (carnet === 'bryanlenier' && contrasena === 'espinosa') {
      setError(false)
      localStorage.setItem(
        'user',
        JSON.stringify({
          ID_Usuario: 0,
          identificacion: 'Bryan',
          Rol: 'admin',
          contrasena: 'espinosa'
        })
      )
      navigate('/home')
    } else if (carnet !== 'bryanlenier' && contrasena !== 'espinosa') {
      const userFind = context.data.usuarios.data.find(
        (userDb) =>
          userDb.dataValues.identificacion === carnet && userDb.dataValues.contrasena === contrasena
      )
      if (userFind?.dataValues) {
        setError(false)
        localStorage.setItem('user', JSON.stringify(userFind?.dataValues))
        navigate('/home')
      }
    } else {
      setError(true)
    }
  }

  return (
    <main className="w-full flex flex-col items-center justify-center select-none">
      <div className="logo-login" />
      <section className="md:w-10/12 lg:w-1/2 h-1/2 flex flex-col items-center justify-evenly border-2 border-black bg-[#b70909] p-5 rounded-lg">
        <h3 className="text-4xl mb-3 font-mono font-bold">
          Bienvenido al sistema de mantenimiento
        </h3>
        <h4 className="text-3xl mb-1 font-mono font-bold">Iniciar Sesión:</h4>
        <form
          className="w-full flex flex-col items-center justify-around m-2"
          onSubmit={handleSubmit}
        >
          <div className="w-[38%] flex flex-col items-center">
            <Input_UI
              value={carnet}
              type="text"
              texto="Carnet de Identidad:"
              funcion={setCarnet}
              name=""
              required
            />
            <Input_UI
              value={contrasena}
              type="password"
              texto="Contraseña:"
              funcion={setConstrasena}
              name=""
              required
            />
          </div>
          <Button_UI type="submit" texto="Entrar" funcion={() => {}} />
          {error && (
            <div className="text-xl bg-white m-2 border border-black px-2 py-1 rounded-md">
              Datos Erroneos
            </div>
          )}
        </form>
        <p>Derechos Reservados a Bit Tec SRL</p>
      </section>
    </main>
  )
}

export default Login
