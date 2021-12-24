import React, { useContext, useEffect } from 'react';
import { Route, } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

export const RutaPrivada = ({ element: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { cargando, autenticado, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return (
        <Route { ...props} render={ props => !autenticado && !cargando ?
            ( <Route to="/" /> )
        :
            ( <Component { ...props } /> ) } 
        />
    );
}
