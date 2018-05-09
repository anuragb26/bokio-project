import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SavedDataTable} from "../components";
import {getTransactions} from '../actions';

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
                    </div>
                </div>
                <div className="row-layout center">
                    <div className="col col-1-block">
                        <div className="saved-table">
                        {(Array.isArray(this.state.submittedData)&&
                        this.state.submittedData.length > 0)?(
                            <SavedDataTable
                            transactionData = {this.state.submittedData ||[{"date":"26/07/1991","text":"My birthday","amount":"10,000rs"}]} />):
                            (null)
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

