import React from 'react';
import '../css/components.css';
import newdata from '../assets/images/newdata.svg';
import save from '../assets/images/save.svg';
import { Link } from 'react-router-dom';

export const Landing = ()=>(
    <div className="landing">
      
        <div className="hero-text-box">
            <h1>BOKIO-Accounting made fun</h1>
        </div>
      <div className="flex-landing">
                    
                    <div>
                        <Link className="button" to="/save">  
                            New Bank Data
                        </Link>
                    </div>
                    <div>
                        <Link className="button" to="/show">Show Saved Data</Link>
                    </div>
      </div>
    </div>
)