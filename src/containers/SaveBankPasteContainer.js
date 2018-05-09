import React, { Component } from 'react';
import {TextArea,
        ParsedTable
        } from '../components';
import {connect} from 'react-redux';
import {parseTransactions,
    submitTransactions,
    duplicateTransactions} from '../actions/action-dispatchers';


export class SaveBanking extends Component{

    constructor(props){
        super(props);
        this.state ={
            parsedData:{
                'data':[],
                'columns':[],
                'validKeys':[]
            }
        }
        this.parseTransactions = this.parseTransactions.bind(this);
        this.submitTransactions = this.submitTransactions.bind(this);
        this.changeColumns = this.changeColumns.bind(this);
        this.checkDuplicate = this.checkDuplicate.bind(this);
    }


    componentWillReceiveProps(nextProps){
        
        // if(!nextProps.savedTransactions.loading && nextProps.savedTransactions.hasOwnProperty('data')){
        //     this.parseTransactions('');
        //     this.props.history.push('/show');
        // }
        if(!nextProps.parsedTransactions.loading &&
             nextProps.parsedTransactions.hasOwnProperty('data')
            && JSON.stringify(nextProps.parsedTransactions.data) !==JSON.stringify(this.props.parsedTransactions.data)){
                
          this.setState({parsedData:this.getClassifiedDatafromParsedTransactions(nextProps.parsedTransactions.data)})   
        }
    }
    parseTransactions(data){
        this.props.parseTransactions(data);
    }

    submitTransactions(data){
        // this.parseTransactions("");
        this.props.submitTransactions(data);
        this.props.history.push('/show');
    }

    getClassifiedDatafromParsedTransactions(apiRecordsData){
        
        let dataObject = {'columns':[],'data':[],'validKeys':[]}
        let validKeys = {'Date':'date','Message':'text','Sum':'amount'};
        if(!apiRecordsData){
            alert('Please enter tabular data from your bank account')
            this.props.parseTransactions("");
            return dataObject;
        }
        if(!apiRecordsData.suggestions || !apiRecordsData.rows){
            this.props.parseTransactions("");
            return dataObject;
        }

        apiRecordsData.suggestions.forEach((record) =>{
            dataObject.columns.push({
                'Header':record.selectedOption.label,
                'accessor':`cell_${record.index}`,
                'options':record.options,
                'selectedKey':record.selectedOption.key
            })
            Object.keys(validKeys).indexOf(record.selectedOption.key) > -1 && (dataObject.validKeys.push({
               'key': `cell_${record.index}`,
               'name':validKeys[record.selectedOption.key]
            }
            ))
        })
        dataObject.validKeys.push({'key':'id','name':'id'});
        apiRecordsData.rows.forEach((record,index)=>{
            let rowData = {};
            record.cells.forEach((cell)=> {
                rowData[`cell_${cell.index}`] = cell.cleanedValue
            })
            rowData['id'] = index;
            dataObject.data.push(rowData)
        })
        return dataObject;
    }
    changeColumns(updatedParsedData){
        this.setState({
            parsedData:{
                data:this.state.parsedData.data,
                columns:updatedParsedData.columns,
                validKeys:updatedParsedData.validKeys
            }
        })
    }
    checkDuplicate(transactionData){
        this.props.duplicateTransactions(transactionData);
    }
    render(){
        const {parsedTransactions} = this.props;
        console.log('parsedTransactions',parsedTransactions.data!=null);
        return(
            <div className="save-banking">
            <section>
                <div className="row-layout center">
                    {( this.state.parsedData.data.length > 0
                    )?(
                        <ParsedTable
                         parsedData = {this.state.parsedData}
                         onSubmit = {this.submitTransactions}
                         changeColumns = {this.changeColumns}
                         checkDuplicate = {this.checkDuplicate}
                        />
                        ):
                         (<div>
                             <div className="center-heading">
                                <h2>Add Bank Paste below</h2>
                                <h3><a className="anchor" target="_blank" href="https://app.bokio.se/demo/bank">Refer this link</a></h3>
                            </div>
                            <TextArea 
                               onSave = {this.parseTransactions}
                            />
                           </div>)
                    }
                </div>
            </section>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    parsedTransactions:state.parsedTransactions,
    savedTransactions:state.savedTransactions
})

const mapDispatchToProps = (dispatch) =>{
    return { parseTransactions: (data)  => dispatch(parseTransactions(data)),
             submitTransactions: (data) => dispatch(submitTransactions(data)),
             duplicateTransactions:(data) => dispatch(duplicateTransactions(data))
           }
}

export const SaveBankingContainer = connect(mapStateToProps,mapDispatchToProps)(SaveBanking);

