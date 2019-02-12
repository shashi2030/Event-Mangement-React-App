import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

class ModalPopup extends Component {
    footerRender = () =>{
        let data = '';
        switch(this.props.popupType){
            case 'member':
            data = (<ModalFooter><Button color="primary" onClick={this.props.addSelectedMember}>Add Member</Button>
            <Button color="secondary" onClick={this.props.closeModal}>Close</Button> </ModalFooter>)
            break;
            case 'vendor':
            data = (<ModalFooter>
                <Button color="primary" onClick={this.props.addSelectedVendor}>Add Vendor</Button>
                <Button color="secondary" onClick={this.props.closeModal}>Close</Button>
            </ModalFooter>)
            break;
            default:
        }
        return data;
    }
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-dialog modal-dialog-centered modal-xl">
                <ModalHeader>{this.props.heading}</ModalHeader>
                <ModalBody>
                    {
                        this.props.children
                    }
                </ModalBody>
               {this.footerRender()}
            </Modal>
        )
    }
}
export default ModalPopup;