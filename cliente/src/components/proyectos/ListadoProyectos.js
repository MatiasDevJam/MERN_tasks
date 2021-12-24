import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import { Proyecto } from './Proyecto'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AlertaContext from '../../context/alertas/alertaContext';


export const ListadoProyectos = () => {

    const proyectosContext = useContext( proyectoContext );
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext( AlertaContext );
    const { alerta, mostrarAlertas } = alertaContext;

    // obtener proyectos cuando carga el componente
    useEffect(() => {

        // si hay un error mostramos una alerta
        if( mensaje ){
            mostrarAlertas( mensaje.msg, mensaje.categoria )
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [ mensaje ])

    if( proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul>

        { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
                :
            null    
        }
            <TransitionGroup>
                { proyectos.map( proyecto => (
                    <CSSTransition
                        key={ proyecto._id }
                        timeout={ 200 }
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={ proyecto }
                        />
                    </CSSTransition>
                ) ) }
            </TransitionGroup>
        </ul>
        
    )
}
