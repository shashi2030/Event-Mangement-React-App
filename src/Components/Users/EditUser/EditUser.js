/**
 * Summary : Edit User
 * Description: Edit User
 * @link: /edituser
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
    id: null,
    username: "",
    buildingname: "",
    flatno: "",
    submitted: false,
    saveEnable: false,
    errormessage: "",
    alertVisible: false
}

/**
 * @name EditUser
 * @extends React.Component
 */
class EditUser extends Component {

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
     * Description: handleChange will call when user change any text boxes or element
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
     * Description: handleReset will call when user click on reset 
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
     * Description: Call Get User on Page Load
     * @param  {null}
     * @return {null}
     */
    componentDidMount() {
        this.getUser();
    }

    /**
     * Description: getUser function to fetch the user data based on params id
     * @param  {null}
     * @return {null}
     */
    getUser = () => {
        const id = this.props.match.params.id;
        userActions.viewUser(id).then(response => {
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
     * Description: handleSubmit will call when user update form
     * @param  {event} e
     * @return {null}
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        let { id, username, buildingname, flatno } = this.state;
        let userdata = {
            username: username,
            buildingname: buildingname,
            flatno: flatno
        };

        if (username && buildingname && flatno) {
            userActions.editUser(id, userdata).then(response => {
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
        this.props.history.push('/listusers');
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { id, username, buildingname, flatno, submitted, errormessage } = this.state;
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
                "id": "edituser",
                "active": true,
                "label": "Edit User",
                "link": false
            }
        ];
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Edit User</h1>
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

export default EditUser;