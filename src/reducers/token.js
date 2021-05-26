import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { INITTOKEN } from '../constants/token'


export default createReducer(fromJS({
  token: ''
}),{
  [INITTOKEN]:(state, action) => {
    return state.merge({
      token: action.token
    })
  }
})
