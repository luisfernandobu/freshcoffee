import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import clienteAxios from '@/config/axios'

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

    // states (estados)
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)

    // useEffect para escuchar por cambios en pedido
    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async() => {
        const token = localStorage.getItem('AUTH_TOKEN')
        
        try {
            // hacer peticion mediante clienteAxios
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // asignar las categorias a state de categorias
            setCategorias(data.data)
            // asignar una categoria inicial por defecto
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect con array vacio como parametro, este correra al cargar el componente
    useEffect(() => {
        obtenerCategorias()
    }, [])

    // handlers
    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }
    const handleClickModal = () => {
        setModal(!modal)
    }
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleAgregarPedido = producto => {
        if (pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Pedido actualizado!')

        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido!')
        }
    }
    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(prod => prod.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }
    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(prod => prod.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Producto eliminado!')
    }

    const handleSubmitNuevaOrden = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            const { data } = await clienteAxios.post('/api/pedidos', 
            {
                total, 
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad,
                        precio: producto.precio
                    }
                 }
                )
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.status === 1) {
                toast.success(data.message)
            } else {
                toast.error('Ocurrió un error al guardar tu pedido, inténtalo de nuevo.')
                console.log('Exepción: ' + data.message)
            }
            
            setTimeout(() => {
                setPedido([])
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletar = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            const { data } = await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.status === 1) {
                toast.success(data.message)
            } else {
                toast.error('Error al completar pedido, intente de nuevo.')
                console.log('Error: ' + data.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductoAgotado = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            const { data } = await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.status === 1) {
                toast.success(data.message)
            } else {
                toast.error('Error al completar pedido, intente de nuevo.')
                console.log('Error: ' + data.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletar,
                handleClickProductoAgotado
            }}
        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext