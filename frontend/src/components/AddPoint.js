import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';


export default function AddPoint() {
    let navigate=useNavigate();

    const { auth } = useAuth();
    const token = auth.accessToken;


    const [point, setPoint]=useState({
        title:"",
        description:"",
        longitude:"",
        price:"",
        latitude:"",
    });

    const [error, setError] = useState("");


    const {title, description, longitude, price, latitude}=point;

    const onInputChange=(e)=>{
        setPoint({...point,[e.target.name]:e.target.value})
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/geodataapp/points/create", 
            point, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            navigate("/User");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("cos nie działa");
            } else {
                setError("cos nie dziąła v2");
            }
        }
    };

    



  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>

                <h2 className='text-center m-4'>dodaj nowy punkt</h2>
                {error && <div className="alert alert-danger">{error}</div>}


                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor="title" className='form-label'>
                                Tytuł
                            </label>

                            <input type={"text"}
                             className='form-control' 
                             placeholder='dodaj tytył punktu' 
                             name="title"
                            value={title}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>


                        <div className='mb-3'>
                            <label htmlFor="description" className='form-label'>
                                description
                            </label>
                            <input type={"text"} className='form-control' placeholder='opis' name="description"
                            value={description}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>


                        <div className='mb-3'>
                            <label htmlFor="longitude" className='form-label'>
                              długosc goegoraficzna

                            </label>
                            <input type={"text"} className='form-control' placeholder='dlugosc' name="longitude"
                            value={longitude}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>


                        <div className='mb-3'>
                            <label htmlFor="szeroskosc" className='form-label'>
                              Szerokosc

                            </label>
                        
                            <input type={"text"} className='form-control' placeholder='szerokosc' name="latitude"
                            value={latitude}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>

                      

                        <button type='submit' className='btn btn-outline-success'>
                            dodaj
                        </button>

                        <Link className='btn btn-outline-danger mx-2' to="/">
                            anuluj
                        </Link>

                    </form>
            </div>
        </div>
    </div>
  )
}