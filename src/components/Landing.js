import React from 'react';
import '../css/landing.css';
import logo from '../assets/images/logo.jpeg';
import { Link } from 'react-router-dom';

export const Landing = ()=>(
    <div className="landing">
      <nav>
          <div className="row-layout">
              <img src={logo} alt="Omnifood logo" className="logo" />
          </div>
      </nav>
      <div className="hero-text-box">
                <h1>BOKIO-Accounting made fun</h1>
                <Link className="btn btn-ghost" to="/save">New Bank Data</Link>
                <Link className="btn btn-ghost" to="/save">Show Saved Data</Link>
      </div>
    </div>
)