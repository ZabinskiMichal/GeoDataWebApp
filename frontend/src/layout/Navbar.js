import { Button } from 'bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import FileSaver from 'file-saver';



export default function Navbar() {

  const { auth } = useAuth();
  const token = auth.accessToken;

  const handleGenerateRaport = async () => {

    console.log("proba generowania raportu")

    try {
      const response = await axios.get("/points/generateraport", 
      { responseType: 'blob',

        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const fileName = 'raport.csv';
      const blob = new Blob([response.data], { type: 'text/csv' });

      FileSaver.saveAs(blob, fileName);


      console.log("wygenerowano raport");
      // console.log("odpowiedz: ", response);

    } catch (err) {
      console.error("Błąd podczas generowania raportu:", err);
    }
  };

  const handleLogout = async () => {

    window.location.reload();

    window.location.href = 'http://localhost:3000/';
  } 




  

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
                  
                  <button type='button' className='btn btn-danger' onClick={() => handleLogout()}>Wyloguj się</button>

              </div>

            </div>
        </nav>
        
    </div>
  );
}
