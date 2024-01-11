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
    FormErrorMessage,
} from "@chakra-ui/react";
import { useFormState } from "react-dom";
import loginAction from "@/actions/auth/loginAction";

export default function LoginPage() {

    const [ state, formAction ] = useFormState( loginAction, { isError : false, message : "" });

    return (
        <Container maxW='100%' height={'100vh'} paddingY={'20px'}>
            <Center width={'100%'} height={'100%'}>
            <form style={{ width: '400px', marginBottom: '100px'  }} action={formAction}>
                <FormControl isInvalid={state.isError} isRequired>
                    <Center h='25px'>
                        <Heading as='h1' size='lg'>Login</Heading>
                    </Center>
                    <VStack width={'100%'} spacing={'15px'}>
                        <Box width={'100%'} >
                            <FormLabel>Email</FormLabel>
                            <Input name="email" type="email" />
                        </Box>
                        <Box width={'100%'}>
                            <FormLabel>Password</FormLabel>
                            <Input name="password" type='password' />
                        </Box>
                        <Button colorScheme={'teal'} width={'100%'} type='submit'>Submit</Button>
                        <Text><Link href="#">Forgot Your Password?</Link></Text>
                    </VStack>
                    <FormErrorMessage marginTop={"20px"}>
                        <Center width={'100%'} height={'100%'}>
                            <Text>{ state.message }</Text>
                        </Center>
                    </FormErrorMessage>
                </FormControl>
            </form>
            </Center>
        </Container>
    );
}

