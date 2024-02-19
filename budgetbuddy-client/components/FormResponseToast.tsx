import { FormResponse } from '@/types/budgetbuddy';
import {
useToast,
} from '@chakra-ui/react';

export default function FormResponseToast<T>(title : string, actionResult : FormResponse<T>) {

    const toast = useToast();
   
    return toast({
        title: title,
        description: actionResult.message,
        status: actionResult.isError ? "error" : "success",
        duration: 5000,
        isClosable: true
    })
}

