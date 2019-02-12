/**
 * Summary: User action
 * Description: User function which will called to service layer
 * @author Shashi Kapoor Singh.
 */
import { baseService } from '../services/service';
import * as Header from '../services/header.api';
import { uriConstants } from '../constants'
import { Response } from './response.action';

export const userActions = {
    listUser,
    createUser,
    deleteUser,
    viewUser,
    editUser
};

/**
* Description: fetch User detail by Page No, Limit and handled success/error response accordingly.
* @param {object} requestData
* @return {json} req_response
*/
function listUser(requestData='all') {
    let url = '';
    if(requestData === 'all'){
        url=uriConstants.user;
    }else if(requestData.pageNo !== undefined && requestData.pageLimit !== undefined){
        url = uriConstants.user + '?_page=' + requestData.pageNo + '&_limit=' + requestData.pageLimit;
    }else if(requestData.filterId !== undefined){
        url = uriConstants.user + '?' + requestData.filterId;
    }

    return baseService.get(url, Header.JSON(), {}).then(response => {
        return Response(response);
    })
        .catch(error => {
            return error;
        });

};

/**
* Description: User create api would be called and handled success/error response accordingly.
* @param {object} requestData
* @return {json} req_response
*/
function createUser(requestData) {
    let url = uriConstants.user;
    return baseService.post(url, Header.JSON(), requestData).then(response => {
        return response;
    });
}

/**
* Description: User editUser api would be called and handled success/error response accordingly.
* @param {number} userId
* @param {object} requestData
* @return {json} req_response
*/
function editUser(userId, requestData) {
    let url = uriConstants.user + "/" + userId;
    return baseService.put(url, Header.JSON(), requestData).then(response => {
        return response;
    });
}

/**
* Description: Delete User by userId and handled success/error response accordingly.
* @param {number} userId
* @return {json} req_response
*/
function deleteUser(userId) {
    let url = uriConstants.user + "/" + userId;
    return baseService.delete(url, Header.JSON(), {}).then(response => {
        return response;
    });
}

/**
* Description: Getch User Details by userId and handled success/error response accordingly.
* @param {number} userId
* @return {json} req_response
*/
function viewUser(userId) {
    let url = uriConstants.user + "/" + userId;
    return baseService.get(url, Header.JSON(), {}).then(response => {
        return response;
    });
}


