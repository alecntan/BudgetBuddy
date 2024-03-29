"use client"

import { 
Drawer, 
DrawerOverlay,
DrawerContent,
DrawerHeader,
DrawerBody,
DrawerCloseButton,
Input,
Button,
FormControl,
FormLabel, 
VStack,
HStack,
Box,
Flex,
RadioGroup,
Radio,
useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormResponse } from '@/types/budgetbuddy';
import inviteAction from "@/actions/auth/inviteAction";
import { useFormState } from "react-dom";
import FormAlert from "@/app/auth/FormAlert";
import SubmitButton from '@/components/SubmitButton';

const InviteUserDrawer = ({ show, toggleShow } : { show : boolean, toggleShow : () => void }) => {

    const toast = useToast();

    const initialState : FormResponse<boolean> = {
        isRedirect: false,
        redirectUrl: "",
        result: false,
        isError: false,
        message: ""
    };
    const [ userRole, setUserRole ] = useState<string>('associate');
    const [ state, formAction ] = useFormState( inviteAction, initialState);

    useEffect( () => {
        if( state.isError || state.result ) {
            toast({
                title : "Invited User",
                description : state.message,
                status: state.isError ? "error" : "success",
                duration: 5000,
                isClosable : true
            });
        }
    }, [ state, toast ]);

    return (
        <Drawer
            isOpen={show}
            placement={'right'}
            onClose={toggleShow}
            size={'md'}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Invite New User</DrawerHeader>
                <DrawerBody>
                    <form style={{ width: '100%', marginTop: '15px' }} action={formAction}>
                        <FormControl isRequired>
                            <VStack spacing={'25px'}>
                                <Flex width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                                <Box marginRight={'5px'} width={'100%'}>
                                    <FormLabel>First Name</FormLabel>
                                    <Input name="first_name" />
                                </Box>
                                 <Box marginLeft={'5px'} width={'100%'}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input name="last_name" />
                                </Box>
                                </Flex>
                                <Box width={'100%'}>
                                    <FormLabel>Email</FormLabel>
                                    <Input name="email" type={'email'} />
                                </Box>
                                <RadioGroup name={'user_role'} onChange={setUserRole} value={userRole}>
                                    <FormLabel>User Role</FormLabel>
                                    <HStack spacing={'30px'}>
                                        <Radio value={'admin'}>Admin</Radio>
                                        <Radio value={'director'}>Director</Radio>
                                        <Radio value={'manager'}>Manager</Radio>
                                        <Radio value={'associate'}>Associate</Radio>
                                    </HStack>
                                </RadioGroup>
                            </VStack>
                            <Flex marginTop={'100px'} width={'100%'} justifyContent={'flex-end'} alignItems={'center'} >
                                <Button onClick={toggleShow} size={'sm'} marginRight={'10px'}>Cancel</Button> 
                                <SubmitButton size={'sm'} />
                            </Flex>
                        </FormControl>
                    </form>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default InviteUserDrawer;
