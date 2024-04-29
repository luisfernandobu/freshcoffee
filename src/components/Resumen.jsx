import { formatearDinero } from "@/helpers"
import useQuiosco from "@/hooks/useQuiosco"
import ResumenProducto from "@/components/ResumenProducto"

export default function Resumen() {

  const { pedido, total, handleSubmitNuevaOrden } = useQuiosco()

  const comprobarPedido = () => pedido.length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSubmitNuevaOrden()
  }

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Mi Pedido</h1>

      <p className="tetx-lg my-5">Aquí podrás ver el resumen y total de tu pedido</p>

      <div className="py-5">
        {pedido.length == 0 ? (
          <p className="text-center text-xl">No hay elementos en tu pedido</p>
        ) : (
          pedido.map(producto => (
            <ResumenProducto
              key = {producto.id}
              producto = {producto}
            />
          ))
        )}
      </div>

      <p className="text-xl mt-10">
        Total: {formatearDinero(total)}
      </p>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-5">
          <input
            type="submit"
            value="Confirmar Pedido"
            className={`${comprobarPedido() ? 'bg-indigo-200 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800'} 
            py-2 px-5 rounded w-full uppercase text-sm font-bold text-center text-white cursor-pointer`}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  )
}
