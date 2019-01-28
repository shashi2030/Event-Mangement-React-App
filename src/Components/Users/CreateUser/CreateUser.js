/**
 * Summary : Create User
 * Description: Create User
 * @link: /createuser
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import { userActions } from '../../../actions/users.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';

/**
 * Define constant for the User Form
 */
const userform = {
    username: "",
    buildingname: "",
    flatno: "",
    submitted: false,
    saveEnable: false,
    errormessage: "",
    alertVisible: false
}

/**
 * @name CreateUser
 * @extends React.Component
 */
class CreateUser extends Component {
    /**
     * State is initialised
     * 1) handle projection field attribute
     * @param {object} props 
     */
    constructor(props) {
        super(props);
        this.state = userform;
    }

    /**
     * Description: handleChange will call when user type any text boxes or element
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
     * Description: handleSubmit will call when user submit form
     * @param  {event} e
     * @return {null}
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        let { username, buildingname, flatno } = this.state;
        let userdata = {
            username: username,
            buildingname: buildingname,
            flatno: flatno
        };
        if (username && buildingname && flatno) {
            userActions.createUser(userdata).then(response => {
                if (response.status === 201) {
                    this.setState({
                        ...userform,
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
     * Description: handleback got to Back on User List 
     * @param  {null}
     * @return {null}
     */
    handleback = () => {
        this.props.history.push('/listusers');
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { username, buildingname, flatno, submitted, errormessage } = this.state;
        const breadcrumbdata = [
            {
                "id": "home",
                "active": false,
                "label": "Home",
                "link": true,
                "href": "/home"
            },
            {
                "id": "listusers",
                "active": false,
                "label": "User List",
                "link": true,
                "href": "/listusers"
            },
            {
                "id": "createuser",
                "active": true,
                "label": "Create User",
                "link": false
            }
        ]
        const creatButtonActive = () => {
            let isActive = false;
            if (!username && !buildingname && !flatno) {
                isActive = true;
            }
            return isActive;
        }
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Create User</h1>
                <AlertBox isOpen={this.state.alertVisible} toggle={this.onDismiss} closeAlert={this.closeAlert} message={errormessage} />
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="username" sm={3}>Username</Label>
                                <Col sm={9}>
                                    <Input type="text" name="username" invalid={submitted && !username} value={username} id="username" onChange={this.handleChange} placeholder="Enter Username" />
                                    {submitted && !username && <FormFeedback>Enter Username</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="buildingname" sm={3}>Building Name</Label>
                                <Col sm={9}>
                                    <Input type="select" name="buildingname" invalid={submitted && !buildingname} value={buildingname} onChange={this.handleChange} id="buildingname">
                                        <option defaultValue>Select</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                    </Input>
                                    {submitted && !buildingname && <FormFeedback>Select Building Name</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="flatno" sm={3}>Flat No</Label>
                                <Col sm={9}>
                                    <Input type="number" name="flatno" id="flatno" value={flatno} invalid={submitted && !flatno} onChange={this.handleChange} placeholder="Enter Flat No" />
                                    {submitted && !flatno && <FormFeedback>Enter Flat No</FormFeedback>}
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

export default CreateUser;