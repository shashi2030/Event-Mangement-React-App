/**
 * Summary : Edit Vendor
 * Description: Edit Vendor
 * @link: /editvendor
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import { vendorActions } from '../../../actions/vendor.actions';
import { itemActions } from '../../../actions/item.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';
require('./css/editvendor.css');

/**
 * Define constant for the Vendor Form
 */
const vendorform = {
    id: null,
    vendortype: "",
    name: "",
    contact: "",
    email: "",
    description: "",
    items: [],
    submitted: false,
    saveEnable: false,
    errormessage: "",
    alertVisible: false
}

/**
 * @name EditVendor
 * @extends React.Component
 */
class EditVendor extends Component {

    /**
     * State is initialised
     * 1) handle projection field attribute
     * @param {object} props 
     */
    constructor(props) {
        super(props);
        this.state = vendorform;
    }

    /**
     * Description: handleChange will call when vendor change any text boxes or element
     * @param  {event} e
     * @return {null}
     */
    handleChange = (e, type, index) => {
        let { name, value } = e.target;
        if (type) {
            let items = [...this.state.items];
            items[index] = value;
            this.setState({
                items: items
            })
        }
        if (this.state.alertVisible) {
            this.setState({
                [name]: value,
                alertVisible: false
            })
        } else {
            this.setState({
                [name]: value,
            })
        }
    }

    itemOnChange = (e,id,index) =>{

        let items = [...this.state.itemData]
        let checkedItem = {
            id:items[index].id
        }
        
        let selectedItem = [...this.state.items]

        if(e.target.checked){
            selectedItem.push(checkedItem)
        }else{
            let findInd =  selectedItem.findIndex(val=>{
                return val.id === id
            })
            selectedItem.splice(findInd,1)
        }  
              
        this.setState({
            items:selectedItem
        })
    }

    /**
     * Description: handleReset will call when Vendor click on reset 
     * @param  {null}
     * @return {null}
     */
    handleReset = () => {
        let data = this.state.data
        this.setState({
            ...data
        })
    }

    /**
     * Description: Call Get Vendor on Page Load
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        this.getVendor();
        this.itemAPICall();
    }

    /**
     * Description: itemAPICall function to fetch all item data based on parameter
     * @param  {null}
     * @return {null}
     */
    itemAPICall = () => {
        itemActions
            .listItem()
            .then(response => {
                this.setState({
                    itemData: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Description: getVendor function to fetch the Vendor data based on params id
     * @param  {null}
     * @return {null}
     */
    getVendor = () => {
        const id = this.props.match.params.id;
        vendorActions.viewVendor(id).then(response => {
            let newData = response.data
            this.setState({
                ...newData,
                data: response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * Description: handleSubmit will call when vendor update form
     * @param  {event} e
     * @return {null}
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        let { id, vendortype, name, contact, email, items, description } = this.state;
        let vendordata = {
            vendortype: vendortype,
            name: name,
            contact: contact,
            email: email,
            items: items,
            description: description
        };

        if (name && contact) {
            vendorActions.editVendor(id, vendordata).then(response => {
                if (response.status === 200) {
                    this.setState({
                        data: response.data,
                        errormessage: "Data Update Successfully",
                        alertVisible: true
                    })
                }
            }).catch((error) => {
                console.log(error);
            })
        }

    }

    addItem = () => {
        let items = [...this.state.items];
        items.push("");
        this.setState({
            items: items
        })
    }

    deleteItem = (index) => {
        let items = [...this.state.items];
        items.splice(index, 1);
        this.setState({
            items: items
        })

    }

    /**
     * Description: closeAlert Close the Alert Box
     * @param  {null}
     * @return {null}
     */
    closeAlert = () => {
        this.setState({
            alertVisible: false
        })
    }

    /**
     * Description: handleback got to Back on Vendor List 
     * @param  {null}
     * @return {null}
     */
    handleback = () => {
        this.props.history.push('/listvendor');
    }

    compareID = (id) =>{
        let findID = Object.keys(this.state.items).filter((val)=>{
            
            return id === this.state.items[val].id
        })
        return findID.length
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { id, vendortype, name, contact,itemData, email, description, submitted, errormessage } = this.state;
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
                "link": true,
                "href": "/listvendor"
            },
            {
                "id": "editvendor",
                "active": true,
                "label": "Edit Vendor",
                "link": false
            }
        ];
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Edit Vendor</h1>
                <AlertBox isOpen={this.state.alertVisible} toggle={this.onDismiss} closeAlert={this.closeAlert} message={errormessage} />
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="id" sm={3}>Vendor Id</Label>
                                <Col sm={9}>
                                    <p>{id}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={3}>Vendor Name</Label>
                                <Col sm={9}>
                                    <Input type="select" name="vendortype" invalid={submitted && !vendortype} value={vendortype} onChange={this.handleChange} id="vendortype">
                                        <option defaultValue>Select</option>
                                        <option>Cater</option>
                                        <option>DJ</option>
                                        <option>Decoration</option>
                                        <option>Sweets</option>
                                    </Input>
                                    {submitted && !vendortype && <FormFeedback>Select Vendor Type</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input type="text" name="name" invalid={submitted && !name} value={name} id="name" onChange={this.handleChange} placeholder="Enter Vendor Name" />
                                    {submitted && !name && <FormFeedback>Enter Vendor Name</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="contact" sm={3}>Contact No</Label>
                                <Col sm={9}>
                                    <Input type="number" name="contact" invalid={submitted && !contact} value={contact} id="contact" onChange={this.handleChange} placeholder="Enter Contact No" />
                                    {submitted && !contact && <FormFeedback>Enter Contact No.</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input type="email" name="email" value={email} id="email" onChange={this.handleChange} placeholder="Enter Email" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='item' sm={3}>Item</Label>
                                <Col sm={9}>
                                    {itemData && itemData.map((itemObj, ind) => {
                                        
                                            return <FormGroup check inline key={itemObj.id}>
                                                <Label check>
                                                    <Input type="checkbox" checked={this.compareID(itemObj.id)} onChange={(e) => this.itemOnChange(e,itemObj.id,ind)} id={itemObj.id} /> {itemObj.name}
                                                </Label>
                                            </FormGroup>
                                       

                                    })}
                                    </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={3}>Description</Label>
                                <Col sm={9}>
                                    <Input type="textarea" rows="4" name="description" id="description" value={description} onChange={this.handleChange} placeholder="Enter Description" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="submit" onClick={this.handleSubmit} color="primary">Update</Button> {' '}
                                    <Button type="button" onClick={this.handleReset} color="secondary">Reset</Button> {' '}
                                    <Button type="button" onClick={this.handleback} color="secondary">Cancel</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default EditVendor;