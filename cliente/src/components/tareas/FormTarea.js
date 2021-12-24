import React, { useContext, useState,useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

export const FormTarea = () => {

    const proyectosContext = useContext( proyectoContext );
    const { proyecto } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext( tareaContext );
    const { tareaseleccionada, errortarea, agregarTarea, 
        validarTarea, obtenerTareas, actualizarTarea,
        limpiarTarea } = tareasContext;

    // useEffect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if( tareaseleccionada !== null ){
            setTarea( tareaseleccionada )
        }else{
            setTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    // state del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    })

    // extraer el nombre del proyecto
    const { nombre } =  tarea;

    // si no hay un proyecto seleccionado
    if( !proyecto ) return null;

    // array destructuring para extraer el proyecto
    const [ proyectoActual ] = proyecto;

    // leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [ e.target.name ] : e.target.value
        })
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()

        // validar
        if( nombre.trim() === '' ){
            validarTarea();
            return;
        }

    // verificar si es edición o si es nueva tarea
    if( tareaseleccionada === null ){
        // agregar la nueva tarea de state
        tarea.proyecto = proyectoActual._id;
        agregarTarea()
    } else {
        // actualizar tarea existente
        actualizarTarea( tarea );
        limpiarTarea();
    }
  

    // obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id)

    // reiniciar el form
    setTarea({
        nombre: ''
    })

    }

    return (
        <div className="formulario">
            <form
                onSubmit={ handleSubmit }
            >
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        onChange={ handleChange }
                        value={ nombre }
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-block"
                        value={ tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
                    />
                </div>
            </form>

            { errortarea ? 
                <p className="mensaje error">El nombre de la tarea es obligatorio</p> 
            : 
                null }
            
        </div>
    )
}
