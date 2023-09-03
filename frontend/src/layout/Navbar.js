import { Button } from 'bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';






export default function Navbar() {

  const { auth } = useAuth();
  const token = auth.accessToken;

  const handleGenerateRaport = async () => {

    console.log("proba generowania raportu")

    try {
      const response = await axios.post("/points/generateraport",
      JSON.stringify({
        path: "./",
      }), 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("wygenerowano raport");
      console.log("odpowiedz: ", response);

    } catch (err) {
      console.error("Błąd podczas generowania raportu:", err);
    }
  };


  return (
    <div>
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">

                <a className="navbar-brand text-center fw-bold" >Panel usera</a>
                <div className='buttonContainer'>
                  <Link className='btn btn-outline-light linkButton' to = "/map">Przejdź do mapy</Link> 
                  <Link className='btn btn-outline-light linkButton' to = "/addpoint">Dodaj nowy punkt</Link>     
                  {/* <button type="button" className='btn btn-outline-light linkButton' onClick={() => handleGenerateRaport()}>Generuj raport</button>              */}
                  <button type="button" className='btn btn-outline-light linkButton' onClick={handleGenerateRaport}>Generuj raport</button>             

              </div>

            </div>
        </nav>
        
    </div>
  );
}
