import axios from 'axios';
import { validCodes } from '../constants';


export const baseService = {
    get,
    put,
    post,
    delete: _delete
};

// get call
function get(url,header, body){
    return axios.get(url,header).then(handleResponse).catch(handleError);
}

// put call
function put(url,header,body){
    return axios.put(url,body,header).then(handleResponse).catch(handleError);
}

// post call
function post(url,header,body){
    return axios.post(url,body,header).then(handleResponse).catch(handleError);
}

// delete is reserved for javascript keyword here rename the delete with _delete
function _delete(url,header,body){
    return axios.delete(url,header).then(handleResponse).catch(handleError);
}

//callback of response return promise
function handleResponse(response){
    if(!validCodes(response.status)){
        return Promise.reject(response);
    }
    return Promise.resolve(response);
}

//callback of error response
function handleError(error) {
    return error
}