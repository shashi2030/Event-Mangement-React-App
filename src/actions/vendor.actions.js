/**
 * Summary: Vendor action
 * Description: Vendor function which will called to service layer
 * @author Shashi Kapoor Singh.
 */
import { baseService } from '../services/service';
import * as Header from '../services/header.api';
import { uriConstants } from '../constants'
import {Response} from './response.action';

export const vendorActions = {
    listVendor,
    createVendor,
    deleteVendor,
    viewVendor,
    editVendor
};

/**
* Description: Fetch Vendor detail by Page No, Limit and handled success/error response accordingly.
* @param {object} requestData
* @return {json} req_response
*/
function listVendor (requestData) {
    
    let url = '';
    if(requestData.pageNo !== undefined && requestData.pageLimit !== undefined){
        url = uriConstants.vendor + '?_page=' + requestData.pageNo + '&_limit=' + requestData.pageLimit;
    }else{
        url = uriConstants.vendor;
    }
    console.log(url)
    return baseService.get(url, Header.JSON(), {}).then(response => {
        return Response(response);
    })
    .catch(error => {
        return error;
    });

};

/**
* Description: Vendor create api would be called and handled success/error response accordingly.
* @param {object} requestData
* @return {json} req_response
*/
function createVendor (requestData) {
    let url = uriConstants.vendor;
    return baseService.post(url, Header.JSON(), requestData).then(response => {
        return response;
    });
}

/**
* Description: Vendor Edit api would be called and handled success/error response accordingly.
* @param {number} vendorId
* @param {object} requestData
* @return {json} req_response
*/
function editVendor (vendorId,requestData) {
    let url = uriConstants.vendor+"/"+vendorId;
    return baseService.put(url, Header.JSON(), requestData).then(response => {
        return response;
    });
}

/**
* Description: Delete Vendor by vendorId and handled success/error response accordingly.
* @param {number} vendorId
* @return {json} req_response
*/
function deleteVendor (vendorId) {
    let url = uriConstants.vendor + "/"+vendorId;
    return baseService.delete(url, Header.JSON(), {}).then(response => {
        return response;
    });
}

/**
* Description: Fetch Vendor Details by vendorId and handled success/error response accordingly.
* @param {number} vendorId
* @return {json} req_response
*/
function viewVendor (vendorId) {
    let url = uriConstants.vendor + "/"+vendorId;
    return baseService.get(url, Header.JSON(), {}).then(response => {
        return response;
    });
}


