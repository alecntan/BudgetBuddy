"use client"

import {
Flex, 
Heading,
Card,
CardHeader,
Text,
CardBody,
} from "@chakra-ui/react";
import { useEffect, useState } from 'react';


import getAllUserProfiles from "@/actions/profiles/getAllUserProfiles";
import { UserProfile } from "@/types/budgetbuddy";
import UserList from "./UserList";

export default function UserPage() {

    const [ allUsers, setAllUsers ] = useState<Array<UserProfile>>([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getAllUserProfiles(0, 10);
            setAllUsers(users);
        };
        getAllUsers();
    }, []);

    return (
        <Flex flexDirection={'column'} width={'100%'}>
            <Card width={'100%'} borderRadius={'10px'} variant={'elevated'}>
                <CardHeader>
                <Heading size={'sm'} marginBottom={'5px'}>Team Members</Heading>
                    <Text>{"Invite or manage your organisation's team members"}</Text>
                </CardHeader>
            </Card>
            <UserList title={'Members'} users={allUsers} />
        </Flex>
    );
}

