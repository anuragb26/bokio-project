import React, { Component } from 'react';
import "../css/components.css";

export  class TextArea extends Component{

   constructor(props){
       super(props);
       this.state = {
           data:''
       }
       this.onTextAreaChange = this.onTextAreaChange.bind(this);
       this.onSaveData =this.onSaveData.bind(this);
   }

   onTextAreaChange(event){
    console.log(event);
    this.setState({data: event.target.value})
   }
   
   onSaveData(event){
       event.preventDefault();
       this.props.onSave(this.state.data);
   }

    render(){
        return(
            <div>
                <textarea placeholder="Paste Bank Data here"
                            rows="20"
                            name="comment[text]"
                            cols="40"
                            value={this.state.data}
                            onChange = {this.onTextAreaChange}>
                    {/* {this.state.data} */}
                </textarea>
                <div className="flex-single-button">
                    <a className="button button-single" href="#" onClick = {this.onSaveData}>Save</a>
                </div>
            </div>
        )
    }
}