import React from 'react';
import { Link } from 'react-router-dom';


export default function WelcomeNavbar() {
  return (
    <div>
     
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary welcome-navbar"> */}
      <nav className="navbar navbar-expand-lg navbar-dark welcome-navbar">

            <div className="container-fluid">

               {/* <a className="navbar-brand text-center fw-bold" >GeoApp</a> */}
               <h1 style={{ color: 'white' }}>GeoApp</h1>


                <div className='buttonContainer'>
                  <Link className='btn btn-outline-light linkButton' to = "/login">Zaloguj się</Link> 
                  {/* <Link className='btn btn-outline-light linkButton' to = "/register">Rejestracja</Link>                   */}
              </div>

            </div>
        </nav>
        
    </div>
  );
}
