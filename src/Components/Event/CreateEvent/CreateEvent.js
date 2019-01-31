/**
 * Summary : Create Event
 * Description: Create Event
 * @link: /createevent
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Layout } from '../../Common/Layout/Layout';
import { eventActions } from '../../../actions/event.actions';
import Grid from '../../Common/Grid/Grid';
import { userActions } from '../../../actions/users.actions';
import { vendorActions } from '../../../actions/vendor.actions';
import BreadCrumb from '../../Common/Breadcrumb/Breadcrumb';
import { AlertBox } from '../../Common/AlertBox/AlertBox';
import ModalPopup from '../../Common/ModalPopup/ModalPopup';
require('./css/createevent.css');
/**
 * Define Constant of Table column Definition
 */
const colDef = {
    "select": { "label": "Select", "checked": false, 'sort': false, "display": true },
    "id": { "label": "ID", 'sort': false, "display": true },
    "username": { "label": "User Name", 'sort': true, "display": true },
    "buildingname": { "label": "Building Name", 'sort': true, "display": true },
    "flatno": { "label": "Flat No", 'sort': true, "display": true }
}

/**
 * Define constant for the Event Form
 */
const eventform = {
    name: "",
    date: "",
    members: [],
    vendors: {
        vendor1: "",
        vendor2: "",
        vendor3: ""
    },
    items: [],
    totalprice: "",
    totalcollection: "",
    description: "",
    submitted: false,
    saveEnable: false,
    errormessage: "",
    alertVisible: false,
    modal: false,
    currentPage: 1,
    countPerPage: 5,
    totalDataCount: 0,
    addedMember: [],
    tempMember: [],
    vendorData:{},
    SelectedVendor:{}
}

const popupDescription = {
    member: {
        heading: "Member List"
    },
    vendor: {
        heading: "Vendor List"
    },
    items: {
        heading: "Items"
    }
}
/**
 * @name CreateEvent
 * @extends React.Component
 */
class CreateEvent extends Component {
    /**
     * State is initialised
     * 1) handle projection field attribute
     * @param {object} props 
     */
    constructor(props) {
        super(props);
        this.state = eventform;
        // this.tempMember = [{"id":3}, {"id":1}];
        // this.addedMember = [];
    }

    /**
     * Description: handleChange will call when Event type any text boxes or element
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
     * Description: handleSubmit will call when Event submit form
     * @param  {event} e
     * @return {null}
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        let { name, date, members, vendors, items, totalprice, totalcollection, description } = this.state;
        let vendordata = {
            name: name,
            date: date,
            members: members,
            vendors: vendors,
            items: items,
            totalprice: totalprice,
            totalcollection: totalcollection,
            description: description
        };
        if (name && date) {
            eventActions.createEvent(vendordata).then(response => {
                if (response.status === 201) {
                    this.setState({
                        ...eventform,
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
     * Description: handleback got to Back on Event List 
     * @param  {null}
     * @return {null}
     */
    handleback = () => {
        this.props.history.push('/listevent');
    }

    setPopupType = (type) => {
        switch (type) {
            case 'member':
                this.setState({
                    modal: true,
                    popupHeading: popupDescription.member.heading
                });
                this.userAPICall();
                break;
            case 'vendor':
                this.setState({
                    modal: true,
                    popupHeading: popupDescription.vendor.heading
                });
                this.vendorAPICall();
                break;
        }
    }
    addMember = (type) => {
        this.setState({
            popupType: type
        }, () => {
            this.setPopupType(this.state.popupType);
        })
    }

    addVendor = () => {
        let type = 'vendor';
        this.setState({
            popupType: type
        }, () => {
            this.setPopupType(this.state.popupType);
        })
    }

    /**
     * Description: userAPICall function to fetch all user data based on parameter
     * @param  {null}
     * @return {null}
     */
    userAPICall = () => {
        let data = {
            pageNo: this.state.currentPage,
            pageLimit: this.state.countPerPage
        }
        userActions
            .listUser(data)
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
     * Description: userAPICall function to fetch all user data based on parameter
     * @param  {null}
     * @return {null}
     */
    vendorAPICall = () => {
        let data = {}
        vendorActions
            .listVendor(data)
            .then(response => {
                let vendorData = {}
                let SelectedVendor = {...this.state.SelectedVendor};
                for (let i = 0; i < response.data.length; i++) {
                    if (vendorData[response.data[i].vendortype]) {
                        vendorData[response.data[i].vendortype].push(response.data[i]);
                    } else {
                        vendorData[response.data[i].vendortype] = [response.data[i]]
                    }
                    if(!SelectedVendor[response.data[i].vendortype]){
                        SelectedVendor[response.data[i].vendortype]={"selectedValue":-1}
                    }                    
                }
                this.setState({
                    vendorData: vendorData,
                    SelectedVendor:SelectedVendor,
                    tempSelectedVendor:SelectedVendor
                })
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
            modal: false
        })
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
            this.userAPICall();
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
            this.userAPICall();
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
            this.userAPICall();
        })
    }

    selectUser = (e, id, name) => {
        var selectMember = [...this.state.tempMember];
        if (!e.target.checked) {
            var checkedIndex = selectMember.findIndex(val => val.id == id);
            selectMember.splice(checkedIndex, 1);
            this.setState({
                tempMember: selectMember
            })
        } else {
            selectMember.push({ "id": id, "username": name });
            this.setState({
                tempMember: selectMember
            })
        }
    }

    addSelectedMember = () => {
        this.setState({
            members: this.state.tempMember,
            modal: !this.state.modal
        })
    }

    findData = (arr, key) => {
        return arr.findIndex(val => {
            return val.id === key
        })
    }

    selectAll = (e) => {
        let allUser = [...this.state.data];
        let tempMemberData = [...this.state.tempMember];
        if (e.target.checked) {
            allUser.filter((value, index) => {
                if (this.findData(tempMemberData, value.id) === -1) {
                    tempMemberData.push({ "id": value.id, "username": value.username });
                }
            })
            this.setState({
                ...this.state,
                tempMember: tempMemberData
            })
        } else {
            allUser.filter((value, index) => {
                tempMemberData.filter((val, ind) => {
                    if (value.id === val.id) {
                        tempMemberData.splice(ind, 1)
                    }
                })
            })
            this.setState({
                tempMember: tempMemberData
            })
        }
    }

    deleteMember = (index, id) => {
        let members = [...this.state.members];
        members.splice(index, 1);
        let tempMemberData = [...this.state.tempMember];
        let findIndex = tempMemberData.findIndex((val) => {
            return val.id === id
        });
        tempMemberData.splice(findIndex, 1);
        this.setState({
            members: members,
            tempMember: tempMemberData
        })
    }

    deleteVendor = (name) =>{
        let updatedVendor = {...this.state.SelectedVendor} ;
        updatedVendor[name] = {"selectedValue": -1, "selected": false};
       this.setState({
        SelectedVendor:updatedVendor
       })
    }

    handleChangeVendor = (type,e) =>{
        let data = {...this.state.tempSelectedVendor}
            data[type] = {"selectedValue":e.target.selectedIndex-1,"selected":true}
        this.setState({
            ...this.state,
            tempSelectedVendor:data
        })
    }
    addSelectedVendor =()=>{
        if(this.state.tempSelectedVendor !== undefined || this.state.tempSelectedVendor !==null){
            this.setState({
                ...this.state,
                SelectedVendor:this.state.tempSelectedVendor,
                modal: !this.state.modal
            })
        }        
    }

    renderPopupData = () => {
        let renderData = "";
        switch (this.state.popupType) {
            case 'member':
                renderData = <Grid
                    data={this.state.data}
                    tempMember={this.state.tempMember}
                    colDef={colDef}
                    currentPage={this.state.currentPage}
                    countPerPage={this.state.countPerPage}
                    pagingClick={this.pagingClick}
                    totalDataCount={this.state.totalDataCount}
                    nextPage={this.nextPage}
                    prevPage={this.prevPage}
                    actionType={this.actionType}
                    selectUser={this.selectUser}
                    selectAll={this.selectAll}
                />
                break;
            case 'vendor':
                renderData = (
                    <div>
                        {this.state.vendorData && Object.keys(this.state.vendorData).map((value, index) => {
                            return (<Row key={index}>
                                <Col sm="12" md={{ size: 8, offset: 2 }}>
                                    <FormGroup row>
                                        <Label for={value} sm={3}>{value}</Label>
                                        <Col sm={9}>
                                            <Input type="select" name={value} onChange={(e)=>this.handleChangeVendor(value,e)} id={value}>              
                                            <option>None</option>                                      
                                                {
                                                    this.state.vendorData[value].map((val, ind) => {
                                                        return <option key={ind} ids={val.id} selected={this.state.SelectedVendor!= null ?this.state.SelectedVendor[value].selectedValue == ind ? true : null : null} >{val.name}</option>
                                                    })

                                                }
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>)
                        })

                        }
                    </div>
                )
                break;
        }
        return renderData;
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { name, date, members, vendors, items, totalprice, totalcollection, description, submitted, errormessage } = this.state;
        const breadcrumbdata = [
            {
                "id": "home",
                "active": false,
                "label": "Home",
                "link": true,
                "href": "/home"
            },
            {
                "id": "listevent",
                "active": false,
                "label": "Event List",
                "link": true,
                "href": "/listevent"
            },
            {
                "id": "createvent",
                "active": true,
                "label": "Create Event",
                "link": false
            }
        ]
        const creatButtonActive = () => {
            let isActive = false;
            if (!name && !date && !vendors && !totalprice && !items) {
                isActive = true;
            }
            return isActive;
        }
        return (
            <Layout>
                <BreadCrumb data={breadcrumbdata} />
                <h1>Create Event</h1>
                <AlertBox isOpen={this.state.alertVisible} toggle={this.onDismiss} closeAlert={this.closeAlert} message={errormessage} />
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="name" sm={3}>Event Name</Label>
                                <Col sm={9}>
                                    <Input type="text" name="name" invalid={submitted && !name} value={name} id="name" onChange={this.handleChange} placeholder="Enter Event Name" />
                                    {submitted && !name && <FormFeedback>Enter Event Name</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="date" sm={3}>Event Date</Label>
                                <Col sm={9}>
                                    <Input type="date" name="date" invalid={submitted && !date} value={date} id="date" onChange={this.handleChange} placeholder="Select Date" />
                                    {submitted && !date && <FormFeedback>Select Event Date.</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="members" sm={3}>Members</Label>
                                <Col sm={9}>
                                    <button type="button" onClick={() => this.addMember('member')}><i className="fa fa-user-plus" aria-hidden="true"></i></button>
                                    {
                                        members.length ?
                                            <ul className="member-list">
                                                {
                                                    members && members.map((value, index) => {
                                                        return <li key={index}>{value.username} <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteMember(index, value.id)}></i></li>
                                                    })
                                                }
                                            </ul> : null
                                    }

                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="vendors" sm={3}>Select Vendor</Label>
                                <Col sm={9}>
                                    <button type="button" onClick={this.addVendor}><i className="fa fa-user-plus" aria-hidden="true"></i></button>
                                    
                                    {                                        
                                         this.state.SelectedVendor && Object.keys(this.state.SelectedVendor).length !== 0 ?
                                         <ul className="member-list vendorlist">
                                                {
                                                    this.state.SelectedVendor && Object.keys(this.state.SelectedVendor).map((value, index) => {
                                                        if(this.state.SelectedVendor[value].selected){
                                                            return <li key={index}> <label>{value} : </label> <span>{this.state.vendorData[value][this.state.SelectedVendor[value].selectedValue].name}</span> <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteVendor(value)} ></i></li>
                                                        }                                                       
                                                    })
                                                }
                                            </ul> : null
                                    }
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="items" sm={3}>Add Items</Label>
                                <Col sm={9}>
                                    11
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="totalprice" sm={3}>Total Price</Label>
                                <Col sm={9}>
                                    <Input type="number" name="totalprice" invalid={submitted && !totalprice} value={totalprice} id="totalprice" onChange={this.handleChange} placeholder="Enter Total Price" />
                                    {submitted && !totalprice && <FormFeedback>Enter Total Price.</FormFeedback>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="totalcollection" sm={3}>Total Collection</Label>
                                <Col sm={9}>
                                    <Input type="number" name="totalcollection" invalid={submitted && !totalcollection} value={totalcollection} id="totalprice" onChange={this.handleChange} placeholder="Enter Total Collection" />
                                    {submitted && !totalcollection && <FormFeedback>Enter Total Collection.</FormFeedback>}
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

                <ModalPopup
                    modal={this.state.modal}
                    toggle={this.toggle}
                    addSelectedMember={this.addSelectedMember}
                    addSelectedVendor={this.addSelectedVendor}
                    closeModal={this.closeModal}
                    heading={this.state.popupHeading}
                    popupType={this.state.popupType}
                >
                    {this.renderPopupData()}
                </ModalPopup>
            </Layout>
        )
    }
}

export default CreateEvent;