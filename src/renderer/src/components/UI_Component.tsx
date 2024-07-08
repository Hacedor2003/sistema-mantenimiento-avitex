/* eslint-disable prettier/prettier */

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
export const Input_UI = ({texto , type , value ,name , funcion}:{texto:string ,name:string , type:React.HTMLInputTypeAttribute , value:any , funcion:React.Dispatch<React.SetStateAction<any>>}) => (
  <section className="w-5/6 flex flex-col items-left justify-around m-2">
    <label className="text-2xl font-thin font-serif" htmlFor={`input${texto}`}>
      {texto}
    </label>
    <input
      className="border border-black p-1 rounded-md w-fit"
      type={type}
      id={`input${texto}`}
      placeholder={texto}
      value={value}
      name={name}
      onChange={(e)=>funcion(e.target.value)}
    />
  </section>
)
