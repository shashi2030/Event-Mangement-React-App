import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from '../Login/Login';
import ListUsers from '../Users/ListUsers/ListUsers';
import ViewUser from '../Users/ViewUser/ViewUser';
import EditUser from '../Users/EditUser/EditUser';
import CreateUser from '../Users/CreateUser/CreateUser';
import Home from '../Home/Home';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateVendor from '../Vendor/CreateVendor/CreateVendor';
import ListVendor from '../Vendor/ListVendors/ListVendor';
import EditVendor from '../Vendor/EditVendor/EditVendor';
import ViewVendor from '../Vendor/ViewVendor/ViewVendor';
import CreateEvent from '../Event/CreateEvent/CreateEvent';
require('../../assets/css/style.css');
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/createuser" component={CreateUser} />
          <Route exact path="/viewuser/:id" component={ViewUser} />
          <Route exact path="/edituser/:id" component={EditUser} />
          <Route exact path="/listusers" component={ListUsers} />          
          <Route exact path="/listvendor" component={ListVendor} /> 
          <Route exact path="/createvendor" component={CreateVendor} />          
          <Route exact path="/editvendor/:id" component={EditVendor} />
          <Route exact path="/viewvendor/:id" component={ViewVendor} />
          <Route exact path="/createevent" component={CreateEvent} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;