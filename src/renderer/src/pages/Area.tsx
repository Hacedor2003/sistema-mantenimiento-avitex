/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { useNavigate } from 'react-router-dom'

const Area = (): JSX.Element => {
  return (
    <RootLayout>
      <main className="w-full h-full px-2">
        <section className="w-full grid grid-cols-6 grid-rows-1 my-2">
          <h4 className="text-2xl font-bold w-full col-span-2">Area - Equipos</h4>
          <div className="col-span-4 w-full">
            <label className="text-lg" htmlFor="selectCiclo">
              Ciclo de{' '}
            </label>
            <select
              name="selectCiclo"
              id="selectCiclo"
              className="border-b border-black cursor-pointer"
            >
              <option value="">Lubricacion</option>
              <option value="">Engrase</option>
              <option value="">Lubricacion y Engrase</option>
              <option value="">Mantenimiento</option>
              <option value="">Todo</option>
            </select>
            <label className="mx-2 text-lg" htmlFor="inputBusqueda">
              Buscar:
            </label>
            <input
              className="border-b border-black"
              type="text"
              name="inputBusqueda"
              id="inputBusqueda"
              placeholder="Buscar:"
            />
          </div>
        </section>
        <table className="w-full mt-2 text-left text-lg">
          <thead>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Origen</th>
            <th>Comentarios</th>
          </thead>
          <tbody>
            <ItemOfList_ComponentsContent />
            <ItemOfList_ComponentsContent />
            <ItemOfList_ComponentsContentEsp indicador="warning" />
            <ItemOfList_ComponentsContentEsp indicador="danger" />
          </tbody>
        </table>
      </main>
    </RootLayout>
  )
}

export default Area

const ItemOfList_ComponentsContent = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <tr className="hover:bg-[#b70909] transition-all duration-300 cursor-pointer text-lg">
      <td onClick={() => navigate('/home/a/a')}># Nombre</td>
      <td onClick={() => navigate('/home/a/a')}>Identificación</td>
      <td onClick={() => navigate('/home/a/a')}>Origen</td>
      <td onClick={() => navigate('/home/a/a')}>Comentarios</td>
      <td onClick={() => navigate('/home/calendario/sierra')}>Ver Fechas</td>
    </tr>
  )
}

const ItemOfList_ComponentsContentEsp = ({
  indicador
}: {
  indicador: 'warning' | 'danger'
}): JSX.Element => {
  const navigate = useNavigate()

  return (
    <tr
      className={`cursor-pointer text-lg duration-300 ${indicador === 'warning' ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-red-500 hover:bg-red-700'}`}
      onClick={() => navigate('/home/a/a')}
    >
      <td># Nombre</td>
      <td>Identificación</td>
      <td>Origen</td>
      <td>Comentarios</td>
      <td onClick={() => navigate('/home/calendario/maquinaria')}>
        {indicador === 'warning' ? 'Mantenimiento - Ver Fechas' : 'Baja - Ver Fechas'}{' '}
        <span className={`rounded-sm ${indicador === 'warning' ? 'bg-yellow-200' : 'bg-red-200'}`}>
          {indicador === 'warning' ? '⚠️' : '💀'}
        </span>
      </td>
    </tr>
  )
}
