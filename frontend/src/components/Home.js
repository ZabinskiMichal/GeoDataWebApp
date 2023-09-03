import React from 'react'
import { Link } from 'react-router-dom'
import WelcomeNavbar from '../layout/WelcomeNavbar'


export default function Home() {
  return (

    // <div className="welcome-component">
    <div className="user-container">

    {/* <h1>GeoApp</h1>

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
    </div> */}

    <WelcomeNavbar />
    

    <div className='home-component'>

    <div>

      <img src="https://github.com/ZabinskiMichal/GeoDataWebApp/blob/welcome_layout/images/img1.png?raw=true" alt="Opis zdjęcia" className='welcome-image'/>



    </div>


    <h3>
      Wnieś swoją pracę w terenie na wyższy level 
    </h3>
    <p>
      <li>
        dodawanie punktów na podstawie lokalizacji
      </li>
      <li>
        przeglądnie punktów na mapie
      </li>
    </p>

    </div>

    



  </div>

  )
}
