/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { useState } from 'react'

const Anadir = (): JSX.Element => {
  const [nombre, setNombre] = useState('')
  const [iden, setIden] = useState('')
  const [origen, setOrigen] = useState('')
  const [comentarios, setcomentarios] = useState('')
  const [ver, setVer] = useState('area')

  const handleSubmit = (event): void => {
    event.preventDefault()
    console.log(event.target[0].value)
    console.log(event.target[1].value)

    window.alert('Subido')
  }

  return (
    <RootLayout>
      <main className="w-full flex flex-col items-center px-2 text-lg">
        <label className='mb-2 text-xl' htmlFor="inputSelectAnadir">Que desea añadir?</label>
        <select
          name="inputSelectAnadir"
          id="inputSelectAnadir"
          onClick={(e:any) => setVer(e.target.value)}
        >
          <option value="area">Area</option>
          <option value="maquinaria">Maquinaria</option>
        </select>
        {ver === 'area' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputCarnet">
                Nombre:
              </label>
              <input
                className="border border-black p-1 rounded-md w-32"
                type="text"
                name="inputNombre"
                id="inputNombre"
                placeholder="Nombre:"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </section>
            <button
              type="submit"
              className="self-center border border-black w-fit bg-white hover:bg-red-950 text-black hover:text-white transition-all duration-300 p-2"
            >
              Ingresar
            </button>
          </form>
        )}
        {ver === 'maquinaria' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputCarnet">
                Nombre:
              </label>
              <input
                className="border border-black p-1 rounded-md w-32"
                type="text"
                name="inputNombre"
                id="inputNombre"
                placeholder="Nombre:"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </section>
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputCarnet">
                Identificador:
              </label>
              <input
                className="border border-black p-1 rounded-md w-32"
                type="text"
                name="inputIdentificador"
                id="inputIdentificador"
                placeholder="Identificador:"
                value={iden}
                onChange={(e) => setIden(e.target.value)}
              />
            </section>
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputCarnet">
                Origen:
              </label>
              <input
                className="border border-black p-1 rounded-md w-32"
                type="text"
                name="inputOrifen"
                id="inputOrifen"
                placeholder="Origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
            </section>
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputCarnet">
                Comentarios:
              </label>
              <input
                className="border border-black p-1 rounded-md w-32"
                type="text"
                name="inputCarnet"
                id="inputCarnet"
                placeholder="Comentarios"
                value={comentarios}
                onChange={(e) => setcomentarios(e.target.value)}
              />
            </section>
            <button
              type="submit"
              className="self-center border border-black w-fit bg-white hover:bg-red-950 text-black hover:text-white transition-all duration-300 p-2"
            >
              Ingresar
            </button>
          </form>
        )}
      </main>
    </RootLayout>
  )
}

export default Anadir
