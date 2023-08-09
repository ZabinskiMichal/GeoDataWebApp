import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import User from './components/User';
import Admin from './components/Admin';
import MapLayout from './components/MapLayout';
import Missing from './components/Missing';
import Home from './components/Home'

// const ROLES = {
//   "USER": 2001,
//   "ADMIN": 5150
// }

function App() {
  return (

    <Routes>

      <Route path="/" element={<Home />} /> 


        {/* routy dostepne dla kazdego */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="linkpage" element={<LinkPage />} /> */}
        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

        {/* <Route path='map' element={<MapLayout />} /> */}

        <Route path='/' element={<Home />} />

        <Route element={<RequireAuth allowedRoles={["USER"]}/>}>
          <Route path='user' element={<User/>} />
          <Route path='map' element={<MapLayout />} />
        </Route>
      

      {/* to tablicy mozemy przekazac kilka elementow */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path='admin' element={<Admin />} />
        </Route>
        
        <Route path='*' element={<Missing />} />



    </Routes>



    
  );
}



export default App;
