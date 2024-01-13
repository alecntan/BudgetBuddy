'use client'

import { 
    Center,
    Heading,
    Input,
    Container,
    FormControl,
    FormLabel,
    Box,
    Button,
    Text,
    VStack,
    FormErrorMessage
} from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";
import resetPassword from "@/actions/auth/resetPassword";
import FormAlert from "../../FormAlert";

export default function ResetPasswordFormPage() {

    const [ state, formAction ] = useFormState(resetPassword, { isError : false, message : "" });

    return (
        <Container maxW='100%' height={'100vh'} paddingY={'20px'}>
            <Center width={'100%'} height={'100%'}>
            <form style={{ width: '400px', marginBottom: '100px'  }} action={formAction}>
                <FormControl isInvalid={state.isError} isRequired>
                   <VStack width={'100%'} spacing={'15px'}>
                        <Center marginBottom={'20px'} h='25px'>
                            <Heading as='h1' size='lg'>Reset Password</Heading>
                        </Center>
                        <FormAlert isError={state.isError} message={state.message} />
                        <Box width={'100%'} >
                            <FormLabel>New Password</FormLabel>
                            <Input name="password1" type="password" />
                        </Box>
                        <Box width={'100%'} >
                            <FormLabel>Verify Password</FormLabel>
                            <Input name="password2" type="password" />
                        </Box>
                        <SubmitButton />
                    </VStack>
                </FormControl>
            </form>
            </Center>
        </Container>
    );
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return <Button isLoading={pending} loadingText={"Submitting"} colorScheme={'teal'} width={'100%'} type='submit'>Submit</Button>;
}

