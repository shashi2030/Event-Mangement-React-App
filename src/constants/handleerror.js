import * as CODE from './message.constants';
const HandleError = (error) => {
    let { status, message } = error.response;
    switch (status) {
        case 401:
            message = CODE.MESSAGES[401];
            break;
        case 403:
            message = CODE.MESSAGES[403];
            break;
        case 404:
            message = CODE.MESSAGES[404];
            break;
        case 500:
            message = CODE.MESSAGES[500];
            break;
        default:
    }
    return message;
}

export default HandleError;