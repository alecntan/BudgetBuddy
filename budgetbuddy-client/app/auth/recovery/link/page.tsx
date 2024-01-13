'use client'

import { Link } from "@chakra-ui/next-js";
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
} from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";
import sendResetLink from "@/actions/auth/sendResetLink";
import FormAlert from "../../FormAlert";

export default function ResetPasswordLinkPage() {

    const [ state, formAction ] = useFormState(sendResetLink, { isError : false, message : "" });

    return (
        <Container maxW='100%' height={'100vh'} paddingY={'20px'}>
            <Center width={'100%'} height={'100%'}>
            <form style={{ width: '400px', marginBottom: '100px'  }} action={formAction}>
                <FormControl isInvalid={state.isError} isRequired>
                    <VStack width={'100%'} spacing={'15px'}>
                        <Center h='25px'>
                            <Heading as='h1' size='lg'>Reset Password</Heading>
                        </Center>
                        <FormAlert show={ state.message != "" } isError={ state.isError } message={state.message} />
                        <Box width={'100%'} >
                            <FormLabel>Email</FormLabel>
                            <Input name="email" type="email" />
                        </Box>
                        <SubmitButton />
                        <Text><Link href="/auth/login">Go to Login Page</Link></Text>
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

