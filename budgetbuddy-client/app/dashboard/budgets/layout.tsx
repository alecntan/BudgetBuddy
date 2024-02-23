"use client"

import {
Flex,
} from '@chakra-ui/react';

export default function BudgetsLayout({ children } : { children : React.ReactNode }) {
    return (
        <Flex 
            paddingBottom={'250px'} 
            maxWidth={'1200px'} 
            width={'100%'} 
            marginTop={'30px'} 
            flexDirection={'column'} 
            justifyContent={'space-between'} 
            alignItems={'center'}
        >
            { children }
        </Flex>
    );
}
