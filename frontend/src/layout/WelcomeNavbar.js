import React from 'react';
import { Link } from 'react-router-dom';


export default function WelcomeNavbar() {
  return (
    <div>
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">

                <a className="navbar-brand text-center fw-bold" >GeoApp</a>
                <div className='buttonContainer'>
                  <Link className='btn btn-outline-light linkButton' to = "/login">Logowanie</Link> 
                  <Link className='btn btn-outline-light linkButton' to = "/register">Rejestracja</Link>                  
              </div>

            </div>
        </nav>
        
    </div>
  );
}
