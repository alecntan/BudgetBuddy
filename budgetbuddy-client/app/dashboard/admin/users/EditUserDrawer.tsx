"use client"

import { UserProfile } from '@/types/budgetbuddy';
import {
Drawer,
DrawerOverlay,
DrawerCloseButton,
DrawerHeader,
DrawerBody,
DrawerContent,
AlertDialog,
AlertDialogOverlay,
AlertDialogHeader,
AlertDialogBody,
AlertDialogFooter,
AlertDialogContent,
Button,
useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';


const EditUserDrawer = ({ show, toggleShow, user } : { show : boolean, toggleShow : () => void, user : UserProfile | null }) => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <>
            <Drawer
                isOpen={show}
                placement={'right'}
                onClose={toggleShow}
                size={'md'}
            >
                <DrawerOverlay />            
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{ user != null ? `Editing ${user.first_name} ${user.last_name}` : "No User Selected"}</DrawerHeader>
                    <DrawerBody>
                        <Button colorScheme={'red'} onClick={onToggle}>Delete User</Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <DeleteUserAlertDialog show={isOpen} toggleShow={onToggle} user={user} />
        </>
    );
};

export default EditUserDrawer;

const DeleteUserAlertDialog = ({ show, toggleShow, user } : { show : boolean, toggleShow : () => void, user : UserProfile | null }) => {

    const cancelRef = useRef<HTMLButtonElement | null >(null); 

    return (
        <AlertDialog
            isOpen={show}
            leastDestructiveRef={cancelRef}
            onClose={toggleShow}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize={'lg'} fontWeight={'bold'}>
                        {user != null ? `Delete ${user.first_name} ${user.last_name}` : "No User Selected" }
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? You cant undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={toggleShow}>Cancel</Button>
                        <Button colorScheme={'red'} ml={3}>Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
