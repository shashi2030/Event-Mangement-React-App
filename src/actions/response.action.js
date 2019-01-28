/**
 * Summary: Response Status Modification
 * Description: Response message modification by check the available status code on local
 * @author Shashi Kapoor Singh.
 */
import {MESSAGES} from '../constants/message.constants';

export const Response = (response) =>{   
    try{
        let httpStatusCode;
        if(response){
            httpStatusCode = response["status"];
            const message = MESSAGES[httpStatusCode];
            if(validCodes(httpStatusCode)){
                response.statusText = message; 
            }                   
        }
        return response;
    } catch (e){

    }
    
}

/**
 * Description: Check Valid Response code available in Message List
 * @param {number} code
 * @return {boolean} isAvailable
 */
const validCodes = (code) =>{
    let isAvailable = true;
    if(MESSAGES[code] === undefined || MESSAGES[code] === 'undefined'){
        isAvailable = false
    }
    return isAvailable;
}

