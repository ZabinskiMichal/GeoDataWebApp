import React from 'react'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

export default function DeletePoint({ id, loadPoints }) {

    const { auth } = useAuth();
    const token = auth.accessToken;


    const handleDelete = async () => {
        try {
          await axios.delete(`/points/delete/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("Punkt został usunięty");
          loadPoints()
  
        } catch (err) {
          console.error("Błąd podczas usuwania punktu:", err);
        }
      };


      return (
        <button className="delete-button" onClick={handleDelete}>Usuń punkt</button>
        // <button className="btn btn-outline-danger" onClick={handleDelete}>Usuń punkt</button>
      )
}
