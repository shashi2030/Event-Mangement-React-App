import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
export const ModalPopup = (props) => {
    return (
        <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog modal-dialog-centered modal-xl">
            <ModalHeader>Member List</ModalHeader>
            <ModalBody>
                {
                    props.children
                }               
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={props.addSelectedMember}>Add Member</Button>
                <Button color="secondary" onClick={props.closeModal}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}
