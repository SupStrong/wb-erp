import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { INITUSER } from '../constants/userInfo'


export default createReducer(fromJS({
    userInfo: {
        menus: [],
        mobile: "",
        staff_id: "",
        tenant_id: ""
    },
}), {
    [INITUSER]: (state, action) => {
        return state.merge({
            userInfo: action.userInfo
        })
    },
})