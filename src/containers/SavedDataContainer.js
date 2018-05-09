import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SavedDataTable} from "../components";
import {getTransactions} from '../actions';
import { Link } from 'react-router-dom';

export class SavedData extends Component{

    constructor(props){
        super(props);
        this.state = {
            submittedData:[]
        }
    }

    componentDidMount(){
        this.props.getTransactions();
    }

    componentWillReceiveProps(nextProps){
        if( nextProps.fetchTransactions.hasOwnProperty('data') &&
        JSON.stringify(nextProps.fetchTransactions.data)!=JSON.stringify(this.props.fetchTransactions.data)){
            this.setState({submittedData:nextProps.fetchTransactions.data})
        }
    }
    render(){
        const {fetchTransactions}=this.props;
        return(
            <div>
                <div className="row-layout center">
                    <div className="col col-1-block">
                        <h2 class="heading">Book-keeping Data</h2>
                        <h5>Refresh in a while to see newly added data</h5>
                    </div>
                </div>
                <div className="row-layout center">
                    <div className="col col-1-block">
                        <div className="saved-table">
                        {(Array.isArray(this.state.submittedData)&&
                        this.state.submittedData.length > 0)?(
                            <SavedDataTable
                            transactionData = {this.state.submittedData} />):
                            (<div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fetchTransactions:state.fetchTransactions
})

 const mapDispatchToProps = (dispatch) =>{

     return { getTransactions: () => dispatch(getTransactions())
            }
 }

export const SavedDataContainer = connect(mapStateToProps,mapDispatchToProps)(SavedData);

