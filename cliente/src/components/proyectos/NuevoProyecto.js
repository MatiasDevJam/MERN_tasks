import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';

export const NuevoProyecto = () => {

    // obtener el state del formulario a traves de nuestro context
    const proyectosContext = useContext( proyectoContext );
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //state del proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    })

    // destructuring
    const { nombre } = proyecto;

    // función para el onChange
    const handleChange = (e) => {
        setProyecto({
            ...nombre,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        //validamos
        if( nombre === '' ){
            mostrarError();
            return;
        }

        // agregamos al state
        agregarProyecto( proyecto )

        // reinciamos el form
        setProyecto({
            nombre: ''
        })
        }
    

    const handleClick = () => {
        mostrarFormulario();
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ handleClick }
            >
                Nuevo Proyecto
            </button>

            { formulario ?
                (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={ handleSubmit }
                        >
                        <input 
                            type="text" 
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={ nombre }
                            onChange={ handleChange }
                        />

                        <input 
                            type="submit" 
                            className="btn btn-block btn-primario"
                            value="Agregar Proyecto"
                        />  
                    </form>
                ) 
            :
                null }
            
            { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}

        </>
    )
}
