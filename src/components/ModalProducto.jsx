import { useState, useEffect } from "react"
import useQuiosco from "@/hooks/useQuiosco"
import { formatearDinero } from "@/helpers"


export default function ModalProducto() {

    const { producto, handleClickModal, handleAgregarPedido, pedido } = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    useEffect(() => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]
            setCantidad(pedidoEdicion.cantidad)
            setEdicion(true)
        }
    }, [pedido])

    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <img
                    src={`/img/${producto.imagen}.jpg`}
                    alt={`Imagen ${producto.nombre}`}
                />
            </div>

            <div className="md:w-2/3 flex flex-col">
                <div className="flex justify-end mt-3">
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">
                        {producto.nombre}
                    </h1>

                    <p className="mt-5 font-black text-5xl text-amber-500">
                        {formatearDinero(producto.precio)}
                    </p>

                    <div className="flex items-center gap-4 mt-5">
                        <button
                            type="button"
                            onClick={() => {
                                if (cantidad <= 1) {
                                    return
                                }
                                setCantidad(cantidad - 1)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${cantidad <= 1 ? "text-gray-400" : "text-black"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>

                        <p className="text-3xl">
                            {cantidad}
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setCantidad(cantidad + 1)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="bg-indigo-600 px-5 py-2 mt-5 text-white text-sm font-bold uppercase rounded hover:bg-indigo-800"
                        onClick={() => {
                            let pedido = {
                                cantidad,
                                'id': producto.id,
                                'nombre': producto.nombre,
                                'precio': producto.precio,
                                'imagen': producto.imagen
                            }
                            handleAgregarPedido(pedido)
                            handleClickModal()
                        }}
                    >
                        {edicion ? 'Modificar pedido' : 'Añadir al pedido'}
                    </button>
                </div>
            </div>
        </div>
    )
}
