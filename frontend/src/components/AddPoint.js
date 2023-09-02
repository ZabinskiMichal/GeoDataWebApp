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


    const {title, description, longitude, latitude}=point;

    const onInputChange=(e)=>{
        setPoint({...point,[e.target.name]:e.target.value})
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/geodataapp/points/create", 
            JSON.stringify({
                title: title, 
                description: description,
                longitude: longitude, 
                latitude: latitude, 
            }), {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
            navigate("/User");
            console.log("title: ", title);
            console.log("desc: ", description);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("cos nie działa");
            } else {
                setError("cos nie dziąła v2");
            }
        }
    };




    const findMe = () => {

    
        const success = (position) => {
          console.log(position.coords.latitude)
          console.log(position.coords.longitude)

          const updatedPoint = { ...point };
        
          updatedPoint.longitude = position.coords.latitude;
          updatedPoint.latitude = position.coords.longitude;
          setPoint(updatedPoint);
        }
    
        const error = () => { 
          console.log("nie wyraziłeś zgody na lokalizacje :( ")
        }

        navigator.geolocation.getCurrentPosition(success, error);        
    }

    



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
                                Opis punktu
                            </label>
                            <input type={"text"} className='form-control' placeholder='opis powinen zawierać kluczowe informacje o punkcie ' name="description"
                            value={description}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>


                        <div className='mb-3'>
                            <label htmlFor="longitude" className='form-label'>
                              długość goegoraficzna

                            </label>
                            <input type={"text"} className='form-control' placeholder='np. 53.40' name="longitude"
                            value={longitude}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>


                        <div className='mb-3'>
                            <label htmlFor="szeroskosc" className='form-label'>
                              szerokość geograficzna
                            </label>
                        
                            <input type={"text"} className='form-control' placeholder='np. 14.60' name="latitude"
                            value={latitude}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>

                      

                  
                        <button type="button" className='btn btn-outline-primary' onClick={() => findMe()}>
                            zlokalizuj mnie
                        </button>


                        <button type='submit' className='btn btn-outline-success'>
                            dodaj
                        </button>


                        <Link className='btn btn-outline-danger' to="/User">
                            anuluj
                        </Link>

                    </form>
            </div>
        </div>
    </div>
  )
}