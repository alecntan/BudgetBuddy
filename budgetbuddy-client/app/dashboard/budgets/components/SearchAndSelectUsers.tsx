"use client"

import {
Box,
Input,
Card,
CardBody,
Stack,
Text,
StackDivider,
} from '@chakra-ui/react';
import { useState } from 'react';


const SearchAndSelectUsers = () => {

    const [ showList, setShowList ] = useState<boolean>(false);
    
    const handleOnInputFocus = () => {
        setShowList(true);
    };

    const handleOnInputBlur = () => {
        setShowList(false);
    };

    return (
        <Box width={'99%'}>
            <Input position={'relative'} onFocus={handleOnInputFocus} onBlur={handleOnInputBlur}/>
            <Card display={ showList ? 'block' : 'none' } zIndex={'0'} width={'400px'} height={'250px'} variant={'elevated'} position={'absolute'}> 
                <CardBody>
                    <Stack shouldWrapChildren={true} overflow={'scroll'} height={'199px'} direction={'column'} divider={<StackDivider />}>
                        {[...new Array<number>(19)].map((value, index) =>  <Text key={index}>{`${value}`}</Text>)}
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default SearchAndSelectUsers;
