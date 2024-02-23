"use client"

import {
Heading,
Flex,
Button,
useDisclosure,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import NewBudgetDrawer from './components/NewBudgetDrawer';
import RestrictedComponent from '@/components/RestrictedComponent';

export default function Budgets() {

    return (
        <RestrictedComponent roles={['admin', 'director']} fallback={<HeaderOnly />}>
            <HeaderWithNewBudgetButton />
        </RestrictedComponent>
    );
}


const HeaderWithNewBudgetButton = () => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <>
            <Flex width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                <Heading size={'md'}>Budgets</Heading>
                <Button onClick={onToggle} size={'sm'} colorScheme={'teal'} leftIcon={<FaPlus/>}>New</Button>
            </Flex>
            <NewBudgetDrawer show={isOpen} toggleShow={onToggle} />
        </>
    );
}

const HeaderOnly = () => {
    return (
        <Flex width={'100%'} justifyContent={'flex-start'} alignItems={'center'}>
            <Heading size={'md'}>Budgets</Heading>
        </Flex>
    );
};
