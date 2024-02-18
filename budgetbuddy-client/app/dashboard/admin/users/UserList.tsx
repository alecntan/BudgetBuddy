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
CircularProgress
} from '@chakra-ui/react';
import { MdModeEdit } from 'react-icons/md';

const UserList = ({ title, users, onReload } : {title: string, users : Array<UserProfile>, onReload: () => void })  => {

    const onUserEdit = ( userInfo : UserProfile ) => {
        console.log(userInfo);
    };

    return (
        <Card width={'100%'} variant={'elevated'} marginTop={'10px'}>
            <CardHeader borderBottom={'solid'} borderBottomWidth={'2px'} borderColor={'#f5f5f5'}>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Heading size={'sm'}>{title}</Heading>
                    <Button size={'sm'} onClick={onReload}>Reload</Button>
                </Flex>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing={'4'}>
                { users.length > 0 ? ( users.map( ( user, index ) => (<UserItem key={index} userInfo={user} onUserEdit={onUserEdit} />)) ) : <Loading /> }
                </Stack> 
            </CardBody>
        </Card>
    );
};

const Loading = () => {
    return (
        <Center width={'100%'}>
            <CircularProgress isIndeterminate size={'70px'} />
        </Center>
    );    
};

const UserItem = ({ userInfo, onUserEdit } : { userInfo : UserProfile, onUserEdit: ( user : UserProfile ) => void }) => {

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

    const handleUserEdit = () => {
        onUserEdit(userInfo);
    };

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Heading width={'200px'} size={'sm'}>{`${userInfo.first_name} ${userInfo.last_name}`}</Heading>
                <Badge colorScheme={getRoleBadgeColor(userInfo.user_role)} variant={'subtle'}>{userInfo.user_role}</Badge>
                <IconButton onClick={handleUserEdit}  backgroundColor={'white'} aria-label={'edit User'} icon={<MdModeEdit size={'20px'} />} />
        </Flex>
    );
};

export default UserList;
