import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (

    <div className="welcome-component">
    <p>Witamy w aplikacji do zbierania danych geo</p>
    <div className="button-container">
      <Link to="/login">
        <button className="login-button">Logowanie</button>
      </Link>
      <Link to="/register">
        <button className="register-button">Rejestracja</button>
      </Link>
    </div>
  </div>

  )
}
