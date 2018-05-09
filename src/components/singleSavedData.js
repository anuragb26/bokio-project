import React, { Component } from 'react';
import ReactTable from 'react-table'
// import ReactDataGrid from 'react-data-grid';
import "../css/components.css";
import plus from  "../assets/images/plus.svg";
import minus from "../assets/images/minus.svg";
import action from "../assets/images/action.svg";

export  class SingleSavedData extends Component{

   constructor(props){
       super(props);
       this.state = {   
           hidden:true
       }
       this.toggleActionContainer = this.toggleActionContainer.bind(this);
   }
   toggleActionContainer(){
       this.setState({hidden:!this.state.hidden});
   }
    render(){
        const {amount,date,text,index} = this.props;
        return(
            <div className="flex-column m-b-5" key={index}>
                        <div className="flex-row odd  space-between " onClick = {this.toggleActionContainer}>
                            <div className="text">
                               {text}
                            </div>
                            <div className="amount">
                                {amount}
                            </div>
                            <div className="date-flex"> 
                                <div className="date">
                                    {date}
                                </div>
                                <div>
                                    {(this.state.hidden)?(<img src={plus} height="25" />):(<img src={minus} height="25" />)}
                                </div>
                            </div>
                        </div>
                        <div className= {`${(this.state.hidden)?("hide"):("")}`}>
                        <div className="actions-flex">
                            <div className="flex">
                                <img src={action} height="25" className="m-r-5"/>
                                <h5>Book Keeping Action One</h5>
                            </div>
                            <div className="flex">
                                <img src={action} height="25" className="m-r-5"/>
                                <h5>Book Keeping Action Two</h5>
                            </div>
                            <div className="flex">
                                <img src={action} height="25" className="m-r-5"/>
                                <h5>Book Keeping Action Three</h5>
                            </div>
                        </div>
                        </div>
            </div>
        )
    }
}