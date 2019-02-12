/**
 * Summary : Event List
 * Description: Display All Event List 
 * @link: /listevent
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import Grid from '../../Common/Grid/Grid';
import { eventActions } from '../../../actions/event.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';
import EventPopup from './EventPopup';

/**
 * Define Constant of Table column Definition
 */
const colDef = {
    "id": { "label": "ID", 'sort': false, "display": true },
    "name": { "label": "Event Name", 'sort': true, "display": true },
    "date": { "label": "Event Date", 'sort': true, "display": true },
    "members": { "label": "Members", 'sort': true, "display": true },
    "vendor": { "label": "Vendor", 'sort': true, "display": true },
    "totalprice": { "label": "Total Price", 'sort': true, "display": true },
    "totalcollection": { "label": "Total Collection", 'sort': true, "display": true },
    "description": { "label": "Description", 'sort': true, "display": true },
    "options": {
        "label": "Options", "class": "options", 'sort': true, "display": true, "list": [
            { "action": "edit", "label": "Edit" },
            { "action": "delete", "label": "Delete" }
        ]
    }
}

/**
 * @name ListEvent
 * @extends React.Component
 */
class ListEvent extends Component {

    /**
     * State is initialised
     * 1) handle projection field attribute
     * @param {object} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            currentPage: 1,
            countPerPage: 5,
            totalDataCount: 0,
            modal: false,
            confirmDeleteId: null,
            alertMessage: "",
            alertVisible: false,
            popup: false
        }
    }
    /**
     * Description: Call eventAPICall function for fetch all event list data
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        this.eventAPICall();
    }

    /**
     * Description: eventAPICall function to fetch all event data based on parameter
     * @param  {null}
     * @return {null}
     */
    eventAPICall = () => {
        let data = {
            id: this.state.currentPage,
            pageLimit: this.state.countPerPage
        }
        eventActions
            .listEvent(data)
            .then(response => {
                this.setState({
                    data: response.data,
                    totalDataCount: response.headers["x-total-count"]
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Description: Click on Pagination Get the API call for the particular page number data
     * @param  {event} e
     * @return {null}
     */
    pagingClick = (e) => {
        this.setState({
            currentPage: e.target.id
        }, () => {
            this.eventAPICall();
        })
    }

    /**
     * Description: Click on the next for the next page
     * @param  {null}
     * @return {null}
     */
    nextPage = () => {
        this.setState({
            currentPage: parseInt(this.state.currentPage) + 1
        }, () => {
            this.eventAPICall();
        })
    }

    /**
    * Description: Click on the previous for the previous page
    * @param  {null}
    * @return {null}
    */
    prevPage = () => {
        this.setState({
            currentPage: this.state.currentPage - 1
        }, () => {
            this.eventAPICall();
        })
    }

    /**
    * Description: Call action function based on click of action button 
    * @param {number} id
    * @param {string} action
    * @param {number} index
    * @return {null}
    */
    actionType = (id, action, index) => {
        switch (action) {
            case 'delete':
                this.eventDelete(id, index);
                break;
            case 'edit':
                this.eventEdit(id);
                break;
            case 'view':
                this.eventView(id);
                break;
            default:
        }
    }

    /**
     * Description: Open Popup modal for confirm the delete data
     * @param {number} id
     * @param {number} index
     * @return {null}
     */
    eventDelete = (id, index) => {
        this.setState({
            modal: true,
            confirmDeleteId: id,
            deleteIndex: index
        })
    }

    /**
     * Description: Go to the view page based on the click of event
     * @param {number} id
     * @return {null}
     */
    eventView = (id) => {
        this.props.history.push('/viewevent/' + id);
    }

    /**
     * Description: Go to the edit event page based on the click of event
     * @param {number} id
     * @return {null}
     */
    eventEdit = (id) => {
        this.props.history.push('/editevent/' + id);
    }

    /**
     * Description: API call for Delete Event and update data locally with delete the particular event
     * @param {null}
     * @return {null}
     */
    confirmDelete = () => {
        let eventId = this.state.confirmDeleteId;
        eventActions.deleteEvent(eventId)
            .then(response => {
                if (response.status === 200) {
                    let newData = [...this.state.data];
                    newData.splice(this.state.deleteIndex, 1);
                    this.setState({
                        data: newData,
                        confirmDeleteId: null,
                        alertMessage: "Delete Event Successfully",
                        alertVisible: true,
                        modal: false
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Description: Close Popup Model
     * @param {null}
     * @return {null}
     */
    closeModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    /**
     * Description: Close Alert Box
     * @param {null}
     * @return {null}
     */
    closeAlert = () => {
        this.setState({
            alertVisible: false
        })
    }

    /**
     * Description: Go to the Create Event Page
     * @param {null}
     * @return {null}
     */
    createEvent = () => {
        this.props.history.push('/createevent');
    }

    popupAction = (id, type, index) => {
        let data = this.state.data[index];
        switch (type) {
            case 'members':
                this.setState({
                    popupData: {
                        data: data.members,
                        type: type,
                        title: 'Member List'
                    },
                    popup: !this.state.popup
                })
                break;
            case 'vendor':
                this.setState({
                    popupData: {
                        data: data.vendor,
                        type: type,
                        title: 'Vendor List'
                    },
                    popup: !this.state.popup
                })
                break;
            default:

        }
    }

    closeEventPopup = () => {
        this.setState({
            popup: !this.state.popup
        })
    }


    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const breadcrumbdata = [
            {
                "id": "home",
                "active": false,
                "label": "Home",
                "link": true,
                "href": "/home"
            },
            {
                "id": "listevent",
                "active": false,
                "label": "Event List",
                "link": false
            }
        ]
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Event List</h1>
                <AlertBox isOpen={this.state.alertVisible} toggle={this.onDismiss} closeAlert={this.closeAlert} message={this.state.alertMessage} />
                {this.state.popup && <EventPopup
                    popupOpen={this.state.popup}
                    closeEventPopup={this.closeEventPopup}
                    data={this.state.popupData.data}
                    type={this.state.popupData.type}
                    heading={this.state.popupData.title}
                />}
                <div className="button-row text-right">
                    <Button type="button" onClick={this.createEvent} color="primary">Create Event</Button>
                </div>
                <div className="table-grid">
                    <Grid
                        data={this.state.data}
                        colDef={colDef}
                        currentPage={this.state.currentPage}
                        countPerPage={this.state.countPerPage}
                        pagingClick={this.pagingClick}
                        totalDataCount={this.state.totalDataCount}
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}
                        actionType={this.actionType}
                        popupAction={this.popupAction}
                    />
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog modal-dialog-centered">
                    <ModalHeader toggle={this.toggle}>Do you want to delete</ModalHeader>
                    <ModalFooter className="text-center">
                        <Button color="danger" onClick={this.confirmDelete}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Layout>
        )
    }
}

export default ListEvent;