/**
 * Summary : Grid Component
 * Description: Handle Grid column, action, callbacks
 * @author Shashi Kapoor Singh
 */
import React, { Component } from 'react';
import { Table, Button, ButtonGroup, PaginationItem, PaginationLink } from 'reactstrap';
import LoadingHOC from '../Spinner/Spinner';
import { Paging } from './Paging';
require('./css/grid.css');

/**
 * @name Grid
 * @extends Component
 */
class Grid extends Component {

    /**
     * State is initialised
     * @param {object} props 
     */
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    /**
    * Description: Render Action Button Icon
    * @param {Object} buttonName
    * @return {Object} 
    */
    renderActionButton = (buttonName) => {
        let icon = null;
        switch (buttonName["action"]) {
            case "view":
                icon = <i className="fa fa-file-text-o" aria-hidden="true"></i>
                break;
            case "edit":
                icon = <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                break;
            case "delete":
                icon = <i className="fa fa-trash-o" aria-hidden="true"></i>
                break;
            default:
        }
        return icon;
    }

    findSelectedId =(id)=>{
         let selectedUserList = this.props.tempMember;
         let matchData = selectedUserList.findIndex(val => val['id']==id);
         return matchData === -1?false:true;
    }

    selectedAll = () =>{
        let currentPageData = this.props.data;
        let selectedLength = 0;
        for(let i = 0; i < currentPageData.length;i++){
           if(!this.findSelectedId(currentPageData[i].id)){
                break;
           }
           selectedLength++;
        }

        return selectedLength === currentPageData.length ? true:false;
    }

    /**
     * render to html
     * @param {null}
     * @return {Object}
     */
    render() {
        const pageNumbers = [];
        const totalPagingLength = Math.ceil(this.props.totalDataCount / this.props.countPerPage);
        for (let i = 1; i <= totalPagingLength; i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map((number, index) => {
            return (
                <PaginationItem key={index} active={(index + 1) === parseInt(this.props.currentPage)}>
                    <PaginationLink onClick={(e) => this.props.pagingClick(e)}
                        id={number}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            );
        });
        const prevBtnDisabled = parseInt(this.props.currentPage) === 1 ? true : false;
        const nextBtnDisabled = totalPagingLength === parseInt(this.props.currentPage) ? true : false;
        return (
            <div className="table-wrapper">
                <div className="table-responsive">
                    <Table hover>
                        <thead>
                            <tr>
                                {
                                    this.props.colDef && Object.values(this.props.colDef).map((value, index) => {
                                        if(value['label'] === 'Select'){                                            
                                            return <th key={index} className={value['class']}><input type="checkbox" checked={this.selectedAll()} onChange={(e)=>this.props.selectAll(e)} />{value['label']}</th>
                                        }
                                        return <th key={index} className={value['class']}>{value['label']}</th>                                        
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data ? this.props.data.map((value, index) => {
                                return <tr key={index}>
                                    {this.props.colDef && Object.keys(this.props.colDef).map((val, ind) => {                                        
                                         if (val === 'select') {
                                             return <td key={ind}><input type="checkbox" checked={this.findSelectedId(value.id)} id={value.id} onChange={(e)=>this.props.selectUser(e,value.id,value.username)} /></td>
                                         }
                                        if (val === 'options') {
                                            return <td key={ind}><ButtonGroup>
                                                {this.props.colDef["options"].list.map((v, i) => {
                                                    return <Button key={i} outline color="info" onClick={() => this.props.actionType(value.id, v.action, index)} >
                                                        {this.renderActionButton(v)}
                                                    </Button>
                                                })}
                                            </ButtonGroup></td>
                                        } else {
                                            return <td key={ind}>{value[val]}</td>
                                        }
                                    })
                                    }
                                </tr>
                            }) : null
                            }
                        </tbody>
                    </Table>
                </div>
                <Paging
                    previousDisable={prevBtnDisabled}
                    nextDisable={nextBtnDisabled}
                    prevClick={this.props.prevPage}
                    nextClick={this.props.nextPage}
                    data={renderPageNumbers}
                />
            </div>
        )
    }
}

export default LoadingHOC(Grid);