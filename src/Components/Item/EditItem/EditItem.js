/**
 * Summary : Edit Item
 * Description: Edit Item
 * @link: /edititem
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import { itemActions } from '../../../actions/item.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';

/**
 * Define constant for the Item Form
 */
const itemform = {
    id: null,
    name: "",
    description: "",
    submitted: false,
    saveEnable: false,
    errormessage: "",
    alertVisible: false
}

/**
 * @name EditItem
 * @extends React.Component
 */
class EditItem extends Component {

    /**
     * State is initialised
     * 1) handle projection field attribute
     * @param {object} props 
     */
    constructor(props) {
        super(props);
        this.state = itemform;
    }

    /**
     * Description: handleChange will call when item change any text boxes or element
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

    /**
     * Description: handleReset will call when item click on reset 
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
     * Description: Call Get Item on Page Load
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        this.getItem();
    }

    /**
     * Description: getItem function to fetch the item data based on params id
     * @param  {null}
     * @return {null}
     */
    getItem = () => {
        const id = this.props.match.params.id;
        itemActions.viewItem(id).then(response => {
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
     * Description: handleSubmit will call when item update form
     * @param  {event} e
     * @return {null}
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        let { id, name, description } = this.state;
        let itemdata = {
            name: name,
            description: description
        };

        if (name) {
            itemActions.editItem(id, itemdata).then(response => {
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
     * Description: handleback got to Back on User List 
     * @param  {null}
     * @return {null}
     */
    handleback = () => {
        this.props.history.push('/listitem');
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { id, name, description, submitted, errormessage } = this.state;
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
                "link": true,
                "href": "/listitem"
            },
            {
                "id": "edititem",
                "active": true,
                "label": "Edit Item",
                "link": false
            }
        ];
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Edit Item</h1>
                <AlertBox isOpen={this.state.alertVisible} toggle={this.onDismiss} closeAlert={this.closeAlert} message={errormessage} />
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="username" sm={3}>User Id</Label>
                                <Col sm={9}>
                                    <p>{id}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input type="text" name="name" invalid={submitted && !name} value={name} id="name" onChange={this.handleChange} placeholder="Enter Item Name" />
                                    {submitted && !name && <FormFeedback>Enter Item Name</FormFeedback>}
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

export default EditItem;