import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext';

export const Login = ( props ) => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // Si el usuario o password son incorrectos
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
        email: '',
        password: ''
    })

    // extraer datos de usuario
    const { email, password } = usuario

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
        if( email.trim() === '' || password.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        // pasamos la función al action
        iniciarSesion( email, password );
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
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>

                <Link to="/nueva-cuenta" className="enlace-cuenta"> 
                    Crear cuenta
                </Link>
            </div>
        </div>
    )
}
