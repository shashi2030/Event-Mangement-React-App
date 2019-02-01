/**
 * Summary : View User
 * Description: View User
 * @link: /viewuser
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import { userActions } from '../../../actions/users.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';

/**
 * Define constant for the View User
 */
const userform = {
    id: null,
    username: "",
    buildingname: "",
    flatno: ""
}

/**
 * @name ViewUser
 * @extends React.Component
 */
class ViewUser extends Component {

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
            let data = response.data;
            this.setState({
                ...data
            })
        }).catch((error) => {
            console.log(error);
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
     * Description: Go to the edit user page based on the click of user
     * @param {null}
     * @return {null}
     */
    userEdit = () => {
        const id = this.props.match.params.id;
        this.props.history.push('/edituser/' + id);
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { id, username, buildingname, flatno } = this.state;
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
                "id": "viewuser",
                "active": true,
                "label": "View User",
                "link": false
            }
        ]
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>View User</h1>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Form onSubmit={this.userEdit}>
                            <FormGroup row>
                                <Label for="userid" sm={3}>User Id</Label>
                                <Col sm={9}>
                                    <p>{id}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="username" sm={3}>Username</Label>
                                <Col sm={9}>
                                    <p>{username}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="buildingname" sm={3}>Building Name</Label>
                                <Col sm={9}>
                                    <p>{buildingname}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="flatno" sm={3}>Flat No</Label>
                                <Col sm={9}>
                                    <p>{flatno}</p>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="button" onClick={this.userEdit} color="primary">Edit</Button>{' '}
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

export default ViewUser;