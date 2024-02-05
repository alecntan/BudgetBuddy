"use client"

import { 
HStack, 
IconButton,
Text,
} from "@chakra-ui/react";
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';

const PaginationControl = ({ 
    startIndex, offset, onLeftClick, onRightClick } : { startIndex : number, offset:number, onLeftClick: () => void; onRightClick: () => void }) => {
    return (
        <HStack width={'100%'} justifyContent={'center'} alignItems={'center'} spacing={'2'} marginTop={'10px'}>
            <IconButton aria-label={'previous'} icon={<FaArrowLeftLong />} backgroundColor={'white'} onClick={onLeftClick}/>
            <Text fontSize={'xs'}>{ `${startIndex + 1} - ${startIndex + offset}`}</Text>
            <IconButton aria-label={'next'} icon={<FaArrowRightLong />} backgroundColor={"white"} onClick={onRightClick}/>
        </HStack>
    );
};

export default PaginationControl;
