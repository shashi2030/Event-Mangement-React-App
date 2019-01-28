export const urlConstants = {
    BASE_URL:"http://localhost:3000"
}
export const API_INTERFACE = {
    user:"/users",
    vendor:"/vendors",
    event:"/events",
}
export const uriConstants = {
    user:urlConstants.BASE_URL + API_INTERFACE.user,
    vendor:urlConstants.BASE_URL + API_INTERFACE.vendor,
    event:urlConstants.BASE_URL + API_INTERFACE.event
}