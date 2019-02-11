import React, { Component } from 'react';
import Grid from '../../Common/Grid/Grid';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { userActions } from '../../../actions/users.actions';
import { vendorActions } from '../../../actions/vendor.actions';
import { itemActions } from '../../../actions/item.actions';
require('./eventpopup.css');

/**
 * Define Constant of Table column Definition
 */
const colDefUser = {
    "id": { "label": "ID", 'sort': false, "display": true },
    "username": { "label": "User Name", 'sort': true, "display": true },
    "buildingname": { "label": "Building Name", 'sort': true, "display": true },
    "flatno": { "label": "Flat No", 'sort': true, "display": true }
}

/**
 * Define Constant of Table column Definition
 */
const colDefVendor = {
    "id": { "label": "ID", 'sort': false, "display": true },
    "vendortype": { "label": "Vendor Type", 'sort': true, "display": true },
    "name": { "label": "Vendor Name", 'sort': true, "display": true },
    "contact": { "label": "Contact No.", 'sort': true, "display": true },
    "email": { "label": "Email", 'sort': true, "display": true },
    "items": { "label": "Items", 'sort': true, "display": true },
    "description": { "label": "Description", 'sort': true, "display": true }
}

class EventPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        switch (this.props.type) {
            case 'members':
                this.userAPICall();
                break;
            case 'vendor':
                this.vendorAPICall();
                break;
            default:

        }
    }

    /**
     * Description: userAPICall function to fetch all user data based on parameter
     * @param  {null}
     * @return {null}
     */
    userAPICall = () => {
        let data = {
            filterId: this.createIdString()
        }
        userActions
            .listUser(data)
            .then(response => {
                this.setState({
                    data: response.data,
                    colDef: colDefUser
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Description: vendorAPICall function to fetch all vendor data based on parameter
     * @param  {null}
     * @return {null}
     */
    vendorAPICall = () => {
        let data = {
            filterId: this.createIdString()
        }
        vendorActions
            .listVendor(data)
            .then(response => {
                console.log(response.data)
                this.setState({
                    data: response.data,
                    colDef: colDefVendor
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Description: itemAPICall function to fetch all item data based on parameter
     * @param  {null}
     * @return {null}
     */
    itemAPICall = (id) => {
        let data = {
            filterId: id
        }
        itemActions
            .listItem(data)
            .then(response => {
                console.log(response.data)
                this.setState({
                    itemList: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    createIdString = () => {
        let data = this.props.data;
        let output = '';
        if (this.props.type === 'members') {
            data.map(val => {
                output += 'id=' + val + '&'
            })
        } else if (this.props.type === 'vendor') {
            Object.keys(data).map((val, ind) => {
                output += 'id=' + data[val].id + '&'
            })
        }
        return output;
    }

    popupAction = (id, type, index) => {
        let actualItems = this.state.data[index].items;
        let output = '';
        actualItems.map(val => {
            output += 'id=' + val.id + '&'
        })
        this.itemAPICall(output)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.popupOpen} className="modal-dialog modal-dialog-centered modal-xl">
                    <ModalHeader toggle={this.toggle}>{this.props.heading}</ModalHeader>
                    <ModalBody>
                        <div className="table-grid">
                            <Grid
                                data={this.state.data}
                                colDef={this.state.colDef}
                                popupAction={this.popupAction}
                            />
                        </div>
                        <ul className="item-list-popup">
                        {
                            this.state.itemList && this.state.itemList.map((val,ind)=>{
                                return <li key={ind}>{val.name}</li>
                            })
                        }
                        </ul>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.closeEventPopup}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
export default EventPopup;