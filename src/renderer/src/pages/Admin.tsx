/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout';
import { Button_UI } from '@renderer/components/UI_Component';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`${path}`);
  };

  return (
    <RootLayout>
      {/* Nav Bar */}
      <div className="w-full flex flex-col items-start justify-around p-2">
        <div>
          <h4 className="text-4xl font-serif font-bold my-2">Desea añadir?</h4>
          <div className="p-1 flex items-center gap-x-4">
            <Button_UI funcion={() => handleNavigation('/home/admin/anadir/area')} type="button" texto="Area" />
            <Button_UI funcion={() => handleNavigation('/home/admin/anadir/maquinaria')} type="button" texto="Equipo" />
            <Button_UI funcion={() => handleNavigation('/home/admin/anadir/usuario')} type="button" texto="Usuario" />
            <Button_UI funcion={() => handleNavigation('/home/admin/anadir/mantenimiento')} type="button" texto="Tipo de Mantenimiento" />
            <Button_UI funcion={() => handleNavigation('/home/admin/anadir/estado')} type="button" texto="Estado" />
          </div>
        </div>
        <div>
          <h4 className="text-4xl font-serif font-bold my-2">Desea Editar?</h4>
          <div className="p-1 flex items-center gap-x-4">
            <Button_UI funcion={() => handleNavigation('/home/admin/editar/presupuesto')} type="button" texto="Presupuesto" />
            <Button_UI funcion={() => handleNavigation('/home/admin/editar/area')} type="button" texto="Area" />
            <Button_UI funcion={() => handleNavigation('/home/admin/editar/maquinaria')} type="button" texto="Equipo" />
            <Button_UI funcion={() => handleNavigation('/home/admin/editar/usuario')} type="button" texto="Usuario" />
            <Button_UI funcion={() => handleNavigation('/home/admin/editar/mantenimiento')} type="button" texto="Tipo de Mantenimiento" />
            <Button_UI funcion={() => handleNavigation('/home/admin/editar/estado')} type="button" texto="Estado" />
            <Button_UI funcion={() => handleNavigation('/home/admin/editar/orden')} type="button" texto="Ordenes" />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Admin;
