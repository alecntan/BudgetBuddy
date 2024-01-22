"use client"

import { Heading } from "@chakra-ui/react";
import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function DashboardPage() {

    const user = useContext(UserContext);

    return <Heading>{ user ? user.email : "Not Found" } </Heading>
}
