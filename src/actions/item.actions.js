/**
 * Summary: Item action
 * Description: Item function which will called to service layer
 * @author Shashi Kapoor Singh.
 */
import { baseService } from '../services/service';
import * as Header from '../services/header.api';
import { uriConstants } from '../constants'
import {Response} from './response.action';

export const itemActions = {
    listItem,
    createItem,
    deleteItem,
    viewItem,
    editItem
};

/**
* Description: fetch Item detail by Page No, Limit and handled success/error response accordingly.
* @param {object} requestData
* @return {json} req_response
*/
function listItem (requestData) {
    let url = '';
    if(requestData ===undefined || requestData ==='undefined'){
        url=uriConstants.item;
    }else if(requestData.filterId === 'undefined' || requestData.filterId === undefined){
        url = uriConstants.item + '?_page=' + requestData.pageNo + '&_limit=' + requestData.pageLimit;
    }else{
        url = uriConstants.item + '?' + requestData.filterId;
    }
    
    return baseService.get(url, Header.JSON(), {}).then(response => {
        return Response(response);
    })
    .catch(error => {
        return error;
    });

};

/**
* Description: Item create api would be called and handled success/error response accordingly.
* @param {object} requestData
* @return {json} req_response
*/
function createItem (requestData) {
    let url = uriConstants.item;
    return baseService.post(url, Header.JSON(), requestData).then(response => {
        return response;
    });
}

/**
* Description: editItem api would be called and handled success/error response accordingly.
* @param {number} itemId
* @param {object} requestData
* @return {json} req_response
*/
function editItem (itemId,requestData) {
    let url = uriConstants.item+"/"+itemId;
    return baseService.put(url, Header.JSON(), requestData).then(response => {
        return response;
    });
}

/**
* Description: Delete Item by itemId and handled success/error response accordingly.
* @param {number} itemId
* @return {json} req_response
*/
function deleteItem (itemId) {
    let url = uriConstants.item + "/"+itemId;
    return baseService.delete(url, Header.JSON(), {}).then(response => {
        return response;
    });
}

/**
* Description: Getch Item Details by itemId and handled success/error response accordingly.
* @param {number} itemId
* @return {json} req_response
*/
function viewItem (itemId) {
    let url = uriConstants.item + "/"+itemId;
    return baseService.get(url, Header.JSON(), {}).then(response => {
        return response;
    });
}


function checkVariable(varname){
    let output = false;
    if (typeof(varname) != 'undefined' && varname != null){
            output = true
        }
    return output;
}