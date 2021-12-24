import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext';

export const NuevaCuenta = ( props ) => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    useEffect(() => {

        if( autenticado ) {
            props.history.push('/proyectos')
        }
        if( mensaje ){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [ mensaje, autenticado, props.history ])

    // state para iniciar sesión
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar:  ''
    })

    // extraer datos de usuario
    const { nombre, email, password, confirmar } = usuario

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }   

    // manejamos el inicio de sesión del usuario
    const handleSubmit = (e) => {
        e.preventDefault();

        //validamos que no existan campos vacios
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return;
        }

        // validamos que el password sea minimo 6 caracteres
        if( password.length < 6  ){
            mostrarAlerta('La contraseña debe tener 6 caracteres mínimo', 'alerta-error')
            return;
        }

        // validamos que la contraseñas sean iguales
        if( password !== confirmar ){
            mostrarAlerta('Las contraseñas deben ser iguales', 'alerta-error')
            return;
        }

        // pasamos la función al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return (
        <div className="form-usuario">
            
            { alerta ? 
                (<div className={`alerta ${ alerta.categoria }`}> { alerta.msg } </div>) 
            : 
                null }

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={ handleSubmit }
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={ nombre }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={ email }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="Tu contraseña"
                            value={ password }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu contraseña"
                            value={ confirmar }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link to="/" className="enlace-cuenta"> 
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}
