import { combineReducers } from 'redux'
import userInfo from './userInfo'
import isIphone from './isIphone'
import token from './token'


export default combineReducers({
  userInfo,
  isIphone,
  token,
})
