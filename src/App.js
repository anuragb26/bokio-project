import React, { Component } from 'react';
// import logo from './logo.svg';
import { Route, Link } from 'react-router-dom'
import {Home} from './containers/Home'
import {Landing} from './components/Landing';
import './css/layout.css';
import './css/common.css';
import './css/normalize.css';


const App = ()=> (
  <div>
    <main>
      <Route exact path="/" component={Landing} />
      <Route exact path="/save" component={Home} />
    </main>
  </div>
)

export default App;
