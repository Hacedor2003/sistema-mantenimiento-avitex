/* eslint-disable prettier/prettier */

import { RootLayout } from '@renderer/components/AppLayout'

const Details = (): JSX.Element => {
  return (
    <RootLayout>
      <main className="w-full grid grid-cols-2 grid-rows-1 items-center px-2 text-lg">
        <section>
          <p>Nombre</p>
          <p>Identificación</p>
          <p>Origen</p>
          <p>Comentarios</p>
        </section>
        <section>
          <table className="w-full mt-2 text-left">
            <thead>
              <th>Fechas</th>
            </thead>
            <tbody>
              <ItemOfList_ComponentsContent />
              <ItemOfList_ComponentsContent />
              <ItemOfList_ComponentsContentEsp indicador="warning" />
              <ItemOfList_ComponentsContentEsp indicador="danger" />
            </tbody>
          </table>
        </section>
      </main>
    </RootLayout>
  )
}

export default Details

const ItemOfList_ComponentsContent = (): JSX.Element => {
  return (
    <tr className="hover:bg-[#b70909] transition-all duration-300 cursor-pointer">
      <td>Ver Fechas</td>
    </tr>
  )
}

const ItemOfList_ComponentsContentEsp = ({
  indicador
}: {
  indicador: 'warning' | 'danger'
}): JSX.Element => {
  return (
    <tr
      className={`cursor-pointer ${indicador === 'warning' ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-red-500 hover:bg-red-700'}`}
    >
      <td>
        {indicador === 'warning' ? 'Mantenimiento' : 'Baja'}{' '}
        <span className={`rounded-sm ${indicador === 'warning' ? 'bg-yellow-200' : 'bg-red-200'}`}>
          {indicador === 'warning' ? '⚠️' : '💀'}
        </span>
      </td>
    </tr>
  )
}
