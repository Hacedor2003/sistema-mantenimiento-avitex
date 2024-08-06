/* eslint-disable prettier/prettier */

import { RootLayout } from '@renderer/components/AppLayout'
import { Button_UI } from '@renderer/components/UI_Component'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Equipos } from 'src/main/db/Models'
import React from 'react'

const Details = (): JSX.Element => {
  const { details: productID } = useParams()
  const [producto, setProducto] = useState<Equipos | null>(null)
  const navigate = useNavigate();

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
          <Button_UI type='button' texto='Crear Orden' funcion={()=>navigate(`/home/orden/${productID}`)}/>
          <ItemOfList_ComponentsContent id={producto?.dataValues.ID_Equipo ?? -1} />
        </section>
      </main>
    </RootLayout>
  )
}

export default Details

const ItemOfList_ComponentsContent = ({id}:{id:number}): JSX.Element => {
  const navigate = useNavigate()

  return (
    <tr className="hover:bg-[#b70909] transition-all duration-300 cursor-pointer">
      <td onClick={() => navigate(`/home/calendario/${id}`)}>Ver Fechas</td>
    </tr>
  )
}
