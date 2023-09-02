import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { marker } from 'leaflet';



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

  const deletePoint = async(id) => {
    await axios.delete(`http://localhost:8080/geodataapp/points/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    loadPoints();
  }


  return (

    <div className='container'>

      <div className='py-3'>

      <table className="table border shadow">
        
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tytuł</th>
            <th scope="col">Współrzędne</th>
            <th scope="col">Wybór</th>
          </tr>
        </thead>
        <tbody>

        
        {points.map((point, id) => (
          <tr>
            <th scope='row' key={id}>{id + 1}</th>
            <td>{point.title}</td>
            <td>[{point.longitude.toFixed(2)} , {point.latitude.toFixed(2)}]</td>
            <td>
              <Link className="btn btn-primary mx-2 login-button" to={`/viewpoint/${point.id}`}>Szczegóły</Link>
              <Link className='btn btn-primary mx-2' to={`/editpoint/${point.id}`}>Edycja</Link>
              <button className="btn btn-danger mx-2" onClick={() => deletePoint(point.id)}>Usuń</button>

            </td>


          </tr>
        ))}
          
        </tbody>
      </table>

    </div>
    </div>


  )
}
