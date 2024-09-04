/* eslint-disable prettier/prettier */

import { CategoriasAttributes, EquiposAttributes, Estados_RevisionAttributes, Orden_MantenimientoAttributes, PresupuestoAttributes, Tipo_MantenimientoAttributes, UsuariosAttributes } from "src/shared/types";


export interface Context_Interface {
  data: {
    equipos: { data: EquiposAttributes[]; setData: React.Dispatch<React.SetStateAction<EquiposAttributes[]>> }
    tipo_mantenimiento: { data: Tipo_MantenimientoAttributes[]; setData: React.Dispatch<React.SetStateAction<Tipo_MantenimientoAttributes[]>>}
    categorias: { data: CategoriasAttributes[]; setData: React.Dispatch<React.SetStateAction<CategoriasAttributes[]>> }
    estados: { data: Estados_RevisionAttributes[]; setData: React.Dispatch<React.SetStateAction<Estados_RevisionAttributes[]>> }
    usuarios: { data: UsuariosAttributes[]; setData: React.Dispatch<React.SetStateAction<UsuariosAttributes[]>> }
    ordenes: { data: Orden_MantenimientoAttributes[]; setData: React.Dispatch<React.SetStateAction<Orden_MantenimientoAttributes[]>> }
    presupuestos: { data: PresupuestoAttributes[]; setData: React.Dispatch<React.SetStateAction<PresupuestoAttributes[]>> }
  }
}

export interface fechaType {
  startDate: Date
  endDate: Date
  key: string
  tipoMantenimiento: string
}