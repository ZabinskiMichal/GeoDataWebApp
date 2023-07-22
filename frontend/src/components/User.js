import React from 'react'
import { Link } from 'react-router-dom'

export default function 
() {
  return (

  <div className="button-container">
    <p>Witamy na podstronie usera</p>
      <Link to="/map">
        <button className="login-button">Przedź do mapy</button>
      </Link>
  </div>
    
  )
}
