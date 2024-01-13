"use client"

import { Alert, AlertIcon } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export default function FormAlert({ isError, message } : { isError : boolean, message : string | undefined }) {

    const { pending } = useFormStatus();

    if( pending || !message ) { return null }

    return (
        <Alert marginY={'10px'} status={ isError ? 'error' : 'success' }>
            <AlertIcon />
            { message }
        </Alert>
    );
}
