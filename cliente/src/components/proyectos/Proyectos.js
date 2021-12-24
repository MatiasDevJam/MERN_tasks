import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/autenticacion/authContext'
import { Barra } from '../layout/Barra'
import { SideBar } from '../layout/SideBar'
import { FormTarea } from '../tareas/FormTarea'
import { ListadoTareas } from '../tareas/ListadoTareas'

export const Proyectos = () => {

    // extraer información de autenticación
    const authContext = useContext( AuthContext );
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])
    
    return (
        <div className="contenedor-app">
            <SideBar />

            <div className="seccion-principal">
                <Barra />

                <main>
                    <FormTarea />

                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>

    )
}
