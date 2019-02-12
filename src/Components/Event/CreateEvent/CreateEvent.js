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
import { itemActions } from '../../../actions/item.actions';
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
    vendorData: {},
    SelectedVendor: {}
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
    }

    componentDidMount() {
        this.itemAPICall();
        this.fetchUser();
    }

    /**
     * Description: userAPICall function to fetch all user data based on parameter
     * @param  {null}
     * @return {null}
     */
    fetchUser = () => {
        userActions
            .listUser()
            .then(response => {
                this.setState({
                    membersData: response.data,
                    selectedUserList: this.state.members,
                    tempMember: this.state.members
                })
            })
            .catch(error => {
                console.log(error);
            });
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
        let { name, date, addedMembers, newVendorObj, totalprice, totalcollection, description } = this.state;



        let vendordata = {
            name: name,
            date: date,
            members: addedMembers,
            vendor: newVendorObj,
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
            default:
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
        vendorActions
            .listVendor()
            .then(response => {
                let vendorData = {}
                let SelectedVendor = { ...this.state.SelectedVendor };
                for (let i = 0; i < response.data.length; i++) {

                    let itemObj = {}
                    for (let s = 0; s < response.data[i]['items'].length; s++) {
                        itemObj[s] = { ...response.data[i]['items'][s], checked: false }
                    }
                    response.data[i]['items'] = itemObj;

                    if (vendorData[response.data[i].vendortype]) {
                        vendorData[response.data[i].vendortype].push(response.data[i]);
                    } else {
                        vendorData[response.data[i].vendortype] = [response.data[i]]
                    }

                }
                this.setState({
                    vendorData: vendorData,
                    SelectedVendor: SelectedVendor,
                    tempSelectedVendor: SelectedVendor
                })
            })
            .catch(error => {
                console.log(error);
            });
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

    selectUser = (e, userObj) => {
        var selectMember = [...this.state.tempMember];
        if (!e.target.checked) {
            var checkedIndex = selectMember.findIndex(val => val === userObj.id);
            selectMember.splice(checkedIndex, 1);
            this.setState({
                tempMember: selectMember
            })
        } else {
            selectMember.push(userObj.id);
            this.setState({
                tempMember: selectMember
            })
        }
    }

    addSelectedMember = () => {
        let selectMember = this.state.tempMember.map(val => {
            return val
        })
        this.setState({
            members: this.state.tempMember,
            addedMembers: selectMember,
            modal: !this.state.modal
        })
    }

    findData = (arr, key) => {
        return arr.findIndex(val => {
            return val === key
        })
    }

    selectAll = (e) => {
        let allUser = [...this.state.data];
        let tempMemberData = [...this.state.tempMember];
        if (e.target.checked) {
            for (let i = 0; i < allUser.length; i++) {
                if (this.findData(tempMemberData, allUser[i].id) === -1) {
                    tempMemberData.push(allUser[i].id);
                }
            }
            this.setState({
                ...this.state,
                tempMember: tempMemberData
            })
        } else {
            for (let a = 0; a < allUser.length; a++) {
                for (let i = 0; i < tempMemberData.length; i++) {
                    if (allUser[a].id === tempMemberData[i]) {
                        tempMemberData.splice(i, 1)
                    }
                }
            }
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
            return val === id
        });
        tempMemberData.splice(findIndex, 1);
        this.setState({
            members: members,
            tempMember: tempMemberData
        })
    }

    deleteVendor = (name) => {
        let updatedVendor = { ...this.state.SelectedVendor };
        delete updatedVendor[name];
        this.setState({
            SelectedVendor: updatedVendor
        })
    }

    handleChangeVendor = (type, e, itemsData) => {
        let data = { ...this.state.tempSelectedVendor }
        let itemIndex = this.state.vendorData[type].findIndex(item => {
            return item.id === parseInt(e.target.selectedOptions[0].id)
        })
        if (e.target.selectedIndex !== 0) {
            data[type] = { "selectedValue": e.target.selectedIndex - 1, name: e.target.selectedOptions[0].value, id: e.target.selectedOptions[0].id, items: this.state.vendorData[type][itemIndex].items }
        } else {
            delete data[type]
        }
        this.setState({
            ...this.state,
            tempSelectedVendor: data
        })
    }
    selectedVendorList = (id) => {
        let tempVendor = this.state.tempSelectedVendor;
        let isActive = Object.keys(tempVendor).filter(val => {
            return parseInt(tempVendor[val].id) === id
        })
        return isActive.length ? true : false;
    }
    addSelectedVendor = () => {
        let tempselectedvendor = { ...this.state.tempSelectedVendor };

        if (tempselectedvendor !== undefined || tempselectedvendor !== null) {
            let addedVendor = []

            for (let x in tempselectedvendor) {
                let test = []
                for (let y in tempselectedvendor[x]['items']) {
                    if (tempselectedvendor[x]['items'][y]['checked']) {
                        test.push(tempselectedvendor[x]['items'][y]['id'])
                    }
                }
                addedVendor.push({ id: tempselectedvendor[x]['id'], items: [...test] })
            }
            this.setState({
                ...this.state,
                SelectedVendor: tempselectedvendor,
                newVendorObj: addedVendor,
                modal: !this.state.modal
            })
        }
    }

    itemOnChange = (e, type, index) => {
        let itemdata = { ...this.state.tempSelectedVendor };
        if (e.target.checked) {
            itemdata[type].items[index].checked = true;
        } else {
            itemdata[type].items[index].checked = false;
        }
        this.setState({
            tempSelectedVendor: itemdata
        })

    }

    renderItemList = (type) => {
        let itemcheckbox = []
        let items = this.state.tempSelectedVendor[type].items;
        let itemlist = this.state.itemData;
        for (let i = 0; i < itemlist.length; i++) {
            for (let a = 0; a < Object.keys(this.state.tempSelectedVendor[type].items).length; a++) {
                if (items[a].id === itemlist[i].id) {
                    itemcheckbox.push(<FormGroup check inline key={"item" + a}>
                        <Label check>
                            <Input type="checkbox" id={itemlist[i].id} checked={this.state.tempSelectedVendor[type].items[a].checked} onChange={(e) => this.itemOnChange(e, type, a)} /> {itemlist[i].name}
                        </Label>
                    </FormGroup>)
                }
            }
        }
        return itemcheckbox;
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
                                            <Input type="select" name={value} onChange={(e) => this.handleChangeVendor(value, e)} id={value}>
                                                <option >None</option>
                                                {
                                                    this.state.vendorData[value].map((val, ind) => {
                                                        return <option key={ind} id={val.id} selected={this.selectedVendorList(val.id)}>{val.name}</option>
                                                    })
                                                }

                                            </Input>
                                            <div>
                                                {Object.entries(this.state.tempSelectedVendor).length && this.state.tempSelectedVendor[value] ? this.renderItemList(value) : null}
                                            </div>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>)
                        })

                        }
                    </div>
                )
                break;
            default:
        }
        return renderData;
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const { name, date, members, vendors, items, totalprice, totalcollection, SelectedVendor, description, submitted, errormessage } = this.state;
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
                                                {this.state.membersData && this.state.membersData.map((value, i) => {
                                                    return members && members.map((v, index) => {
                                                        return value.id === v ? <li key={index}>{value.username} <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteMember(index, value.id)}></i></li> : null
                                                    })

                                                })}
                                            </ul> : null
                                    }
                                    {submitted && members.length === 0 && <div className="custom-error invalid-feedback">Select Member.</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="vendors" sm={3}>Select Vendor</Label>
                                <Col sm={9}>
                                    <button type="button" onClick={this.addVendor}><i className="fa fa-user-plus" aria-hidden="true"></i></button>
                                    {
                                        SelectedVendor && Object.keys(SelectedVendor).length !== 0 ?
                                            <ul className="member-list vendorlist">
                                                {
                                                    SelectedVendor && Object.keys(SelectedVendor).map((value, index) => {
                                                        return <li key={index}> <label>{value} : </label> <span>{this.state.vendorData[value][SelectedVendor[value].selectedValue].name}</span> <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteVendor(value)} ></i></li>
                                                    })
                                                }
                                            </ul> : null
                                    }
                                    {submitted && Object.entries(SelectedVendor).length === 0 && <div className="custom-error invalid-feedback">Select Vendor.</div>}
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