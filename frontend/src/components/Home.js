import React from 'react'
import { Link } from 'react-router-dom'
import WelcomeNavbar from '../layout/WelcomeNavbar'

export default function Home() {
  return (

    <div className="welcome-component">

      
    <h1>GeoApp</h1>

    <h3>
      Wnieś swoją pracę w terenie na wyższy level
    </h3>

    <br />
    <div className="button-container">
      <Link to="/login">
        <button className="btn btn-primary login-button">Logowanie</button>
      </Link>
      <Link to="/register">
        <button className="btn btn-primary register-button">Rejestracja</button>
      </Link>
    </div>

    {/* <WelcomeNavbar /> */}

    {/* <h3> */}
      {/* Wnieś swoją pracę w terenie na wyższy level */}
    {/* </h3> */}



  </div>

  )
}
