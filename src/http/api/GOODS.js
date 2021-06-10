import Http from '../config'


const http = new Http()


export const  API_DATA =  (data) => http.post(`/delivery/order/check/${data.sn}`, data)