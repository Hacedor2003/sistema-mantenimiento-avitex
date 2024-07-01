/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { useEffect, useState } from 'react'
import { Categorias, Estados_Revision, Tipo_Mantenimiento } from 'src/main/db/Models'

const Anadir = (): JSX.Element => {
  const [nombre, setNombre] = useState('')
  const [iden, setIden] = useState('')
  const [origen, setOrigen] = useState('')
  const [comentarios, setcomentarios] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [tipoMantenimiento, setTipoMantenimiento] = useState(0)
  const [estado, setEstado] = useState(0)
  const [categorias, setCategorias] = useState(0)
  const [ver, setVer] = useState<'area' | 'maquinaria' | 'usuario' | 'mantenimiento' | 'estado' | ''>('area')

  const [estadoData, setEstadoData] = useState<Estados_Revision[]>([])
  const [tipoMantenimientoData, setTipoMantenimientoData] = useState<Tipo_Mantenimiento[]>([])
  const [categoriaData, setcategoriaData] = useState<Categorias[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (ver === 'area') {
        await window.context.createCategorias({ Nombre_Categoria: nombre })
        window.alert('Categoría creada exitosamente')
      } else if (ver === 'maquinaria') {
        console.table({
          TipoMantenimiento: tipoMantenimiento,
          Origen: origen,
          Nombre: nombre,
          Identificacion: iden,
          Estado: estado,
          Comentarios: comentarios,
          CategoriasID: categorias
        })
        await window.context.createEquipos({
          TipoMantenimiento: tipoMantenimiento,
          Origen: origen,
          Nombre: nombre,
          Identificacion: iden,
          Estado: estado,
          Comentarios: comentarios,
          CategoriasID: categorias
        })
        window.alert('Equipo creado exitosamente')
      } else if (ver === 'usuario') {
        await window.context.createUsuarios({
          Rol: 'user',
          identificacion: nombre,
          contrasena: contrasena
        })
        window.alert('Usuario creado exitosamente')
      } else if (ver === 'estado') {
        await window.context.createEstados_Revision({ Nombre_Estado:nombre })
        window.alert('Estado creado exitosamente')
      } else if (ver === 'mantenimiento') {
        await window.context.createTipo_Mantenimiento({Tipo:nombre})
        window.alert('Tipo de Mantenimiento creado exitosamente')
      }
    } catch (error) {
      console.error('Error al crear el registro:', error)
      window.alert('Error al crear el registro')
    }
  }

  useEffect(() => {
    window.context
      .getCategorias_All()
      .then((response) => {
        setcategoriaData(response)
      })
      .catch((error) => console.log(error))
    window.context
      .getTipo_Mantenimiento_All()
      .then((response) => {
        setTipoMantenimientoData(response)
      })
      .catch((error) => console.log(error))
    window.context
      .getEstados_Revision_All()
      .then((response) => {
        setEstadoData(response)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <RootLayout>
      <main className="w-full flex flex-col items-center px-2 text-lg">
        <h4>Que desea añadir?</h4>
        <div className="p-1 flex items-center gap-x-4">
          <button
            onClick={() => setVer('area')}
            className={`self-center border border-black w-fit hover:bg-[#b70909]  hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm ${ver === 'area' ? 'bg-[#b70909] text-white' : 'bg-white text-black'}`}
            type="button"
          >
            Area
          </button>
          <button
            onClick={() => setVer('maquinaria')}
            className={`self-center border border-black w-fit hover:bg-[#b70909]  hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm ${ver === 'maquinaria' ? 'bg-[#b70909] text-white' : 'bg-white text-black'}`}
            type="button"
          >
            Equipo
          </button>
          <button
            onClick={() => setVer('usuario')}
            className={`self-center border border-black w-fit hover:bg-[#b70909]  hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm ${ver === 'usuario' ? 'bg-[#b70909] text-white' : 'bg-white text-black'}`}
            type="button"
          >
            Usuario
          </button>
          <button
            onClick={() => setVer('mantenimiento')}
            className={`self-center border border-black w-fit hover:bg-[#b70909]  hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm ${ver === 'mantenimiento' ? 'bg-[#b70909] text-white' : 'bg-white text-black'}`}
            type="button"
          >
            Tipo de Mantenimiento
          </button>
          <button
            onClick={() => setVer('estado')}
            className={`self-center border border-black w-fit hover:bg-[#b70909]  hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm ${ver === 'estado' ? 'bg-[#b70909] text-white' : 'bg-white text-black'}`}
            type="button"
          >
            Estado
          </button>
        </div>
        {ver === 'area' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputNombre">
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
              <button
                className="border border-black w-fit hover:bg-[#b70909] hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm mt-4"
                type="submit"
              >
                Crear Categoría
              </button>
            </section>
          </form>
        )}
        {ver === 'maquinaria' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputNombre">
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
              <label className="text-2xl font-thin font-serif" htmlFor="inputIden">
                Identificación:
              </label>
              <input
                className="border border-black p-1 rounded-md w-32"
                type="text"
                name="inputIden"
                id="inputIden"
                placeholder="Identificación:"
                value={iden}
                onChange={(e) => setIden(e.target.value)}
              />
              <label className="text-2xl font-thin font-serif" htmlFor="inputOrigen">
                Origen:
              </label>
              <input
                className="border border-black p-1 rounded-md w-32"
                type="text"
                name="inputOrigen"
                id="inputOrigen"
                placeholder="Origen:"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              />
              <label className="text-2xl font-thin font-serif" htmlFor="inputComentarios">Comentarios:</label>
              <textarea
                className="border border-black p-1 rounded-md w-full"
                name="inputComentarios"
                id="inputComentarios"
                rows={3}
                placeholder="Comentarios:"
                value={comentarios}
                onChange={(e) => setcomentarios(e.target.value)}
              />

              <label htmlFor="inputMantenimiento">Tipo de Mantenimiento</label>
              <select onChange={(e) => { console.log(e.target.value)
               setTipoMantenimiento(Number(e.target.value))}} id="inputMantenimiento" >
                <option value={-1}> Tipo de Mantenimiento </option>
                {tipoMantenimientoData.map((mantenimientoItem, index) => (
                  <option key={index} value={mantenimientoItem.dataValues.ID_Tipo_Mantenimiento}>
                    {mantenimientoItem.dataValues.Tipo}
                  </option>
                ))}
              </select>
              <label htmlFor="inputEstado">Estado</label>
              <select onChange={(e) => setEstado(Number(e.target.value))} name="" id="inputEstado">
              <option value={-1}> Tipo de Estado </option>
                {estadoData.map((estadoItem, index) => (
                  <option key={index} value={estadoItem.dataValues.ID_Estado}>
                    {estadoItem.dataValues.Nombre_Estado}
                  </option>
                ))}
              </select>
              <label htmlFor="inputCategoria">Categoria</label>
              <select onChange={(e) => setCategorias(Number(e.target.value))} id="inputCategoria">
              <option value={-1}> Tipo de Area </option>
                {categoriaData.map((categoriaItem, index) => (
                  <option key={index} value={categoriaItem.dataValues.ID_Categoria}>
                    {categoriaItem.dataValues.Nombre_Categoria}
                  </option>
                ))}
              </select>
            </section>
            <button className="self-center border border-black w-fit hover:bg-[#b70909] hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm bg-[#b70909] text-white" type="submit">
              Guardar
            </button>
          </form>
        )}
        {ver === 'usuario' && (
          <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputNombre">
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
              <label className="text-2xl font-thin font-serif" htmlFor="inputOrigen">
                Contrasena:
              </label>
              <input
                className="border border-black p-1 rounded-md w-32"
                type="text"
                name="inputOrigen"
                id="inputOrigen"
                placeholder="Origen:"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </section>
            <button
              className="self-center border border-black w-fit hover:bg-[#b70909] hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm bg-[#b70909] text-white"
              type="submit"
            >
              Guardar
            </button>
          </form>
        )}
        {ver === 'estado' && (
            <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputNombre">
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
              className="self-center border border-black w-fit hover:bg-[#b70909] hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm bg-[#b70909] text-white"
              type="submit"
            >
              Guardar
            </button>
          </form>
        )}

        {ver === 'mantenimiento' && (
            <form
            className="w-full flex flex-col items-left justify-around m-2"
            onSubmit={handleSubmit}
          >
            <section className="w-5/6 flex flex-col items-left justify-around m-2">
              <label className="text-2xl font-thin font-serif" htmlFor="inputNombre">
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
              className="self-center border border-black w-fit hover:bg-[#b70909] hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm bg-[#b70909] text-white"
              type="submit"
            >
              Guardar
            </button>
          </form>
        )}
      </main>
    </RootLayout>
  )
}

export default Anadir
