/* eslint-disable prettier/prettier */

import { RootLayout } from '@renderer/components/AppLayout'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Equipos } from 'src/main/db/Models'

const Details = (): JSX.Element => {
  const { details: productID } = useParams()
  const [producto, setProducto] = useState<Equipos | null>(null)

  useEffect(() => {
    window.context
      .getEquipos_By_Id(productID)
      .then((response) => {
        setProducto(response)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <RootLayout>
      <main className="w-full grid grid-cols-2 grid-rows-1 items-center px-2 text-lg">
        <section>
          <h5 className='text-3xl font-bold font-serif my-2'>Nombre:</h5>
          <p>{producto?.dataValues.Nombre}</p>
          <h5 className='text-3xl font-bold font-serif my-2'>Identificacion:</h5>
          <p>{producto?.dataValues.Identificacion}</p>
          <h5 className='text-3xl font-bold font-serif my-2'>Origen:</h5>
          <p>{producto?.dataValues.Origen}</p>
          <h5 className='text-3xl font-bold font-serif my-2'>Comentarios:</h5>
          <p>{producto?.dataValues.Comentarios}</p>
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
  const navigate = useNavigate()

  return (
    <tr className="hover:bg-[#b70909] transition-all duration-300 cursor-pointer">
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
      className={`cursor-pointer ${indicador === 'warning' ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-red-500 hover:bg-red-700'}`}
    >
      <td onClick={() => navigate('/home/calendario/sierra')}>
        {indicador === 'warning' ? 'Mantenimiento' : 'Baja'}{' '}
        <span className={`rounded-sm ${indicador === 'warning' ? 'bg-yellow-200' : 'bg-red-200'}`}>
          {indicador === 'warning' ? '⚠️' : '💀'}
        </span>
      </td>
    </tr>
  )
}
