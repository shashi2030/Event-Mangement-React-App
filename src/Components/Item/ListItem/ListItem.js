/**
 * Summary : Edit Item
 * Description: Edit Item
 * @link: /edititem
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import Grid from '../../Common/Grid/Grid';
import { itemActions } from '../../../actions/item.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';

/**
 * Define Constant of Table column Definition
 */
const colDef = {
    "id": { "label": "ID", 'sort': false, "display": true },
    "name": { "label": "Item Name", 'sort': true, "display": true },
    "description": { "label": "Description", 'sort': true, "display": true },
    "options": {
        "label": "Options","class":"options", 'sort': true, "display": true, "list": [
            { "action": "view", "label": "View" },
            { "action": "edit", "label": "Edit" },
            { "action": "delete", "label": "Delete" }
        ]
    }
}

/**
 * @name ListItem
 * @extends React.Component
 */
class ListItem extends Component {

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
     * Description: Call itemAPICall function for fetch all item list data
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        this.itemAPICall();
    }

    /**
     * Description: itemAPICall function to fetch all item data based on parameter
     * @param  {null}
     * @return {null}
     */
    itemAPICall = () => {
        let data = {
            pageNo: this.state.currentPage,
            pageLimit: this.state.countPerPage
        }
        itemActions
            .listItem(data)
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
            this.itemAPICall();
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
            this.itemAPICall();
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
            this.itemAPICall();
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
                this.itemDelete(id, index);
                break;
            case 'edit':
                this.itemEdit(id);
                break;
            case 'view':
                this.itemView(id);
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
    itemDelete = (id, index) => {
        this.setState({
            modal: true,
            confirmDeleteId: id,
            deleteIndex: index
        })
    }

    /**
     * Description: Go to the view page based on the click of item
     * @param {number} id
     * @return {null}
     */
    itemView = (id) => {
        this.props.history.push('/viewitem/' + id);
    }

    /**
     * Description: Go to the edit item page based on the click of item
     * @param {number} id
     * @return {null}
     */
    itemEdit = (id) => {
        this.props.history.push('/edititem/' + id);
    }

    /**
     * Description: API call for Delete item and update data locally with delete the particular item
     * @param {null}
     * @return {null}
     */
    confirmDelete = () => {
        let itemId = this.state.confirmDeleteId;
        itemActions.deleteItem(itemId)
            .then(response => {
                if (response.status === 200) {
                    let newData = [...this.state.data];
                    newData.splice(this.state.deleteIndex, 1);
                    this.setState({
                        data: newData,
                        confirmDeleteId: null,
                        alertMessage: "Delete Item Successfully",
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
     * Description: Go to the Create Item Page
     * @param {null}
     * @return {null}
     */
    createItem = () => {
        this.props.history.push('/createitem');
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
                "id": "listitem",
                "active": false,
                "label": "Item List",
                "link": false
            }
        ]
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Item List</h1>
                <AlertBox isOpen={this.state.alertVisible} toggle={this.onDismiss} closeAlert={this.closeAlert} message={this.state.alertMessage} />
                <div className="button-row text-right">
                    <Button type="button" onClick={this.createItem} color="primary">Create Item</Button>
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

export default ListItem;