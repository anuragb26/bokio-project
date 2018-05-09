import React, { Component } from 'react';
import ReactTable from 'react-table'
// import ReactDataGrid from 'react-data-grid';
import "../css/components.css";
import 'react-table/react-table.css'

export  class ColumnMapping extends Component{

   constructor(props){
       super(props);
       this.state = {
           hidden:true,
           optionsSelected:[]
       }
       this.changeMapping = this.changeMapping.bind(this);
       this.changeColumns = this.changeColumns.bind(this);
   }
   componentDidMount(){
       this.setState({
           optionsSelected:this.props.parsedData.columns.map((column)=>column.selectedKey)
       })
    //    console.log('options selected in did mount',this.state.optionsSelected);
   }
   componentWillReceiveProps(nextProps){
    this.setState({
        optionsSelected:nextProps.parsedData.columns.map((column)=>column.selectedKey)
    })
 //    console.log('options selected in did mount',this.state.optionsSelected);
    }
   changeMapping(event){
       console.log(event.currentTarget.id);
       const dropDownIndex = event.currentTarget.id.split("_")[1];
       let optionsSelected = this.state.optionsSelected;
       optionsSelected[dropDownIndex]=event.currentTarget.value;
       this.setState({optionsSelected:optionsSelected});
   }
   changeColumns(){
       let frequencyObject = this.state.optionsSelected.reduce((prev, curr) => {
                                                                    prev[curr] = ++prev[curr] || 1
                                                                    return  prev}, {})
       if(frequencyObject.Date!=1 || frequencyObject.Message != 1 || frequencyObject.Sum!=1){
           alert('Please have one Datum column,one Meddelende column and one Summa Column');
       }
       else{
           this.setState({hidden:!this.state.hidden});
           this.props.changeColumns(this.state.optionsSelected);
       }
   }
    render(){
        const {parsedData} = this.props;
        return(
            <div className="column-mapping-container">
                <h3 className={`button ${!this.state.hidden?("hide"):("")}`} onClick ={()=> this.setState({hidden:!this.state.hidden})} >Change Columns</h3>
                    <div className= {`${this.state.hidden?("hide"):("")}`} >
                        <div className="column-mapping flex  space-between m-b-5">
                            {parsedData.columns.map((column,index) => (
                                <div className="m-r-5" key={index}>
                                    <select value={this.state.optionsSelected[index]}
                                     id={`index_${index}`}
                                     onChange = {this.changeMapping}>
                                        {
                                            column.options.map((option,index)=>
                                                (<option key={index} value={option.key}>{option.label}</option>)
                                                )
                                        }
                                    </select>
                                </div>
                            ))}
                        </div>
                    <div className="mapping-button">
                        <a className="button" href="#" onClick = {this.changeColumns}>Change Mapping</a>
                    </div>
                    </div>
                
            </div>
        )
    }
}