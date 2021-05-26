import Http from '../config'


const http = new Http()

export const API_AUTH_LOGOUT = (data) => http.get(`auth/logout`, data)

export const API_AUTH_UPDATE = (data) => http.post(`auth/update`, data)

export const API_AUTH_UNTIE = (data) => http.post(`auth/untie`, data)

export const API_AUTH_AUTHORIZE = (data) => http.post(`auth/authorize`, data)

export const API_AUTH_SEND = (data) => http.post(`auth/send`, data)

export const API_AUTH_TENANT = (data) => http.post(`auth/tenant`, data)

export const API_AUTH_LOGIN = (data) => http.post(`auth/login`, data)

export const API_AUTH_BIND = (data) => http.post(`auth/bind`, data)

export const API_AUTH_USER = (data) => http.post(`auth/user`, data)

export const API_AUTH_UNIONID = (data) => http.post(`auth/getUnionId/${data.code}`)

export const API_AUTH_WXUSER = (data) => http.post(`auth/wxUser`,data)

export const API_AUTH_BINDWX = (data) => http.post(`auth/bindWx`,data)