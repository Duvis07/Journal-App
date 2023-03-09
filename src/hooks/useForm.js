import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    //Me avisa si hay un error en el formulario o en cual campo 
    const [ formValidation, setFormValidation ] = useState({});

    //se dispara cuando cambia el estado del formulario o el formstate
    useEffect(() => {
        createValidators();
    }, [ formState ])


    //se dispara cuando cambia el estado del formulario o el formstate para cambiar el estado de la fecha de creacion
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    

    //Quiero memorizar el estado del formulario para que no se vuelva a renderizar a menos que cambie el formstate
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }


    //Valida el formulario se itera sobre el objeto formValidations
    const createValidators = () => {
        
        const formCheckedValues = {};
        
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }



    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}