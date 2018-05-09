import React,{ Component } from 'react';
// import logo from './logo.svg';
import { Route,withRouter} from 'react-router-dom'
import {SaveBankingContainer} from './containers/SaveBankPasteContainer'
import {SavedDataContainer} from './containers/SavedDataContainer'
import logo from './assets/images/logo.jpeg';
import {Landing} from './components/Landing';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {parseTransactions} from './actions';
import './css/layout.css';
import './css/common.css';
import './css/normalize.css';
import './css/queries.css';


export class AppClass extends Component { 
  
  constructor(props){
    super(props);
  }
  render() {
      return (
    <div>
          <nav className="nav-flex">
          <Link  to="/save">  
                New Bank Data
          </Link>
          <Link to="/">  
                  Home
          </Link>
          <Link to="/show">  
                Save Bank Data
          </Link>      
          </nav>
          <main>
            <Route exact path="/" component={Landing} />
            <Route exact path="/save" component={SaveBankingContainer} />
            <Route exact path="/show" component={SavedDataContainer} />
          </main>
    </div>
    )
  }
}


const mapStateToProps = (state) => ({
  parsedTransactions:state.parsedTransactions,
  savedTransactions:state.savedTransactions
})

const mapDispatchToProps = (dispatch) =>{
  console.log('in dispatch to props');
  return { parseTransactions: (data)  => dispatch(parseTransactions(data))
         }
}

export const App = withRouter(connect(mapStateToProps,mapDispatchToProps)(AppClass));
