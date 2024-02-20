"use client"

import {
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalCloseButton,
ModalBody,
ModalFooter,
Button,
} from '@chakra-ui/react';


const EditUserRoleModal = ({ show, toggleShow } : { show : boolean, toggleShow : () => void }) => {
    return (
        <Modal 
            isOpen={show} 
            onClose={toggleShow}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit User Role</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Add checkboxes here
                </ModalBody>
                <ModalFooter>
                    <Button  mr={3} onClick={toggleShow}>Close</Button>
                    <Button colorScheme={'teal'} onClick={toggleShow}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditUserRoleModal;
