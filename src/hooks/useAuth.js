import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
import clienteAxios from "../config/axios"

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const { data: user, error, mutate } = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error.response?.data?.errors)
        })
    )

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            await mutate()
        } catch (error) {
            const validationErrors = Object.values(error.response.data.errors).flat()            
            setErrores(validationErrors)
        }
    }

    const registro = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            await mutate()
        } catch (error) {
            const validationErrors = Object.values(error.response.data.errors).flat()            
            setErrores(validationErrors)
        }
    }

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error.response?.data?.errors)
        }
    }

    useEffect(() => {
        if (middleware === 'guest' && url && user && user.admin !== 1) {
            navigate(url)
        }
        if (middleware === 'guest' && user && user.admin === 1) {
            navigate('/admin')
        }
        if (middleware === 'admin' && user && user.admin !== 1) {
            navigate('/')
        }
        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])

    return {
        login,
        registro,
        logout,
        user,
        error
    }
}
