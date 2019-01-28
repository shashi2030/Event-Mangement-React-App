/**
 * Summary : Vendor List
 * Description: Display All Vendor List 
 * @link: /listvendor
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import Grid from '../../Common/Grid/Grid';
import { vendorActions } from '../../../actions/vendor.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';

/**
 * Define Constant of Table column Definition
 */
const colDef = {
    "id": { "label": "ID", 'sort': false, "display": true },
    "name": { "label": "Vendor Name", 'sort': true, "display": true },
    "contact": { "label": "Contact No.", 'sort': true, "display": true },
    "email": { "label": "Email", 'sort': true, "display": true },
    "description": { "label": "Description", 'sort': true, "display": true },
    "options": {
        "label": "Options","class":"options", "sort": true, "display": true, "list": [
            { "action": "view", "label": "View" },
            { "action": "edit", "label": "Edit" },
            { "action": "delete", "label": "Delete" }
        ]
    }
}

/**
 * @name ListVendor
 * @extends React.Component
 */
class ListVendor extends Component {

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
            alertVisible: false
        }
    }
    /**
     * Description: Call vendorAPICall function for fetch all vendor list data
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        this.vendorAPICall();
    }

    /**
     * Description: vendorAPICall function to fetch all vendor data based on parameter
     * @param  {null}
     * @return {null}
     */
    vendorAPICall = () => {
        let data = {
            pageNo: this.state.currentPage,
            pageLimit: this.state.countPerPage
        }
        vendorActions
            .listVendor(data)
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
            this.vendorAPICall();
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
            this.vendorAPICall();
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
            this.vendorAPICall();
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
                this.vendorDelete(id, index);
                break;
            case 'edit':
                this.vendorEdit(id);
                break;
            case 'view':
                this.vendorView(id);
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
    vendorDelete = (id, index) => {
        this.setState({
            modal: true,
            confirmDeleteId: id,
            deleteIndex: index
        })
    }

    /**
     * Description: Go to the view page based on the click of vendor
     * @param {number} id
     * @return {null}
     */
    vendorView = (id) => {
        this.props.history.push('/viewvendor/' + id);
    }

    /**
     * Description: Go to the edit vendor page based on the click of vendor
     * @param {number} id
     * @return {null}
     */
    vendorEdit = (id) => {
        this.props.history.push('/editvendor/' + id);
    }

    /**
     * Description: API call for Delete Vendor and update data locally with delete the particular Vendor
     * @param {null}
     * @return {null}
     */
    confirmDelete = () => {
        let vendorId = this.state.confirmDeleteId;
        vendorActions.deleteVendor(vendorId)
            .then(response => {
                if (response.status === 200) {
                    let newData = [...this.state.data];
                    newData.splice(this.state.deleteIndex, 1);
                    this.setState({
                        data: newData,
                        confirmDeleteId: null,
                        alertMessage: "Delete Vendor Successfully",
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
     * Description: Go to the Create Vendor Page
     * @param {null}
     * @return {null}
     */
    createVendor = () => {
        this.props.history.push('/createvendor');
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
                "id": "listvendor",
                "active": false,
                "label": "Vendor List",
                "link": false
            }
        ]
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Vendor List</h1>
                <AlertBox isOpen={this.state.alertVisible} toggle={this.onDismiss} closeAlert={this.closeAlert} message={this.state.alertMessage} />
                <div className="button-row text-right">
                    <Button type="button" onClick={this.createVendor} color="primary">Create Vendor</Button>
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

export default ListVendor;