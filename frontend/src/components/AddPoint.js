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
        latitude:"",
    });

    const [error, setError] = useState("");

    const {title, description, longitude, latitude}=point;
    
    const [selectedImages, setSelectedImages] = useState([]); 

    const onInputChange=(e)=>{
        setPoint({...point,[e.target.name]:e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (selectedImages.length === 0) { 

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

        } else if (selectedImages.length !== 0){

            try {

                const formData = new FormData();

                formData.append('title', title);
                formData.append('longitude', longitude);
                formData.append('latitude', latitude);
                formData.append('description', description);

                // Dodaj wybrane pliki do formData
                for (let i = 0; i < selectedImages.length; i++) {
                    formData.append('image', selectedImages[i]);
                }

                const response = await axios.post("http://localhost:8080/geodataapp/points/create-with-images", formData, {
                

                headers: {
                    'Authorization': `Bearer ${token}`,
                    //axios sam dobiera odpowieni content type
                },
            }
            
            );
            } catch (err){
                console.log(err)
            }            
            
            navigate("/User");

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


    const handleFileInputChange = (e) => {
        const files = e.target.files;
        setSelectedImages([...selectedImages, ...files]);
        console.log("dodano zdjeica")
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
                                Opis punktu
                            </label>
                            <textarea
                                id="description"
                                className='form-control'
                                placeholder='kluczowe informacje o punkcie (max 255 znaków)'
                                name="description"
                                value={description}
                                onChange={(e) => {
                                if (e.target.value.length <= 255) {
                                    onInputChange(e);
                                }
                                }}
                                maxLength={255}
                                rows={7} // Możesz dostosować wysokość do swoich preferencji
                            />
                        </div>

                        <div className='mb-3'>

                            <label htmlFor="longitude" className='form-label'>
                              Długość goegoraficzna

                            </label>

                            <input type={"text"} className='form-control' placeholder='np. 53.40' name="longitude"
                            value={longitude}
                            onChange={(e)=>onInputChange(e)}
                            required
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="szeroskosc" className='form-label'>
                              Szerokość geograficzna
                            </label>

                            <input type={"text"} className='form-control' placeholder='np. 14.60' name="latitude"
                            value={latitude}
                            onChange={(e)=>onInputChange(e)}
                            required
                            />
                        </div>

                        <label htmlFor='fileInput'>Wybierz zdjęcia:</label>

                      <input
                        type='file'
                        id='fileInput'
                        accept='image/*'
                        multiple 
                        onChange={handleFileInputChange} 
                        />
                        <br />

                        <button type="button" className='btn btn-outline-primary' onClick={() => findMe()}>
                            zlokalizuj mnie
                        </button>

                        <br />

                        <button type='submit' className='btn btn-outline-success'>
                            dodaj
                        </button>

                        <br />

                        <Link className='btn btn-danger' to="/User">
                            anuluj
                        </Link>

                    </form>
            </div>
        </div>
    </div>
  )
}