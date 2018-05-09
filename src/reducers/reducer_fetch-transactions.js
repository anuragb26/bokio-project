import {FETCH_TRANSACTIONS_PROGRESS,
    FETCH_TRANSACTIONS_SUCCESS,
    FETCH_TRANSACTIONS_FAILURE} from '../actions';

export default function(state={},action){
switch(action.type){
    case FETCH_TRANSACTIONS_PROGRESS:
        console.log('in submit payload progress');
        console.log(action.payload);
        return {
            loading:action.payload,
            data:null
        }
    case FETCH_TRANSACTIONS_SUCCESS:
        console.log('in submit payload fetched');
        console.log(action.payload);
        return{
            loading:false,
            data:action.payload.data
        }
    case FETCH_TRANSACTIONS_FAILURE:
        console.log('in submit payload failure');
        console.log(action.payload);
        return {
            loading:false,
            data:action.payload
        }
    default:
        return state;
}
}