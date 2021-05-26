import {
  INITTOKEN
} from '../constants/token'


export const init = (token) => {
  return {
    type: INITTOKEN,
    token
  }
}
