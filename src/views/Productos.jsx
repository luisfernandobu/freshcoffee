import useSWR from "swr"
import clienteAxios from '@/config/axios'
import Producto from '@/components/Producto'
import Loader from '@/components/Loader'

export default function Productos() {
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
        Authorization: `Bearer ${token}`
    }
  })

  const {data, error, isLoading, mutate} = useSWR('/api/productos', fetcher, {
    refreshInterval: 10000
  })
  
  if (error) console.log(error)

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="p-4">
        <h1 className="text-4xl font-black">Productos</h1>

        <p className="text-2xl my-10">Administra los productos desde aquí.</p>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {data.data.data.map(producto => (
            <Producto
              key={producto.id}
              producto={producto}
              botonDisponible={true}
              mutate={mutate}
            />
          ))}
        </div>
    </div>
  )
}
