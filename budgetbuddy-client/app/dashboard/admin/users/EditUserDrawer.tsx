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
useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import deleteUserAction from '@/actions/auth/deleteUserAction';

const EditUserDrawer = ({ show, toggleShow, user } : { show : boolean, toggleShow : () => void, user : UserProfile | null }) => {

    const { isOpen, onToggle : toggleAlertDialog } = useDisclosure();

    const toggleDrawerAndDialog = () => {
        toggleAlertDialog();
        toggleShow();
    }

    if( user === null ) {
        return null;
    }

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
                    <DrawerHeader>{`Editing ${user.first_name} ${user.last_name}`}</DrawerHeader>
                    <DrawerBody>
                        <Button colorScheme={'red'} onClick={toggleAlertDialog}>Delete User</Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <DeleteUserAlertDialog show={isOpen} toggleShow={toggleAlertDialog} toggleDrawerAndDialog={toggleDrawerAndDialog} user={user} />
        </>
    );
};

export default EditUserDrawer;

const DeleteUserAlertDialog = ({ show, toggleShow, user, toggleDrawerAndDialog } : { show : boolean, toggleShow : () => void, user : UserProfile | null, toggleDrawerAndDialog : () => void }) => {

    const cancelRef = useRef<HTMLButtonElement | null >(null); 
    const toast = useToast();

    const handleDelete = async () => {
        if( user !== null ) {
            const result = await deleteUserAction(user.id);
            toggleDrawerAndDialog();
            toast({
                title: "Deleted User",
                description: result.message,
                status: result.isError ? "error" : "success",
                duration: 5000,
                isClosable: true
            });
        }
    };

    if( user === null ) {
        return null;
    }

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
                        { "Are you sure? You can't undo this action afterwards." }
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={toggleShow}>Cancel</Button>
                        <Button colorScheme={'red'} ml={3} onClick={handleDelete}>Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
