/* eslint-disable prettier/prettier */
import { Context_Interface } from '@renderer/Interface'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { Categorias, Equipos, Estados_Revision, Orden_Mantenimiento, Presupuesto, Tipo_Mantenimiento, Usuarios } from 'src/main/db/Models'

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
  const [equipos, setEquipos] = useState<Equipos[]>([]);
  const [tipo_mantenimiento, setTipoMantenimientos] = useState<Tipo_Mantenimiento[]>([]);
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [estados, setEstados] = useState<Estados_Revision[]>([]);
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const [ordenes, setOrdenes] = useState<Orden_Mantenimiento[]>([]);
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);

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
  }, [equipos, tipo_mantenimiento, categorias, estados, usuarios, ordenes, presupuestos])

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


export { AppContext, AppProvider }

