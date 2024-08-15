/* eslint-disable prettier/prettier */
import React from "react"

export const Button_UI = ({
  type,
  texto,
  funcion
}: {
  funcion: () => void
  texto: string
  type: 'submit' | 'reset' | 'button' | undefined
}) => (
  <button
    className="active:opacity-50 self-center border border-black w-fit hover:bg-[#b70909] hover:text-white transition-all duration-300 p-2 rounded-xl hover:rounded-sm bg-white text-black"
    type={type}
    onClick={funcion}
  >
    {texto}
  </button>
)

/**
 * Componente con label y input-type
 * @param texto: Texto del label , id placeholder
 * @param type: del input
 * @param value: del input
 * @param funcion: que se va a usar en el onChange
 * @param name: del input
 * @returns 
 */
export const Input_UI = ({texto , type , value ,name , required , funcion}:{texto:string ,name:string , type:React.HTMLInputTypeAttribute , value: any,required:boolean ,funcion:React.Dispatch<React.SetStateAction<any>>}) => (
  <section className="w-fit flex flex-col items-start justify-around m-2">
    <label className="text-2xl font-thin font-serif" htmlFor={`input${texto}`}>
      {texto}
    </label>
    <input
      className="border border-black py-1 px-3 rounded-md w-fit"
      type={type}
      id={`input${texto}`}
      placeholder={texto}
      value={value}
      name={name}
      onChange={(e) => funcion(e.target.value)}
      required={required}
    />
  </section>
)

/**
 * Componente con label , texto y input-type
 * @param texto: Texto del label , id placeholder
 * @param type: del input
 * @param value: del input
 * @param funcion: que se va a usar en el onChange
 * @param name: del input
 * @returns 
 */
export const Input_UI_subTexto = ({texto , subTexto , type , value ,name , required , funcion}:{subTexto:string, texto:string ,name:string , type:React.HTMLInputTypeAttribute , value: any,required:boolean ,funcion:React.Dispatch<React.SetStateAction<any>>}) => (
  <section className="w-fit flex flex-col items-start justify-around m-2">
    <label className="text-2xl font-thin font-serif" htmlFor={`input${texto}`}>
      {texto}
    </label>
    <p className="text-xl font-thin font-serif">{subTexto}</p>
    <input
      className="border border-black py-1 px-3 rounded-md w-fit"
      type={type}
      id={`input${texto}`}
      placeholder={texto}
      value={value}
      name={name}
      onChange={(e) => funcion(e.target.value)}
      required={required}
    />
  </section>
)


/**
 * Un select con label
 * @param id html for
 * @param name name del input
 * @param label texto del label
 * @param options un array de options
 * @param value el value del select
 * @param onChange (e)=> onChange(e.target.value)
 * @param required si es required o no
 * @param className className adicionales
 * @returns 
 */
export const SelectComponent = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  required = false,
  className
}: {
  id: string
  name: string
  label: string
  options: any
  value: number | undefined
  onChange: React.Dispatch<React.SetStateAction<any>>
  required: boolean
  className: string
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-2xl font-thin font-serif" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={className + ' w-fit border border-black p-2 rounded-md cursor-pointer'}
      >
        <option value="">Selecciona una opción</option>
        {options}
      </select>
    </div>
  )
}
