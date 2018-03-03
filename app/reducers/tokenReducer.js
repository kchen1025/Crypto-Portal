import {
    STORE_ACCESS_TOKEN
} from 'tokenActions'

export default function tokenReducer(state={
    access_token:'',
    refresh_token:''
  }, action) {

    switch (action.type) {
        case STORE_ACCESS_TOKEN:{
            return{
                ...state,
                access_token:action.payload
            }
        }

        default:
        return state;
    }

    return state
}
