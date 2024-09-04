/* eslint-disable prettier/prettier */
import { Context_Interface } from '@renderer/Interface';
import { createContext, useEffect, useState } from 'react';
import { CategoriasAttributes, EquiposAttributes, Estados_RevisionAttributes, Orden_MantenimientoAttributes, PresupuestoAttributes, Tipo_MantenimientoAttributes, UsuariosAttributes } from 'src/shared/types';

// Contexto para la aplicación
const AppContext = createContext<Context_Interface>({
  data: {
    equipos: { data: [], setData: () => {} },
    tipo_mantenimiento: { data: [], setData: () => {} },
    categorias: { data: [], setData: () => {} },
    estados: { data: [], setData: () => {} },
    usuarios: { data: [], setData: () => {} },
    ordenes: { data: [], setData: () => {} },
    presupuestos: { data: [], setData: () => {} }
  }
})

// Componente proveedor del contexto
const AppProvider = ({ children }) => {
  const [equipos, setEquipos] = useState<EquiposAttributes[]>([]);
  const [tipo_mantenimiento, setTipoMantenimientos] = useState<Tipo_MantenimientoAttributes[]>([]);
  const [categorias, setCategorias] = useState<CategoriasAttributes[]>([]);
  const [estados, setEstados] = useState<Estados_RevisionAttributes[]>([]);
  const [usuarios, setUsuarios] = useState<UsuariosAttributes[]>([]);
  const [ordenes, setOrdenes] = useState<Orden_MantenimientoAttributes[]>([]);
  const [presupuestos, setPresupuestos] = useState<PresupuestoAttributes[]>([]);

  const fetchData = async (fetchFunction, setData) => {
    try {
      const response = await fetchFunction();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(window.context.getPresupuestos_All, setPresupuestos)
    fetchData(window.context.getEquipos_All, setEquipos)
    fetchData(window.context.getUsuarios_All, setUsuarios)
    fetchData(window.context.getOrden_Mantenimiento_All, setOrdenes)
    fetchData(window.context.getTipo_Mantenimiento_All, setTipoMantenimientos)
    fetchData(window.context.getCategorias_All, setCategorias)
    fetchData(window.context.getEstados_Revision_All, setEstados)
  }, [])

  return (
    <AppContext.Provider
      value={{
        data: {
          equipos: { data: equipos, setData: setEquipos },
          tipo_mantenimiento: { data: tipo_mantenimiento, setData: setTipoMantenimientos },
          categorias: { data: categorias, setData: setCategorias },
          estados: { data: estados, setData: setEstados },
          usuarios: { data: usuarios, setData: setUsuarios },
          ordenes: { data: ordenes, setData: setOrdenes },
          presupuestos: { data: presupuestos, setData: setPresupuestos }
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;


export { AppContext, AppProvider };

