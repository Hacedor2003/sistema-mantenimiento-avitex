/* eslint-disable prettier/prettier */
import  { useState, useEffect } from 'react';
import { RootLayout } from '@renderer/components/AppLayout';
import { useParams } from 'react-router-dom';
import { Button_UI } from '@renderer/components/UI_Component';
import { DateRange } from 'react-date-range';
import { EquiposAttributes } from 'src/shared/types';
import { fechaType } from '@renderer/Interface';

const Calendario = (): JSX.Element => {
  const [ciclo, setCiclo] = useState<'lubricamiento' | 'mantenimiento'>('lubricamiento');
  const [fechas, setFechas] = useState<fechaType[]>([]);
  const [maquina, setMaquina] = useState<EquiposAttributes | null>(null);
  const [modoVista, setModoVista] = useState<'lista' | 'fecha'>('lista');
  const { maquinaria } = useParams<{ maquinaria: string }>();

  useEffect(() => {
    const fetchEquipo = async () => {
      const response = await window.context.getEquipos_By_Id(maquinaria);
      setMaquina(response);
      setFechas(
        ciclo === 'lubricamiento'
          ? response?.fecha_lubricamiento.map((item: fechaType) => ({
              startDate: new Date(item.startDate),
              endDate: new Date(item.endDate),
              key: item.key,
            }))
          : response?.fecha_mantenimiento.map((item: fechaType) => ({
              startDate: new Date(item.startDate),
              endDate: new Date(item.endDate),
              key: item.key,
            }))
      );
    };
    fetchEquipo();
  }, [ciclo, maquinaria]);

  return (
    <RootLayout>
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4">Calendario de {maquina?.Nombre}:</h2>
        <div className="w-full flex items-start justify-center gap-x-4">
          <Button_UI
            type="button"
            texto="Cambiar Vista"
            funcion={() => setModoVista(modoVista === 'fecha' ? 'lista' : 'fecha')}
          />
          <div className="flex flex-col items-start">
            <label htmlFor="inputCiclo" className="text-xl">
              Selecccione el Ciclo:
            </label>
            <select
              name=""
              id="inputCiclo"
              className="border border-black p-2 rounded-md"
              onChange={(e) => setCiclo(e.target.value as 'lubricamiento' | 'mantenimiento')}
            >
              <option value="lubricamiento">Lubricamiento</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>
        </div>

        {modoVista === 'fecha' && <div className='w-full flex justify-center m-5'>
          <DateRange
            editableDateInputs={true}
            onChange={()=>{}}
            moveRangeOnFirstSelection={false}
            ranges={fechas}
          />
        </div>}
        {modoVista === 'lista' && (
          <ul className='w-full flex flex-col justify-center items-center my-2'>
            {fechas.map((item, index) => (
              <li key={index} className="p-1 flex flex-row items-center">
                <div className="flex flex-row items-center mx-2">
                  <div className='flex flex-col'>
                  <h6>Fecha Inicial</h6>
                    <p>{item.startDate.toLocaleDateString() ?? ''}</p>
                    </div>
                  {item.startDate.getTime() !== item.endDate.getTime() && (
                    <div className="flex flex-col items-center mx-2">
                      <h6>Fecha Final</h6>
                      <p>{item.endDate.toLocaleDateString() ?? ''}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </RootLayout>
  );
};

export default Calendario;
