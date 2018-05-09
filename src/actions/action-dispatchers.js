import 'babel-polyfill';
import axios from 'axios';
import {apiUrls} from '../constants';
import *  as actions from './action-types';

export function parseTransactions(data){

    return async function(dispatch){
        if(!data){
            dispatch({
                type:actions.PARSE_TRANSACTIONS_SUCCESS,
                payload:{
                    'data':null
                }
                });

        }
        else{
            dispatch(
                    {type: actions.PARSE_TRANSACTIONS_PROGRESS,
                    payload:true
                    }
                    )
            try{
                    const res = await axios.post(apiUrls['parseApi'],{"text":data});
                    dispatch({
                            type:actions.PARSE_TRANSACTIONS_SUCCESS,
                            payload:res
                            });
                }
            catch(err){
                dispatch({
                    type:actions.PARSE_TRANSACTIONS_FAILURE,
                    payload:err.response
                 });
            }
        }  
    }
  
  }

  export function submitTransactions(data){

    return async function(dispatch){
        dispatch(
                {type: actions.SUBMIT_TRANSACTIONS_PROGRESS,
                payload:true
                }
            )
        try{
                const res = await axios.post(apiUrls['saveApi'],data);
                console.log('res',res);
                dispatch({
                        type:actions.SUBMIT_TRANSACTIONS_SUCCESS,
                        payload:res
                        });
            }
        catch(err){
            dispatch({
                type:actions.SUBMIT_TRANSACTIONS_FAILURE,
                payload:err.response
                });
        }  
    }
  
  }


  export function duplicateTransactions(data){

    return async function(dispatch){
        dispatch(
                {type: actions.DUPLICATE_TRANSACTIONS_PROGRESS,
                payload:true
                }
            )
        try{
                const res = await axios.post(apiUrls['previewApi'],{"transactions":data});
                console.log('res',res);
                dispatch({
                        type:actions.DUPLICATE_TRANSACTIONS_SUCCESS,
                        payload:res
                        });
            }
        catch(err){
            dispatch({
                type:actions.DUPLICATE_TRANSACTIONS_FAILURE,
                payload:err.response
                });
        }  
    }
  
  }


  export function getTransactions(){

    return async function(dispatch){
        dispatch(
                {type: actions.FETCH_TRANSACTIONS_PROGRESS,
                payload:true
                }
            )
        try{
                const res = await axios.get(apiUrls['fetchApi']);
                console.log('res',res);
                dispatch({
                        type:actions.FETCH_TRANSACTIONS_SUCCESS,
                        payload:res
                        });
            }
        catch(err){
            dispatch({
                type:actions.FETCH_TRANSACTIONS_FAILURE,
                payload:err.response
                });
        }  
    }
  
  }
  