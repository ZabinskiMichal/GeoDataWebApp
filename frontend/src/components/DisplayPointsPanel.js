import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';



export default function DisplayPointsPanel() {

  const { auth } = useAuth();
  const token = auth.accessToken;

  const [points, setPoints] = useState([]);

  useEffect(() => {
    loadPoints();
  }, []);

 
  const loadPoints = async () => {
    
    try {
      console.log(token);

      const response = await axios.get('http://localhost:8080/geodataapp/points/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPoints(response.data);
      console.log(response.data)



    } catch (error) {
      console.error('Błąd pobierania punktów:', error);
    }
  };


  return (

    <div className='container'>

      <div className='py-3'>

      <table className="table border shadow">
        
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tytuł</th>
            <th scope="col">wpolrzedne</th>
            <th scope="col">wybór</th>




          </tr>
        </thead>
        <tbody>

        
        {points.map((point, id) => (
          <tr>
            <th scope='row' key={id}>{id + 1}</th>
            <td>{point.title}</td>
            <td>[{point.longitude.toFixed(2)} , {point.latitude.toFixed(2)}]</td>
            <td>
              <butto className="btn btn-primary mx-2">Szczegóły</butto>
              <butto className="btn btn-outline-primary mx-2">Edycja</butto>
              <butto className="btn btn-danger mx-2">Usuń</butto>

            </td>


          </tr>
        ))}
          
        </tbody>
      </table>

    </div>
    </div>


  )
}
