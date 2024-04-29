import { formatearDinero } from "@/helpers"
import useQuiosco from "@/hooks/useQuiosco"

export default function Producto({producto, botonAgregar = false, botonDisponible = false, mutate = null}) {

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useQuiosco()
    const { imagen, nombre, precio } = producto

    return (
        <div className="border p-3 shadow bg-white">
            <img
                src={`/img/${imagen}.jpg`}
                alt={`Imagen ${nombre}`}
                className="w-full border"
            />

            <div className="p-5 min-h-56 flex flex-col justify-between">
                <h3 className="text-2xl">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>

                {botonAgregar && (
                    <button
                        type="button"
                        className="bg-indigo-600 text-white w-full mt-5 p-3 uppercase text-sm font-bold hover:bg-indigo-800"
                        onClick={() => {
                            handleClickModal()
                            handleSetProducto(producto)
                        }}
                    >
                        Agregar
                    </button>
                )}

                {botonDisponible && (
                    <>
                        <div className="flex justify-center">
                            <p className={`${producto.disponible === 1 ? 'bg-green-600' : 'bg-red-600'} text-white text-sm font-bold text-center mt-5 py-1.5 px-3 w-fit rounded-full`}>
                                {`${producto.disponible === 1 ? 'Disponible' : 'Agotado'}`}
                            </p>                            
                        </div>

                        <button
                            type="button"
                            className={`text-white w-full mt-3 p-3 uppercase text-sm font-bold bg-indigo-600 hover:bg-indigo-800`}
                            onClick={() => {
                                handleClickProductoAgotado(producto.id)
                                mutate()
                            }}
                        >
                            {producto.disponible === 1 ? 'Marcar agotado' : 'Marcar disponible'}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
