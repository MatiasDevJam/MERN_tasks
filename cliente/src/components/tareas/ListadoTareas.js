import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { Tarea } from './Tarea'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export const ListadoTareas = () => {

    const proyectosContext = useContext( proyectoContext );
    const { proyecto, eliminarProyecto } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext( tareaContext );
    const { tareasproyecto } = tareasContext;

    // si no hay un proyecto seleccionado
    if( !proyecto ) return <h2>Selecioná un proyecto</h2>

    // array destructuring para extraer el proyecto
    const [ proyectoActual ] = proyecto;

    const handleClick = () => {
        eliminarProyecto( proyectoActual._id )
    }

    return (
        <>
            <h2>Proyecto: { proyectoActual.nombre }</h2>   

            <ul className="listado-tareas">
                { tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        { tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={ tarea.id }
                                timeout={ 200 }
                                classNames="tarea"
                            >
                                <Tarea
                                    tarea={ tarea }
                                />
                            </CSSTransition>
                        )) }
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={ handleClick }
            >
                Eliminar Proyecto &times;
            </button>
        </>
    )
}
