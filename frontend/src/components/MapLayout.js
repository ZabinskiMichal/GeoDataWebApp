import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import AddNewPoint from './AddNewPoint';
import { click } from '@testing-library/user-event/dist/click';
import { setAppElement } from 'react-modal';



export default function MapLayout() {

  const [marker, setMarker] = useState([]);

  const [selectedPosition, setSelectedPosition] = useState([0,0]);

 
  const loadPoints = async () => {
    try {
      const response = await axios.get('/points/all');
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
    const map = useMapEvents({
        click(e) {
          setSelectedPosition([
            e.latlng.lat,
            e.latlng.lng
        ]);  
          console.log(e.latlng);
          console.log(selectedPosition);
        },
    })
    // return null;
    // <Marker position={e.latlng} icon={customIcon} /> 

    return (
      selectedPosition ? 
          <Marker           
          position={selectedPosition}
          icon={customIcon}
          // interactive={false} 
          />
      : null
  )  
    
  };


  
  return (

    <div className='mapContainer'>


    <MapContainer center={[52.1, 20.2]} zoom={7}>

        <TileLayer 
            attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'

            />

            <LocationFinder />


            {/* łaczy punkty w klastry */}
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >





            
            {marker.map(marker => (
              <Marker position={[marker.longitude, marker.latitude]} icon={customIcon}>
                <Popup>
                  {/* tutaj mozna kombinowac z htmlem i dowolnym odstosowaniem */}
                  <h3>{marker.title}</h3>
                    {
                      marker.description 
                    }
                </Popup>
              </Marker>
            ))}

          </MarkerClusterGroup>

        </MapContainer>


        </div>
  )

}
