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
import { UserProfile } from "@/types/budgetbuddy";

export default function UserPage() {

    const [ allUsers, setAllUsers ] = useState<Array<UserProfile>>([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getAllUserProfiles(0, 10);
            console.log(users);
            setAllUsers(users);
        };
        getAllUsers();
    }, []);

    return (
        <Flex width={'100%'}>
            <Card width={'100%'} borderRadius={'10px'} variant={'elevated'}>
                <CardHeader>
                    <Heading size={'sm'} marginBottom={'5px'}>Team Members</Heading>
                    <Text>{"Invite or manage your organisation's team members"}</Text>
                </CardHeader>
            </Card>
        </Flex>
    );
}
