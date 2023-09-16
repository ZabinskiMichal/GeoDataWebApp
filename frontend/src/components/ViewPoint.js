import axios from 'axios'
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from '../hooks/useAuth';


export default function ViewPoint(){



    const { auth } = useAuth();
    const token = auth.accessToken;


    const [point, setPoint]=useState({
        title:"",
        description:"",
        longitude:"",
        latitude:"",
        createdAt:"",
    });

    const {id} = useParams();


    useEffect(() => {
        loadPoint();

    }, [])

    const loadPoint = async () => {
        const result = await axios.get(`http://localhost:8080/geodataapp/points/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("pobrano punktu: ", result.data)
        console.log("utworono: ", result.data.createdAt)

        

        setPoint(result.data);
    }

    const formatDate = (timestamp) => {

        const year = timestamp[0];
        const month = timestamp[1]
        const day = timestamp[2]
    
        const hours = timestamp[3]
        const minutes = timestamp[4]
    
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      };

    

    return(
        <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Szeczegóły punktu</h2>

                <div className="card">
                    <div className="card-header">

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Tytył: </b>
                                {point.title}
                            </li>

                            <li className="list-group-item">
                                <b>Opis: </b>
                                {point.description}

                            </li>

                            <li className="list-group-item">
                                <b>Długośc geograficzna: </b>

                                {parseFloat(point.longitude).toFixed(2)}


                            </li>

                            <li className="list-group-item">
                                <b>Szerokość geograficzna: </b>
                                {/* {point.latitude} */}
                                {parseFloat(point.latitude).toFixed(2)}


                            </li>

                            <li className="list-group-item">
                                <b>Utworzono: </b>
                                {formatDate (point.createdAt)}

                            </li>

                        
                        </ul>
                    </div>
                </div>

                <Link className="btn btn-primary my-2" to={"/User"}> Powrót do menu</Link>
                </div>
            </div>
        </div>
        
    )

}