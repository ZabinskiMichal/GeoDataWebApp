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

    <h3 style={{ color: 'white' }}>
      Wznieś swoją pracę w terenie na wyższy level 
    </h3>

    <br />

    <div>
      <img src="https://github.com/ZabinskiMichal/GeoDataWebApp/blob/welcome_layout/screenshots/img1.png?raw=true" alt="Opis zdjęcia" className='welcome-image'/>
    </div>

    <br />




    <p style={{ color: 'lightblue' }}>
      <li>
        dodawanie punktów na podstawie lokalizacji
      </li>

      <li>
        przeglądanie punktów na mapie
      </li>

      <li>
        generowanie raportów 
      </li>

      <li>
        dashboard z punkami
      </li>
    </p>

    <div>
      <img src="https://github.com/ZabinskiMichal/GeoDataWebApp/blob/welcome_layout/screenshots/img2.png?raw=true" alt="Opis zdjęcia" className='welcome-image'/>
    </div>

    </div>

  </div>

  )
}
