"use client"

import {
Flex, 
Heading,
Card,
CardHeader,
Text,
} from "@chakra-ui/react";
import { useEffect, useState } from 'react';


import getAllUserProfiles from "@/actions/profiles/getAllUserProfiles";
import getNumUsers from "@/actions/profiles/getNumOfUsers";
import { UserProfile } from "@/types/budgetbuddy";
import UserList from "./UserList";
import PaginationControl from './PaginationControls';

export default function UserPage() {

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

    useEffect(() => {
     const getNumOfUsers = async () => {
            const count = await getNumUsers();
            setNumOfUsers(count);
        };
        getNumOfUsers();
    });

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getAllUserProfiles(startingIndex, startingIndex + NUM_USER_PER_PAGE - 1);
            setAllUsers(users);
        };
       getAllUsers();
    }, [startingIndex]);

    return (
        <Flex flexDirection={'column'} width={'100%'}>
            <Card width={'100%'} borderRadius={'10px'} variant={'elevated'}>
                <CardHeader>
                <Heading size={'sm'} marginBottom={'5px'}>Team Members</Heading>
                    <Text>{"Invite or manage your organisation's team members"}</Text>
                </CardHeader>
            </Card>
            <UserList title={'Members'} users={allUsers} />
            <PaginationControl startIndex={startingIndex} offset={NUM_USER_PER_PAGE} onLeftClick={handleLeftClick} onRightClick={handleRightClick} />
        </Flex>
    );
}

