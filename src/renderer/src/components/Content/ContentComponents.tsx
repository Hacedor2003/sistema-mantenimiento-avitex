/* eslint-disable prettier/prettier */
export const ComponentsContent = (): JSX.Element => {
  return (
    <main className="col-span-4 w-full h-full">
      <h4 className="text-xl font-bold w-full text-center">Equipos</h4>
      <table className="w-full mt-2 text-left">
        <thead>
          <th>Nombre</th>
          <th>Identificacion</th>
          <th>Origen</th>
          <th>Comentarios</th>
          <th>Fechas</th>
        </thead>
        <tbody>
          <ItemOfList_ComponentsContent />
          <ItemOfList_ComponentsContent />
          <ItemOfList_ComponentsContentEsp indicador='warning'/>
          <ItemOfList_ComponentsContentEsp indicador='danger'/>
        </tbody>
      </table>
    </main>
  )
}

const ItemOfList_ComponentsContent = (): JSX.Element => {
  return (
    <tr className='hover:bg-slate-500 transition-all duration-300 cursor-pointer'>
      <td># Nombre</td>
      <td>Identificacion</td>
      <td>Origen</td>
      <td>Comentarios</td>
      <td>Fechas</td>
    </tr>
  )
}

const ItemOfList_ComponentsContentEsp = ({indicador}:{indicador: 'warning' | 'danger'}): JSX.Element => {
  return (
    <tr
      className={`cursor-pointer ${indicador === 'warning' ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-red-500 hover:bg-red-700'}`}
    >
      <td># Nombre</td>
      <td>Identificación</td>
      <td>Origen</td>
      <td>Comentarios</td>
      <td>
        {indicador === 'warning' ? 'Mantenimiento' : 'Baja'}{' '}
        <span className={`rounded-sm ${indicador === 'warning' ? 'bg-yellow-200' : 'bg-red-200'}`}>
          {indicador === 'warning' ? '⚠️' : '💀'}
        </span>
      </td>
    </tr>
  )
}

