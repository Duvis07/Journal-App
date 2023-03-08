import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';


import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/config';


// Hook para verificar si el usuario esta autenticado o no y asi poder hacer uso de la autenticacion de usuarios
export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
        if ( !user ) return dispatch( logout() );

        const { uid, email, displayName, photoURL } = user;
        dispatch( login({ uid, email, displayName, photoURL }) );
        })
    }, []);

    return status;
}

/* El hook useSelector es una función proporcionada por la biblioteca de React-Redux que permite a los componentes React acceder al estado almacenado en el store de Redux.

useSelector se utiliza para seleccionar una parte específica del estado de la aplicación almacenado en el store. El hook recibe una función de selección como argumento, que especifica qué parte del estado se desea seleccionar. Esta función de selección toma el estado completo de la aplicación como argumento y devuelve la parte del estado que se desea seleccionar.

El hook useSelector se usa comúnmente en componentes React para suscribirse a cambios específicos en el estado de Redux y actualizar el componente en consecuencia. Cuando se utiliza useSelector, el componente se vuelve a renderizar automáticamente cada vez que el estado seleccionado cambia.

En resumen, useSelector es un hook de React-Redux que permite a los componentes React seleccionar y acceder a partes específicas del estado almacenado en el store de Redux. */