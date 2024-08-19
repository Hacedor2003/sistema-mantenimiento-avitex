/* eslint-disable prettier/prettier */

import { Categorias, Equipos, Estados_Revision, Orden_Mantenimiento, Presupuesto, Tipo_Mantenimiento, Usuarios } from "src/main/db/Models";


export interface Context_Interface {
  data: {
    equipos: { data: Equipos[]; setData: React.Dispatch<React.SetStateAction<Equipos[]>> }
    tipo_mantenimiento: { data: Tipo_Mantenimiento[]; setData: React.Dispatch<React.SetStateAction<Tipo_Mantenimiento[]>>}
    categorias: { data: Categorias[]; setData: React.Dispatch<React.SetStateAction<Categorias[]>> }
    estados: { data: Estados_Revision[]; setData: React.Dispatch<React.SetStateAction<Estados_Revision[]>> }
    usuarios: { data: Usuarios[]; setData: React.Dispatch<React.SetStateAction<Usuarios[]>> }
    ordenes: { data: Orden_Mantenimiento[]; setData: React.Dispatch<React.SetStateAction<Orden_Mantenimiento[]>> }
    presupuestos: { data: Presupuesto[]; setData: React.Dispatch<React.SetStateAction<Presupuesto[]>> }
  }
}
