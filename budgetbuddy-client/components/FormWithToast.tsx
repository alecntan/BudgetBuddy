import {
useToast,
FormControl,
FormControlProps,
} from '@chakra-ui/react';

import { useFormState } from 'react-dom';
import { FormResponse } from '@/types/budgetbuddy';
import { ReactNode, useEffect } from 'react';

export default function FormWithToast({ 
children, 
onSubmit, 
toastTitle } : 
{ 
children : ReactNode, 
onSubmit: ( state: FormResponse<boolean>, formData : FormData ) => Promise<FormResponse<boolean>>, 
toastTitle: string }) {

    const initialFormState : FormResponse<boolean> = {
        isRedirect: false,
        redirectUrl: "",
        isError: false,
        result: false,
        message: ""
    };

    const [ state, formAction ] = useFormState(onSubmit, initialFormState);
    const toast = useToast();

    useEffect( () => {
        if( state.isError || state.result ) {
            toast({
                title: toastTitle,
                description: state.message, 
                status: state.isError ? 'error' : 'success',
                duration: 5000,
                isClosable: true
            });
        }

    }, [ state, toast, toastTitle ]);

    return (
        <form action={formAction}>
            { children }
        </form>
    );
};
