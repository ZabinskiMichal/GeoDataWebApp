import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from '../api/axios';
import { useEffect, useState, useRef } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import DeletePoint from './DeletePoint';
import EditPointPopup from './EditPointPopup';
import { faPoundSign } from '@fortawesome/free-solid-svg-icons';

const CREATE_POINT_URL = "/points/create";


export default function MapLayout() {


  const { auth } = useAuth();
  const navigate = useNavigate();

  const [editingMarker, setEditingMarker] = useState(null);
  const[selectedPosition, setSelectedPosition] = useState([0,0]);
  const [marker, setMarker] = useState([]);
  const token = auth.accessToken;




 
  const loadPoints = async () => {
    try {

      console.log(token);

      const response = await axios.get('/points/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response?.data)

      const fetchedMarkers = response.data;
      setMarker(fetchedMarkers);
    } catch (error) {
      console.error('Błąd pobierania punktów:', error);
    }
  };


  useEffect(() => {
    loadPoints();
  }, []);


  const customIcon = new Icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/1200px-Map_marker_font_awesome.svg.png",
    iconSize: [40, 40]
  });


  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</>`,
      className: "custom-marker-cluster",
      iconSize: point(33,33,true)
    });
  };



  const LocationFinder = () => {

    // const[pointId, setPointId] = useState('');
    const[selectedPosition, setSelectedPosition] = useState([0,0]);
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]); 



    const map = useMapEvents({
        click(e) {
          setSelectedPosition([
            e.latlng.lat,
            e.latlng.lng
        ]);  
          console.log(selectedPosition);
        },
    })

    const handleSubmit = async (e) => {
      e.preventDefault();


      if (selectedImages.length === 0) { 
        console.log("nie wybrano zdjec")

      try{
         const response = await axios.post(CREATE_POINT_URL, 
              JSON.stringify({
                title: title, 
                longitude: selectedPosition[0], 
                latitude: selectedPosition[1], 
                description: description}),
              {
                  headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                  },
                  
          //         // withCredentials: true
              });

          console.log("odpowiedz od serwera:");
          console.log(response.data);

          loadPoints();


          //clear input fields from registration form - we might do it
          }catch (err){

          // if(!err?.response) {
          //     setErrMsg("Brak odpowiedzi serwera");
          
          // }else if (err.response?.status == 400){
          //     setErrMsg("Email zajęty")
          // }else{
          //     setErrMsg("Rejestracja nie powiodla sie")
          // }

          // errRef.current.focus();
        }

      }else if (selectedImages.length !== 0){

        try{

          const formData = new FormData();

          formData.append('title', title);
          formData.append('longitude', selectedPosition[0]);
          formData.append('latitude', selectedPosition[1]);
          formData.append('description', description);

          // Dodaj wybrane pliki do formData
          for (let i = 0; i < selectedImages.length; i++) {
            formData.append('image', selectedImages[i]);
          }

          const response = await axios.post("points/create-with-images", formData, {

          headers: {
            'Authorization': `Bearer ${token}`,
            //axios sam dobiera odpowieni content type

          },

    });
 
           console.log("odpowiedz od serwera:");
           console.log(response.data);
 
           loadPoints();
 
           //clear input fields from registration form - we might do it
           }catch (err){

            console.log(err);
         }


      }else{
        console.log("Cos sie wysypało");
      }
    }

    const handleFileInputChange = (e) => {
      const files = e.target.files;
      setSelectedImages([...selectedImages, ...files]);
    };
    
    return (

      selectedPosition ? 

        <Marker position={selectedPosition} icon={customIcon}>

          <Popup>
            <div className="create-point-title">Tworzenie punktu</div>

              <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Tytuł:</label>
                  <input 
                      type='text'
                      id="title"
                      autoComplete='off'
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      required
                />

                <label htmlFor='description'>Opis:</label>
              
                <textarea
                  id="description"
                  autoComplete="off"
                  // onChange={(e) => setDescription(e.target.value)}
                  onChange={(e) => {
                    if (e.target.value.length <= 255) {
                      setDescription(e.target.value);
                    }
                  }}
                  value={description}
                  required
                  rows={6} 
                  cols={40} 
                  style={{ resize: "vertical" }} 
                />

                <label htmlFor='fileInput'>Wybierz zdjęcia:</label>
                      <input
                        type='file'
                        id='fileInput'
                        accept='image/*'
                        multiple 
                        onChange={handleFileInputChange} 
                      />
                  <br />
                
                <button className='btn btn-outline-success'>Stwórz punkt</button>

              </form>
            
          </Popup>
          
        </Marker>


      : null
    )  
    
  };

  const handleEdit = (marker) => {
    setSelectedPosition([marker.longitude, marker.latitude]);
    setEditingMarker(marker);
  };


  const handleSubmit = async (e) => {
    console.log("sendingForm");
  };


  const handleUpdate = async (updatedMarker, selectedImages) => {

    try {
      const { id, title, description, longitude, latitude } = updatedMarker;

      const formData = new FormData();

      for (let i = 0; i < selectedImages.length; i++) {
        formData.append('image', selectedImages[i]);
      }

      if (selectedImages.length == 0){
        const response = await axios.put(`/points/update/${updatedMarker.id}`, {
          title: title,
          description: description,
          longitude: longitude, 
          latitude: latitude,   
        },{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }else{

        const response2 = await axios.post(`/images/upload/${updatedMarker.id}`, formData,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

      }
      setEditingMarker(null);
      cancelEdit();
      loadPoints();

    } catch  (error) {
        console.error(error);
      }
  };

  const cancelEdit = () => {
    setEditingMarker(null);
  };


  // to pozwala na niezamykanie sie okna podczas klikniecia przycisku do edycji
  const handleEditClick = (e, marker) => {
    e.stopPropagation();
    handleEdit(marker);
  };


  // elemmenty daty są przesyłane w tablicy
  const formatDate = (timestamp) => {

    const year = timestamp[0];
    const month = timestamp[1]
    const day = timestamp[2]

    const hours = timestamp[3]
    const minutes = timestamp[4]

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  

  return (

    <div className='mapContainer'>

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">

                <a className="navbar-brand text-center fw-bold" href="#">Mapa</a>
                
                <div className='buttonContainer'>
                  <Link className='btn btn-outline-light linkButton' to = "/User">Powrót do menu</Link> 
              </div>

            </div>
        </nav>


      {/* <div className="mapHeader">
        <h1>Mapa punktów</h1>
      </div> */}

    <MapContainer center={[51.1, 20.2]} zoom={6}>

        <TileLayer 
            attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'

            />

            <LocationFinder/>



            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
          
            {marker.map(marker => (
              <Marker position={[marker.longitude, marker.latitude]} icon={customIcon}>
                <Popup>

                {editingMarker && editingMarker.id === marker.id ? (

                  <EditPointPopup
                  marker={editingMarker}
                  handleUpdate={handleUpdate}
                  cancelEdit={cancelEdit}
                  />
                ) : (
                  <>


                  <h5>{marker.title} [{marker.longitude.toFixed(2)} , {marker.latitude.toFixed(2)}] </h5>
                  <br />

                  Utworzono: {formatDate(marker.createdAt)}

                  <br />
                  <br />

                  Opis: {marker.description}
                  
                  <br />
                    
                    <DeletePoint id={marker.id} loadPoints={loadPoints} />
                    <button className="edit-button" onClick={(e) => handleEditClick(e, marker)}>Edytuj punkt</button>
                    {/* <button className="btn btn-outline-primary mx-2" onClick={(e) => handleEditClick(e, marker)}>Edytuj punkt</button> */}

                    </>
                 )}

                </Popup>
              </Marker>
            ))}

          </MarkerClusterGroup>

        </MapContainer>

        </div>
  )

}
