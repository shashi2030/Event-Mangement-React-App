/**
 * Summary: Event action
 * Description: Event function which will called to service layer
 * @author Shashi Kapoor Singh.
 */
import { baseService } from '../services/service';
import * as Header from '../services/header.api';
import { uriConstants } from '../constants'
import {Response} from './response.action';

export const eventActions = {
    listEvent,
    createEvent,
    deleteEvent,
    viewEvent,
    editEvent
};

/**
* Description: fetch Event detail by Page No, Limit and handled success/error response accordingly.
* @param {object} requestData
* @return {json} req_response
*/
function listEvent (requestData) {    
    let url = '';
    if(requestData.filterId === 'undefined' || requestData.filterId === undefined){
        url = uriConstants.event + '?_page=' + requestData.id + '&_limit=' + requestData.pageLimit;
    }else{
        url = uriConstants.filterId + '?' + requestData.filterId;
    }
    return baseService.get(url, Header.JSON(), {}).then(response => {
        return Response(response);
    })
    .catch(error => {
        return error;
    });

};

/**
* Description: Event create api would be called and handled success/error response accordingly.
* @param {object} requestData
* @return {json} req_response
*/
function createEvent (requestData) {
    let url = uriConstants.event;
    return baseService.post(url, Header.JSON(), requestData).then(response => {
        return response;
    });
}

/**
* Description: Event Edit api would be called and handled success/error response accordingly.
* @param {number} eventId
* @param {object} requestData
* @return {json} req_response
*/
function editEvent (eventId,requestData) {
    let url = uriConstants.event+"/"+eventId;
    return baseService.put(url, Header.JSON(), requestData).then(response => {
        return response;
    });
}

/**
* Description: Delete Event by eventId and handled success/error response accordingly.
* @param {number} eventId
* @return {json} req_response
*/
function deleteEvent (eventId) {
    let url = uriConstants.event + "/"+eventId;
    return baseService.delete(url, Header.JSON(), {}).then(response => {
        return response;
    });
}

/**
* Description: Fetch Event Details by eventId and handled success/error response accordingly.
* @param {number} eventId
* @return {json} req_response
*/
function viewEvent (eventId) {
    let url = uriConstants.event + "/"+eventId;
    return baseService.get(url, Header.JSON(), {}).then(response => {
        return response;
    });
}


