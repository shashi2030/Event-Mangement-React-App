/**
 * Summary : Create Vendor
 * Description: Create Vendor
 * @link: /createvendor
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import { vendorActions } from '../../../actions/vendor.actions';
import { itemActions } from '../../../actions/item.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';

/**
 * Define constant for the Vendor Form
 */
const vendorform = {
    vendortype: "",
    name: "",
    contact: "",
    email: "",
    itemList: [],
    description: "",
    submitted: false,
    saveEnable: false,
    errormessage: "",
    alertVisible: false
}

/**
 * @name CreateVendor
 * @extends React.Component
 */
class CreateVendor extends Component {
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
     * Description: handleChange will call when Vendor type any text boxes or element
     * @param  {event} e
     * @return {null}
     */
    handleChange = (e) => {
        let { name, value } = e.target;
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

    componentDidMount() {
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
     * Description: handleSubmit will call when vendor submit form
     * @param  {event} e
     * @return {null}
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        let { name, contact, email, itemList, description, vendortype } = this.state;
        let vendordata = {
            vendortype: vendortype,
            name: name,
            contact: contact,
            email: email,
            items: itemList,
            description: description
        };
        if (name && contact && itemList.length) {
            vendorActions.createVendor(vendordata).then(response => {
                if (response.status === 201) {
                    this.setState({
                        ...vendorform,
                        errormessage: "Data Create Successfully",
                        alertVisible: true
                    })
                }
            }).catch((error) => {
                console.log(error);
            })
        }

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
   
    itemOnChange = (e,id,index) =>{
        let items = [...this.state.itemData]
        let checkedItem = {
            id:items[index].id
        }
        let selectedItem = [...this.state.itemList]

        if(e.target.checked){
            selectedItem.push(checkedItem)
        }else{
            let findInd =  selectedItem.findIndex(val=>{
                return val.id === id
            })
            selectedItem.splice(findInd,1)
        }        
        this.setState({
            itemList:selectedItem
        })
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { name, contact, email, itemList, itemData, description, submitted, errormessage, vendortype } = this.state;
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
                "id": "createvendor",
                "active": true,
                "label": "Create Vendor",
                "link": false
            }
        ]
        const creatButtonActive = () => {
            let isActive = false;
            if (!name && !contact && !email && !description && !vendortype && !itemList.length) {
                isActive = true;
            }
            return isActive;
        }
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Create Vendor</h1>
                <AlertBox isOpen={this.state.alertVisible} toggle={this.onDismiss} closeAlert={this.closeAlert} message={errormessage} />
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="name" sm={3}>Vendor Type</Label>
                                <Col sm={9}>
                                    <Input type="select" name="vendortype" invalid={submitted && !vendortype} value={vendortype} onChange={this.handleChange} id="vendortype">
                                        <option defaultValue>Select</option>
                                        <option>type 1</option>
                                        <option>type 2</option>
                                        <option>type 3</option>
                                        <option>type 4</option>
                                    </Input>
                                    {submitted && !vendortype && <FormFeedback>Select Vendor Type</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={3}>Vendor Name</Label>
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
                                                    <Input type="checkbox" onChange={(e) => this.itemOnChange(e,itemObj.id,ind)} id={itemObj.id} /> {itemObj.name}
                                                </Label>
                                            </FormGroup>
                                       

                                    })}

                                    {/* <InputGroup>
                                        <Input type="text" name='item' value={item} invalid={submitted && itemList.length===0}  id='item' onChange={this.handleChange} placeholder="Enter Item Name" />                                        
                                        <InputGroupAddon addonType="append">
                                            <Button type="button" color="secondary" disabled={item === ""} onClick={this.addItem}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                                        </InputGroupAddon>
                                    </InputGroup>                                    
                                    <ul className="member-list">                                    
                                    {
                                        this.state.itemList &&  this.state.itemList.map((item,index)=>{
                                            return <li key={index}>{item} <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteItem(index)}></i></li>
                                        })
                                    }
                                    </ul> */}
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
                                    <Button type="submit" disabled={creatButtonActive()} onClick={this.handleSubmit} color="primary">Create</Button> {' '}
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

export default CreateVendor;