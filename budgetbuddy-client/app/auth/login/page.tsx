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
    Text,
    VStack,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";
import loginAction from "@/actions/auth/loginAction";
import FormAlert from "../FormAlert";
import SubmitButton from "../components/SubmitButton";

export default function LoginPage() {

    const [ state, formAction ] = useFormState( loginAction, { isError : false, message : "" });

    return (
        <Container maxW='100%' height={'100vh'} paddingY={'20px'}>
            <Center width={'100%'} height={'100%'}>
            <form style={{ width: '400px', marginBottom: '100px'  }} action={formAction}>
                <FormControl isInvalid={state.isError} isRequired>
                   <VStack width={'100%'} spacing={'15px'}>
                        <Center h='25px'>
                            <Heading as='h1' size='lg'>Login</Heading>
                        </Center>
                        <FormAlert isError={state.isError } message={state.message} />
                        <Box width={'100%'} >
                            <FormLabel>Email</FormLabel>
                            <Input name="email" type="email" />
                        </Box>
                        <Box width={'100%'}>
                            <FormLabel>Password</FormLabel>
                            <Input name="password" type='password' />
                        </Box>
                        <SubmitButton />
                        <Text><Link href="/auth/recovery/link">Forgot Password?</Link></Text>
                    </VStack>
                </FormControl>
            </form>
            </Center>
        </Container>
    );
}
