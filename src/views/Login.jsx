import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "@/components/Alerta"
import { useAuth } from "@/hooks/useAuth"

export default function Login() {

    const emailRef = createRef()
    const passwordRef = createRef()

    const [errores, setErrores] = useState([])
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrores([]);

        const datos = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
        }

        login(datos, setErrores)
    }

    return(
        <>
            <h1 className="text-4xl font-black">Iniciar Sesión</h1>
            <p>Para realizar un pedido debes iniciar sesión</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form onSubmit={ handleSubmit }>
                    {errores ? errores.map((error, i) => <Alerta key={ i } >{ error }</Alerta>) : null}

                    <div className="mb-4">
                        <label 
                            htmlFor="email"
                            className="text-slate-800"
                        >Email:</label>
                        <input 
                            type="email"
                            id="email"
                            className="mt-2 w-full p-3 bg-gray-100"
                            name="email"
                            placeholder="Tu Email"
                            ref={ emailRef }
                        />
                    </div>

                    <div className="mb-4">
                        <label 
                            htmlFor="password"
                            className="text-slate-800"
                        >Password:</label>
                        <input 
                            type="password"
                            id="password"
                            className="mt-2 w-full p-3 bg-gray-100"
                            name="password"
                            placeholder="Tu Password"
                            ref={ passwordRef }
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Iniciar Sesión" 
                        className="bg-indigo-600 w-full p-3 mt-5 text-white uppercase font-bold cursor-pointer hover:bg-indigo-800"
                    />
                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/registro">
                    ¿No tienes cuenta? <span className="underline underline-offset-2">Click aquí para crear una</span>
                </Link>
            </nav>
        </>
    )
}