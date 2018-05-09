import {PARSE_TRANSACTIONS_PROGRESS,
    PARSE_TRANSACTIONS_SUCCESS,
    PARSE_TRANSACTIONS_FAILURE} from '../actions';

export default function(state={},action){
switch(action.type){
    case PARSE_TRANSACTIONS_PROGRESS:
        console.log('in payload progress');
        console.log(action.payload);
        return {
            loading:action.payload,
            data:null
        }
    case PARSE_TRANSACTIONS_SUCCESS:
        console.log('in payload fetched');
        console.log(action.payload);
        return{
            loading:false,
            data:action.payload.data
        }
    case PARSE_TRANSACTIONS_FAILURE:
        console.log('in payload failure');
        console.log(action.payload);
        return {
            loading:false,
            data:action.payload
        }
    default:
        return state;
}
}