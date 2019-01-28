/**
 * Summary : Login
 * Description: Login Page
 * @link: /
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { keyConstants } from '../../constants/index';
require('./css/login.css');

/**
 * Define constant for Login form initial state
 */
const initialState = {
    username: "",
    password: "",
    submitted: false,
    alert: { type: null, message: null }
}

/**
 * @name Login
 * @extends React.Component
 */
class Login extends Component {

    /**
     * State is initialised
     * 1) handle projection field attribute
     * @param {object} props 
     */
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    /**
     * Description: handleChange will call when user change any text boxes or element
     * @param  {event} e
     * @return {null}
     */
    handleChange = (e) => {
        let { name, value } = e.target;
        let value1 = value.trim();
        this.setState({
            [name]: value1
        })
    }

    /**
     * Description: handleEnterKeyPress call when user press enter key
     * @param  {event} e
     * @return {null}
     */
    handleEnterKeyPress = (e) => {
        this.setState({
            alert: { type: null, message: null }
        });
        if (e.charCode === keyConstants.ENTER) {
            this.handleSubmit(e);
        }
    }

    /**
     * Description: Submit the data when user click on submit button
     * @param  {event} e
     * @return {null}
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        });
        const { username, password } = this.state;
        if (username === 'test' && password === 'test') {
            this.props.history.push('/home');
        }
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { username, password, submitted } = this.state;
        return (
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form className="login-container" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" autoFocus name="username" value={username} id="username" placeholder="Username" onChange={this.handleChange} />
                                {!username && submitted && <div className="text-danger">Enter Username</div>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" value={password} id="password" placeholder="Password" onChange={this.handleChange} />
                                {!password && submitted && <div className="text-danger">Enter Password</div>}
                            </FormGroup>
                            <Button onClick={this.handleSubmit} color="primary">Submit</Button> <Button color="secondary">Cancel</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Login;