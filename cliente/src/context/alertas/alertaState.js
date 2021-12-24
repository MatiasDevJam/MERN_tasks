import React, { useReducer } from 'react'
import alertaContext from './alertaContext'
import  alertaReducer from '../alertas/alertaReducer'

import { MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types/index'


const AlertaState = props => {

    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState)

    // función que ejecuta mostrar alerta luego de 5 segundos
    // ejecuta ocultar alerta

    const mostrarAlerta = ( msg, categoria ) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return(
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            { props.children }
        </alertaContext.Provider>
    )
}

export default AlertaState