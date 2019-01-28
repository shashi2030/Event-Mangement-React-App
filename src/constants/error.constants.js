export const validCodes=(code)=>{
    if(code>=200 && code<400){
        return true;
    }
    return false;
}