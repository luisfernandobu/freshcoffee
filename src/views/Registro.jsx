import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "@/components/Alerta"
import { useAuth } from "../hooks/useAuth"

export default function Registro() {

    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmRef = createRef()

    const [errores, setErrores] = useState([])
    const { registro } = useAuth({
        middleware: 'guest',
        url: '/'
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrores([]);

        const datos = {
            'name': nameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
            'password_confirmation': passwordConfirmRef.current.value,
        }

        registro(datos, setErrores)
    }

    return(
        <>
            <h1 className="text-4xl font-black">Crea Tu Cuenta</h1>
            <p>Crea tu cuenta llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    {errores ? errores.map((error, i) => <Alerta key={ i } >{ error }</Alerta>) : null}

                    <div className="mb-4">
                        <label 
                            htmlFor="name"
                            className="text-slate-800"
                        >Nombre:</label>
                        <input 
                            type="text"
                            id="name"
                            className="mt-2 w-full p-3 bg-gray-100"
                            name="name"
                            placeholder="Tu Nombre"
                            ref={nameRef}
                        />
                    </div>

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
                            ref={emailRef}
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
                            ref={passwordRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label 
                            htmlFor="password_confirmation"
                            className="text-slate-800"
                        >Repetir Password:</label>
                        <input 
                            type="password"
                            id="password_confirmation"
                            className="mt-2 w-full p-3 bg-gray-100"
                            name="password_confirmation"
                            placeholder="Confirma tu Password"
                            ref={passwordConfirmRef}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Crear Cuenta" 
                        className="bg-indigo-600 w-full p-3 mt-5 text-white uppercase font-bold cursor-pointer hover:bg-indigo-800"
                    />
                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">
                    ¿Ya tienes cuenta? <span className="underline underline-offset-2">Click aquí para iniciar sesión</span>
                </Link>
            </nav>
        </>
    )
}
