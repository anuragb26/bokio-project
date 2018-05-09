import React, { Component } from 'react';
import "../css/components.css";
import {SingleSavedData} from "./singleSavedData";

export  class SavedDataTable extends Component{

   constructor(props){
       super(props);
       this.state = {   
           data:''
       }
   }

   
   loadSavedData(transactionData){
       return(
            transactionData.map((record,index) =>{
                return (
                    <SingleSavedData
                        date={record.date}
                        amount={record.amount}
                        text={record.text}
                        index={index}
                    />
                )
            })
        )
   }
    render(){
        const {transactionData} = this.props;
        console.log(transactionData);
        return(
            <div className="flex-column">
                {this.loadSavedData(transactionData)}
                
            </div>
        )
    }
}