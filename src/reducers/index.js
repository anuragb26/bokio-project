import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import ParseTransactionReducer from './reducer_parse-transactions';
import savedTransactionReducer from './reducer_save-transactions';
import duplicateTransactionReducer from './reducer_duplicate-transactions';
import fetchTransactionReducer from './reducer_fetch-transactions';

export default combineReducers({
  routing: routerReducer,
  parsedTransactions:ParseTransactionReducer,
  savedTransactions:savedTransactionReducer,
  duplicateTransactions:duplicateTransactionReducer,
  fetchTransactions:fetchTransactionReducer
})