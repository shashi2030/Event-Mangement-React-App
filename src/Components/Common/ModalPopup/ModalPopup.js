import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

class ModalPopup extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-dialog modal-dialog-centered modal-xl">
                <ModalHeader>Member List</ModalHeader>
                <ModalBody>
                    {
                        this.props.children
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.addSelectedMember}>Add Member</Button>
                    <Button color="secondary" onClick={this.props.closeModal}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ModalPopup;