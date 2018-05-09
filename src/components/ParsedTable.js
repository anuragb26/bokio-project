import React, { Component } from 'react';
import ReactTable from 'react-table'
// import ReactDataGrid from 'react-data-grid';
import "../css/components.css";
import 'react-table/react-table.css'
import {ColumnMapping} from "./ColumnMapping";

export  class ParsedTable extends Component{

   constructor(props){
       super(props);
       this.state = {
           columns:[],
           data:[],
           validKeys:[]
       }
       this.onSaveData = this.onSaveData.bind(this);
       this.onSubmitData = this.onSubmitData.bind(this);
       this.changeColumns = this.changeColumns.bind(this);
       this.getDuplicateCheckedData  = this.getDuplicateCheckedData.bind(this);
   }
  
   componentDidMount(){
    this.setState({
        columns:this.props.parsedData.columns,
        data:this.props.parsedData.data,
        validKeys:this.props.parsedData.validKeys
    })
   }
   componentWillReceiveProps(nextProps){
       console.log('in nextProps',nextProps);
       this.setState({
        columns:nextProps.parsedData.columns,
        data:nextProps.parsedData.data,
        validKeys:nextProps.parsedData.validKeys
        })
    }
   getApiDataFormattedValue(record,keyObject){
       switch(keyObject.name)
       {
            case "date":
                return new Date(record[keyObject.key]).toISOString();
            case "amount":
                return Number(record[keyObject.key].replace(/\s+/g, '').split(",").join(""));
            default:
                return record[keyObject.key];
       }
   }
   onSubmitData(){
    
    console.log(this.props.parsedData);
    
    const transactionsData = this.state.data.map((record)=>{
        let singleRecordToSave ={};
        this.state.validKeys.forEach((keyObject)=> 
        singleRecordToSave[keyObject.name] = this.getApiDataFormattedValue(record,keyObject));
        return singleRecordToSave;
    })
    console.log('transactionData');
    console.log(transactionsData);   
    this.props.onSubmit(transactionsData);
    
   }
   onSaveData(){
       this.props.onSaveData()
   }
   changeColumns(columnOrder){
       console.log('in change columns');
       console.log(columnOrder);
       console.log(this.state);
       const updatedColumns = this.state.columns.map((columnInfo,index) => {
                                                            columnInfo.selectedKey = columnOrder[index]
                                                           const currentSelectedOption= columnInfo.options.find((option)=>option.key==columnOrder[index])
                                                           columnInfo.Header = currentSelectedOption.label
                                                           return columnInfo
                                                        })
        let updatedValidKeys =[];
        const keyMapper = {'Date':'date','Message':'text','Sum':'amount'};
        columnOrder.forEach((columnName,index)=> {
            (columnName!="None")?(updatedValidKeys.push({
                                "key":`cell_${index}`,
                                "name":keyMapper[columnName]
            })):(null)
        })
        updatedValidKeys.push({'key':'id','name':'id'});
        
        console.log('updation');
        console.log(updatedColumns);
        console.log(updatedValidKeys);
        this.props.changeColumns({
            columns:updatedColumns,
            validKeys:updatedValidKeys
        });
    //    console.log(this.state.columns);
    //    console.log(this.state.)

   }

   getDuplicateCheckedData(){
    const transactionsData = this.props.parsedData.data.map((record)=>{
        let singleRecordToSave ={};
        this.state.validKeys.forEach((keyObject)=> 
        singleRecordToSave[keyObject.name] = this.getApiDataFormattedValue(record,keyObject));
        return singleRecordToSave;
    })
    this.props.checkDuplicate(transactionsData);
   }
   
    render(){
        const {parsedData} = this.props;
        console.log('in parsedTable');
        return(
            <div>
                <ColumnMapping parsedData = {this.state}
                    changeColumns = {this.changeColumns}
                    />
               
                <div className="Table">
                    <ReactTable
                        data={this.state.data}
                        columns={this.state.columns}
                        defaultPageSize={5}
                    />
                    <div className="flex-single-button">
                        <a className="button button-single" href="#" onClick = {this.onSubmitData}>Submit</a>
                    </div>
                </div>
            </div>
        )
    }
}