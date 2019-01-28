/**
 * Summary : View Vendor
 * Description: View Vendor
 * @link: /viewvendor
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import { vendorActions } from '../../../actions/vendor.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';

/**
 * Define constant for the View User
 */
const vendorform = {
    id: null,
    name: "",
    contact: "",
    email: "",
    description:""
}

/**
 * @name ViewVendor
 * @extends React.Component
 */
class ViewVendor extends Component {

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
     * Description: Call Get Vendor on Page Load
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        this.getVendor();
    }

    /**
     * Description: getVendor function to fetch the Vendor data based on params id
     * @param  {null}
     * @return {null}
     */
    getVendor = () => {
        const id = this.props.match.params.id;
        vendorActions.viewVendor(id).then(response => {
            let data = response.data;
            this.setState({
                ...data
            })
        }).catch((error) => {
            console.log(error);
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

    /**
     * Description: Go to the edit user page based on the click of user
     * @param {null}
     * @return {null}
     */
    vendorEdit = () => {
        const id = this.props.match.params.id;
        this.props.history.push('/editvendor/' + id);
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {        
        const { id, name, contact, email, description} = this.state;
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
                "id": "viewvendor",
                "active": true,
                "label": "View Vendor",
                "link": false
            }
        ]
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>View Vendor</h1>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Form onSubmit={this.vendorEdit}>
                            <FormGroup row>
                                <Label for="vendorid" sm={3}>Vendor Id</Label>
                                <Col sm={9}>
                                    <p>{id}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="name" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <p>{name}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="contact" sm={3}>Contact No.</Label>
                                <Col sm={9}>
                                    <p>{contact}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <p>{email}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm={3}>Description</Label>
                                <Col sm={9}>
                                    <p>{description}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="button" onClick={this.vendorEdit} color="primary">Edit</Button>{' '}
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

export default ViewVendor;