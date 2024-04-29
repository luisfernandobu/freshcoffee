import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import AuthLayout from '@/layouts/AuthLayout'
import Inicio from '@/views/Inicio'
import Login from '@/views/login'
import Registro from '@/views/Registro'
import AdminLayout from './layouts/AdminLayout'
import Productos from './views/Productos'
import Ordenes from './views/Ordenes'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            }
        ]
    }
])

export default router
