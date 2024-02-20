"use client"

import { UserProfile, UserRole } from "@/types/budgetbuddy";
import { 
Flex,
Card,
CardHeader,
Heading,
CardBody,
Stack,
StackDivider,
IconButton,
Badge,
Button,
Center,
CircularProgress,
useDisclosure,
Menu,
MenuButton,
MenuList,
MenuItem,
useToast,
AlertDialog,
AlertDialogOverlay,
AlertDialogContent,
AlertDialogHeader,
AlertDialogBody,
AlertDialogFooter,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { MdModeEdit } from 'react-icons/md';
import deleteUserAction from "@/actions/auth/deleteUserAction";
import EditUserRoleModal from "./EditUserRoleModal";

const UserList = ({ title, users, onReload } : {title: string, users : Array<UserProfile>, onReload: () => void })  => {

    const { isOpen : isDeleteDialogOpen, onToggle : toggleDeleteDialog } = useDisclosure();
    const { isOpen : isEditRoleModalOpen, onToggle : toggleEditRoleModal } = useDisclosure();
    const [ selectedUser, setSelectedUser ] = useState<UserProfile | null>(null);

    const handleUserDelete = ( user : UserProfile ) => {
        setSelectedUser(user);
        toggleDeleteDialog();
    };

    const handleEditUserRole = ( user : UserProfile ) => {
        toggleEditRoleModal();
    }

    return (
        <>
            <Card width={'100%'} variant={'elevated'} marginTop={'10px'}>
                <CardHeader borderBottom={'solid'} borderBottomWidth={'2px'} borderColor={'#f5f5f5'}>
                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                        <Heading size={'sm'}>{title}</Heading>
                        <Button size={'sm'} onClick={onReload}>Reload</Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing={'4'}>
                    { users.length > 0 ? ( users.map( ( user, index ) => (<UserItem key={index} userInfo={user} onUserDelete={handleUserDelete} onEditRole={handleEditUserRole} />)) ) : <Loading /> }
                    </Stack> 
                </CardBody>
            </Card>
            <DeleteUserAlertDialog show={isDeleteDialogOpen} toggleShow={toggleDeleteDialog} user={selectedUser} />
            <EditUserRoleModal show={isEditRoleModalOpen} toggleShow={toggleEditRoleModal} />
        </>
    );
};

const DeleteUserAlertDialog = ({ show, toggleShow, user } : { show : boolean, toggleShow : () => void, user : UserProfile | null }) => {
   
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    const toast = useToast();

    if( user === null ) {
        return null;
    }

    const handleDelete = async () => {
        if( user !== null ) {
            const result = await deleteUserAction(user.id);
            toggleShow();
            toast({
                title: "Deleted User",
                description: result.message,
                status: result.isError ? "error" : "success",
                duration: 5000,
                isClosable: true
            });
        }
    };

    return (
        <AlertDialog
            isOpen={show}
            leastDestructiveRef={cancelRef}
            onClose={toggleShow}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize={'lg'} fontWeight={'bold'}>
                       {`Delete ${user.first_name} ${user.last_name}`} 
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        {"Are you sure? You can't undo this action afterwards."}
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

const Loading = () => {
    return (
        <Center width={'100%'}>
            <CircularProgress isIndeterminate size={'70px'} />
        </Center>
    );    
};

const UserItem = ({ userInfo, onUserDelete, onEditRole } : { userInfo : UserProfile, onUserDelete: ( user : UserProfile ) => void, onEditRole: ( user : UserProfile) => void }) => {

    const getRoleBadgeColor = ( role : UserRole ) => {
        switch( role ) {
            case "admin" :
                return "purple";
            case "director":
                return "red";
            case "manager":
                return "blue";
            case "associate":
                return "green";
        }
    };

    const handleUserDelete = () => {
        onUserDelete(userInfo);
    };

    const handleEditUserRole = () => {
        onEditRole(userInfo);
    }

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Heading width={'200px'} size={'sm'}>{`${userInfo.first_name} ${userInfo.last_name}`}</Heading>
            <Badge colorScheme={getRoleBadgeColor(userInfo.user_role)} variant={'subtle'}>{userInfo.user_role}</Badge>
            <Menu>
                <MenuButton backgroundColor={'white'} as={IconButton} aria-label={'edit user'} icon={<MdModeEdit size={'20px'} />} />
                <MenuList>
                    <MenuItem onClick={handleEditUserRole}>Edit Role</MenuItem>
                    <MenuItem color={'red'} onClick={handleUserDelete}>Delete</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default UserList;
