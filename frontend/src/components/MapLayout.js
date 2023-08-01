import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const CREATE_POINT_URL = "/points/create";

export default function MapLayout() {

  const navigate = useNavigate();

  const [marker, setMarker] = useState([]);
 
  const loadPoints = async () => {
    try {
      const response = await axios.get('/points/1/all');
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

  const[selectedPosition, setSelectedPosition] = useState([0,0]);

  const LocationFinder = () => {

    // const[pointId, setPointId] = useState('');
    const[selectedPosition, setSelectedPosition] = useState([0,0]);
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');


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


      try{
          // przeslanie requesta do backendu
          const response = await axios.post(CREATE_POINT_URL, 
              JSON.stringify({
                title: title, 
                longitude: selectedPosition[0], 
                latitude: selectedPosition[1], 
                description: description}),
              {
                  headers: { 'Content-Type': 'application/json'},
          //         // withCredentials: true
              });

          console.log("odpowiedz od serwera:");
          console.log(response.data);


          //po dodaniu puntu, wystarczy załadować punkty
          loadPoints()


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
    }



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
                <input 
                  type='text'
                  id="description"
                  autoComplete='off'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />

                <button>Stwórz punkt</button>

              </form>
            
          </Popup>
          
        </Marker>


      : null
  )  
    
  };

  const handleSubmit = async (e) => {
    console.log("sendingForm");
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/points/delete/${id}`);
      console.log("Punkt został usunięty");
      loadPoints()

    } catch (err) {
      console.error("Błąd podczas usuwania punktu:", err);
    }
  };

  
  return (

    <div className='mapContainer'>


    <MapContainer center={[52.1, 20.2]} zoom={7}>

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

                  <h3>{marker.title}</h3>
                    {
                      marker.description 
                    }
                    <br />
                    <button className="delete-button" onClick={() => handleDelete(marker.id)}>Usuń punkt</button>

                </Popup>
              </Marker>
            ))}

          </MarkerClusterGroup>

        </MapContainer>


        </div>
  )

}
