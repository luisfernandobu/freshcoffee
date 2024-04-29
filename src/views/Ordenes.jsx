import useSWR from "swr"
import clienteAxios from '@/config/axios'
import Loader from '@/components/Loader'
import useQuiosco from '@/hooks/useQuiosco'
import { formatearDinero } from "../helpers"

export default function Ordenes() {
    const {handleClickCompletar} = useQuiosco()

    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const {data, error, isLoading, mutate} = useSWR('/api/pedidos', fetcher, {
        refreshInterval: 5000
    })

    if (error) console.log(error)

    if (isLoading) {
        return (
            <Loader />
        )
    }

    const completarPedido = (id) => {
        handleClickCompletar(id)
        mutate()
    }

    return (
        <div className="p-4">
            <h1 className="text-4xl font-black">Ordenes</h1>

            <p className="text-2xl my-10">Administra las órdenes desde aquí.</p>

            <div className="grid sm:grid-cols-2 gap-4 text-slate-600">
                {
                    data.data.data.map(pedido => (
                        <div key={pedido.id} className="p-5 bg-white shadow border-b flex flex-col justify-between">
                            <p className="text-xl font-bold">Contenido del Pedido #{pedido.id}</p>

                            <div className="py-3">
                            {
                                pedido.productos.map(producto => (
                                    <p key={producto.id} className="font-semibold">{`${producto.pivot.cantidad} x ${producto.nombre} (ID ${producto.id})`}</p>
                                ))
                            }
                            </div>

                            <div>
                                <p className="text-lg font-bold">Cliente: <span className="font-normal">{pedido.user.name}</span></p>
                                <p className="text-lg font-bold text-amber-500">
                                    Total a pagar: <span className="font-normal text-slate-600">{formatearDinero(pedido.total)}</span>
                                </p>
                            </div>
                            <div className="mt-5">
                                <button
                                    onClick={() => completarPedido(pedido.id)}
                                    className='bg-indigo-600 hover:bg-indigo-800 py-2 px-5 rounded w-full uppercase text-sm font-bold 
                                                text-center text-white cursor-pointer'
                                >Completar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
