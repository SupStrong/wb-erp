import Http from '../config'


const http = new Http()


export const  API_DELIVERY_ORDER_CHECK =  (data) => http.post(`delivery/order/check/${data.sn}`, data)
export const  API_DELIVERY_ORDER_FINISH =  (data) => http.post(`delivery/order/finish/${data.sn}`, data)
export const  API_DELIVERY_ORDER_TAKE =  (data) => http.post(`delivery/order/take/${data.sn}`, data)
export const  API_DELIVERY_ORDER_SHOW =  (data) => http.post(`delivery/order/show/${data.sn}`, data)
export const  API_DELIVERY_ORDER_INDEX =  (data) => http.post(`delivery/order/index`, data)
export const  API_DELIVERY_ORDER_TOTAL =  () => http.post(`delivery/order/total`)