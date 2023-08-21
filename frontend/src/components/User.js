import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import DisplayPointsPanel from "./DisplayPointsPanel";


export default function () {
  return (
  <div className="user-container">
    <Navbar/>
    <DisplayPointsPanel/>
  </div>
    
  )
}
