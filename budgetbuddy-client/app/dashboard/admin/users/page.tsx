"use client"

import {
Flex, 
Heading,
Card,
CardHeader,
Text,
Stack,
IconButton,
useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from 'react';


import getAllUserProfiles from "@/actions/profiles/getAllUserProfiles";
import getNumUsers from "@/actions/profiles/getNumOfUsers";
import { UserProfile } from "@/types/budgetbuddy";
import UserList from "./UserList";
import PaginationControl from './PaginationControls';
import SearchUsers  from "./SearchUsers";
import InviteUserDrawer from "./InviteUserDrawer"; 
import { FaUserPlus } from 'react-icons/fa';

export default function UserPage() {

    const [ newUserFlag, setNewUserFlag ] = useState<boolean>(false);
    const handleNewUser = () => {
        setNewUserFlag((flag : boolean ) => !flag);
    };


    const [ allUsers, setAllUsers ] = useState<Array<UserProfile>>([]);
    const [ numOfUsers, setNumOfUsers ] = useState<number>(0);
    const [ startingIndex, setStartingIndex ] = useState<number>(0);
    const NUM_USER_PER_PAGE = 10;

    const handleLeftClick = () => {
        if( startingIndex >= NUM_USER_PER_PAGE ) {
            setStartingIndex((currIndex) => currIndex - NUM_USER_PER_PAGE);
        }
    };

    const handleRightClick = () => {
        if( startingIndex + NUM_USER_PER_PAGE <= numOfUsers ) {
            setStartingIndex((currIndex) => currIndex + NUM_USER_PER_PAGE);
        }
    }

    const [ searchQuery, setSearchQuery ] = useState<{ name : string; roles: ( string | number )[]}>({ name : "", roles: ["admin", "director", "manager", "associate"]});
    const handleOnSearch = ( params : { name : string; roles: ( string | number )[] }) => {
        setSearchQuery(params);
    };

    useEffect(() => {
     const getNumOfUsers = async () => {
            const count = await getNumUsers(searchQuery);
            setNumOfUsers(count);
        };
        console.log('Fetching Num of Users');
        getNumOfUsers();
    }, [searchQuery, newUserFlag]);

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getAllUserProfiles( searchQuery, startingIndex, startingIndex + NUM_USER_PER_PAGE - 1);
            setAllUsers(users);
        };

        console.log('Fetching Users');
       getAllUsers();
    }, [startingIndex, searchQuery, newUserFlag]);

    
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Flex flexDirection={'column'} width={'100%'}>
            <Card marginBottom={'10px'} width={'100%'} borderRadius={'10px'} variant={'elevated'}>
                <CardHeader>
                    <Flex width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'column'} spacing={'5px'}>
                            <Heading size={'sm'} marginBottom={'5px'}>Team Members</Heading>
                            <Text>{"Invite or manage your organisation's team members"}</Text>
                        </Stack>
                        <IconButton onClick={onToggle} size={'sm'} icon={<FaUserPlus />} aria-label={'invite user'} colorScheme={'teal'} />
                    </Flex>
                </CardHeader>
            </Card>
            <SearchUsers onSubmit={handleOnSearch} />
            <UserList title={'Members'} users={allUsers} />
            <PaginationControl startIndex={startingIndex} offset={NUM_USER_PER_PAGE} onLeftClick={handleLeftClick} onRightClick={handleRightClick} />
            <InviteUserDrawer show={isOpen} toggleShow={onToggle} onSuccess={handleNewUser} />
        </Flex>
    );
}

