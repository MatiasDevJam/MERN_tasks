import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

export const Proyecto = ({ proyecto }) => {

    const proyectosContext = useContext( proyectoContext );
    const { proyectoActual } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext( tareaContext );
    const { obtenerTareas } = tareasContext;

    // función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual( id ); // fijar un proyecto actual
        obtenerTareas( id )
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto( proyecto._id ) }
            >
                { proyecto.nombre }
            </button>
        </li>
    )
}
