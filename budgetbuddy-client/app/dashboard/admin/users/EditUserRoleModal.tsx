"use client"

import SubmitButton from '@/components/SubmitButton';
import { FormResponse, UserProfile } from '@/types/budgetbuddy';
import {
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalCloseButton,
ModalBody,
ModalFooter,
Button,
RadioGroup,
Radio,
Stack,
Text,
useToast,
Input,
FormControl,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import editUserRole from '@/actions/profiles/updateUserRole';

const EditUserRoleModal = ({ show, toggleShow, user } : { show : boolean, toggleShow : () => void, user : UserProfile | null }) => {

    const  initialFormState : FormResponse<boolean> = {
        isRedirect: false,
        redirectUrl: "",
        isError: false,
        result: false,
        message:  "",
    };

    const [ currRole, setCurrRole ] = useState<string | undefined>(undefined);
    const [ state,  formAction ] = useFormState(editUserRole, initialFormState);
    const toast = useToast();

    useEffect( () => {
        if( state.isError || state.result ) {
            toast({
                title: "Edit User Role",
                description: state.message,
                status: state.isError ? 'error'  : 'success',
                duration: 5000,
                isClosable: true
            });
        }
    }, [ state, toast ]);

    if( user === null ) {
        return null;
    }

    return (
            <Modal 
                isOpen={show} 
                onClose={toggleShow}
                closeOnOverlayClick={false}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent>
                     <form action={formAction}>
                        <FormControl isRequired>
                            <ModalHeader>{`Editing the role of ${user.first_name} ${user.last_name}`}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text fontSize={'md'} mb={'20px'}>{ `Current role: ${user.user_role}`}</Text>
                                    <Input type={'hidden'} name={'user_id'} value={user.id} />
                                    <RadioGroup width={'100%'} onChange={setCurrRole} value={currRole} name={'user_role'}>
                                        <Stack width={'100%'} direction={'row'} spacing={'10px'} justify={'space-evenly'}>
                                            <Radio value={'admin'}>Admin</Radio>
                                            <Radio value={"director"}>Director</Radio>
                                            <Radio value={"manager"}>Manager</Radio>
                                            <Radio value={"associate"}>Associate</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button  mr={3} onClick={toggleShow}>Close</Button>
                                    <SubmitButton  />
                                </ModalFooter>
                        </FormControl>
                    </form>
                </ModalContent>
            </Modal>
    );
};

export default EditUserRoleModal;
